const Product = require("../models/product");
const ProductVariant = require("../models/product-variant");
const Color = require("../models/color");
const Size = require("../models/size");
const {
  BadRequestError,
  NotFoundError,
  ConflictError,
} = require("../utils/app-error");
const { default: mongoose } = require("mongoose");

/**
 * Standardized SKU Generator.
 * Generates unique SKUs formatted like: PROD-COL-SIZ-UNIQUEHASH
 * e.g., "Nike Air Max", "Red", "Small" -> "NIKE-RED-SMA-A1B2C"
 */
const generateSku = (
  productName = "",
  colorName = "",
  sizeName = "",
  index = 0,
) => {
  const pCode =
    productName
      .trim()
      .replace(/[^a-zA-Z0-9]/g, "")
      .slice(0, 4)
      .toUpperCase() || "PROD";

  const cCode =
    colorName
      .trim()
      .replace(/[^a-zA-Z0-9]/g, "")
      .slice(0, 3)
      .toUpperCase() || "DEF";

  const sCode =
    sizeName
      .trim()
      .replace(/[^a-zA-Z0-9]/g, "")
      .slice(0, 3)
      .toUpperCase() || "DEF";

  const randomSuffix = Math.floor(100 + Math.random() * 900);
  const timeCode = (Date.now() % 100000).toString(36).toUpperCase();

  return `${pCode}-${cCode}-${sCode}-${timeCode}${index + 1}${randomSuffix}`;
};

exports.createProduct = async (data, userId) => {
  const { variants: variantInputs, ...productData } = data;

  if (
    !variantInputs ||
    !Array.isArray(variantInputs) ||
    variantInputs.length === 0
  ) {
    throw new BadRequestError("At least one product variant is required");
  }

  // 1. Extract and validate unique color and size IDs
  const colorIds = [
    ...new Set(variantInputs.map((v) => v.colorId).filter(Boolean)),
  ];
  const sizeIds = [
    ...new Set(variantInputs.map((v) => v.sizeId).filter(Boolean)),
  ];

  // 2. Pre-fetch colors and sizes to validate existence BEFORE product creation
  const [colorDocs, sizeDocs] = await Promise.all([
    Color.find({ _id: { $in: colorIds }, isActive: true }),
    Size.find({ _id: { $in: sizeIds }, isActive: true }),
  ]);

  const colorMap = new Map(colorDocs.map((c) => [c._id.toString(), c]));
  const sizeMap = new Map(sizeDocs.map((s) => [s._id.toString(), s]));

  // Ensure all specified colors exist
  for (const cId of colorIds) {
    if (!colorMap.has(cId.toString())) {
      throw new NotFoundError(`Color with ID ${cId} not found or inactive`);
    }
  }

  // Ensure all specified sizes exist
  for (const sId of sizeIds) {
    if (!sizeMap.has(sId.toString())) {
      throw new NotFoundError(`Size with ID ${sId} not found or inactive`);
    }
  }

  // 3. Create main Product document
  const product = await Product.create({
    ...productData,
    userId: userId,
  });

  // 4. Build and insert Product Variants with orphan cleanup fallback
  try {
    const formattedVariants = variantInputs.map((variant, index) => {
      const colorDetails = colorMap.get(variant.colorId.toString());
      const sizeDetails = sizeMap.get(variant.sizeId.toString());

      const sku =
        variant.sku ||
        generateSku(product.name, colorDetails?.name, sizeDetails?.name, index);

      return {
        ...variant,
        productId: product._id,
        sku,
      };
    });

    const productVariants = await ProductVariant.insertMany(formattedVariants);

    return { product, productVariant: productVariants };
  } catch (error) {
    // Cleanup product if variant insertion fails to prevent orphaned records
    await Product.findByIdAndDelete(product._id).catch(() => {});
    throw error;
  }
};

exports.getProduct = async (filters) => {
  const {
    categoryId,
    brandIds,
    colorIds,
    sizeIds,
    materialId,
    minPrice,
    maxPrice,
    search,
    page = 1,
    name,
    limit = 20,
    sort = "newest",
  } = filters;

  const pipeline = [];
  let productFilter = {
    isActive: true,
  };
  console.log(colorIds);

  if (name) {
    pipeline.push({
      $lookup: {
        from: "categories",
        pipeline: [
          {
            $match: {
              $or: [
                {
                  name: {
                    $regex: name,
                    $options: "i",
                  },
                },
              ],
            },
          },
        ],
        as: "categories",
      },
    });
    pipeline.push({
      $match: {
        $expr: {
          $in: ["$categoryId", "$categories._id"],
        },
      },
    });
    pipeline.push({
      $project: {
        categories: 0,
      },
    });

    const variants = {
      $lookup: {
        from: "productvariants",
        let: {
          colorId: new mongoose.Types.ObjectId(colorIds),
          productIds: "$_id",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ["$colorId", "$$colorId"],
                  },
                  { $eq: ["$productId", "$$productIds"] },
                ],
              },
            },
          },
        ],
        as: "variants",
      },
    };

    pipeline.push(variants);
    // Remove products where no matching variant exists
    pipeline.push({
      $match: {
        "variants.0": {
          $exists: true,
        },
      },
    });
    pipeline.push({
      $project: {
        variants: 0,
      },
    });
  }
  if (categoryId) {
    productFilter.categoryId = new mongoose.Types.ObjectId(categoryId);
  }
  if (brandIds) {
    productFilter.brandIds = new mongoose.Types.ObjectId(brandIds);
  }
  if (materialId) {
    productFilter.materialId = new mongoose.Types.ObjectId(materialId);
  }

  pipeline.push({ $match: productFilter });

  const product = await Product.aggregate(pipeline);
  console.log(product.length);
  return product;
};

exports.getProductDetail = async (id) => {
  const product = await Product.findOne({ _id: id, isActive: true })
    .populate("categoryId")
    .populate("brandId")
    .populate("materialId")
    .exec();
  if (!product) {
    throw new NotFoundError("Product not found");
  }
  return product;
};

exports.updateProduct = async (id, data) => {
  const product = await Product.findByIdAndUpdate(id, data, {
    new: true,
  }).exec();
  if (!product) {
    throw new NotFoundError("Product not found");
  }
  return product;
};

exports.deleteProduct = async (id) => {
  const product = await Product.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true },
  ).exec();
  if (!product) {
    throw new NotFoundError("Product not found");
  }
  return product;
};

exports.createProductVariant = async (data) => {
  const isExisting = await ProductVariant.find({
    productId: data.productId,
    colorId: data.colorId,
    sizeId: data.sizeId,
    isActive: true,
  }).exec();

  if (isExisting && isExisting.length > 0) {
    throw new ConflictError(
      "Product variant already exists, please increase the stock instead",
    );
  }

  const productVariant = await ProductVariant.create(data);
  return productVariant;
};

exports.getProductVariant = async (id) => {
  const productVariants = await ProductVariant.find({
    productId: id,
    isActive: true,
  })
    .populate("colorId")
    .populate("sizeId")
    .exec();

  return productVariants;
};

exports.updateProductVariant = async (id, data) => {
  const productVariant = await ProductVariant.findByIdAndUpdate(id, data, {
    new: true,
  }).exec();
  if (!productVariant) {
    throw new NotFoundError("Product variant not found");
  }
  return productVariant;
};

exports.deleteProductVariant = async (id) => {
  const productVariant = await ProductVariant.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true },
  ).exec();
  if (!productVariant) {
    throw new NotFoundError("Product variant not found");
  }
  return productVariant;
};
