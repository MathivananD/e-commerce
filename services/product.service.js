const Product = require("../models/product");
const ProductVariant = require("../models/product-variant");
const Color = require("../models/color");
const Size = require("../models/size");
const {
  BadRequestError,
  NotFoundError,
  ConflictError,
} = require("../utils/app-error");

const getSku = (product, color, size) => {
  return `${product.split(" ")[0]}-${color.slice(0, 3)}-${size.slice(0, 3)}`;
};

exports.createProduct = async (data, userId) => {
  const product = await Product.create({ ...data, userId: userId });
  const colorIds = data.variants.map((variant) => variant.colorId);
  const sizeIds = data.variants.map((variant) => variant.sizeId);

  const colorData = await Color.find({ _id: { $in: colorIds } });
  const sizeData = await Size.find({ _id: { $in: sizeIds } });

  if (product) {
    const variants = data.variants.map((variant) => {
      const colorDetails = colorData.find(
        (item) => item._id == variant.colorId,
      );
      const sizeDetails = sizeData.find((item) => item._id == variant.sizeId);
      return {
        ...variant,
        sku: getSku(product.name, colorDetails.name, sizeDetails.name),
        productId: product._id,
      };
    });
    console.log(`Color:  ${colorData}  \n Size:  ${sizeData}`);

    const productVariant = await ProductVariant.insertMany(variants);

    return { product: product, productVariant: productVariant };
  } else {
    throw new BadRequestError();
  }
};

exports.getProduct = async () => {
  const product = await Product.find({ isActive: true })
    .populate("categoryId")
    .populate("brandId")
    .populate("materialId")
    .exec();
  return product;
};

exports.getProductDetail = async (id) => {
  const product = await Product.findOne({ _id: id, isActive: true })
    .populate("categoryId")
    .populate("brandId")
    .populate("materialId")
    .exec();
  return product;
};
exports.updateProduct = async (id, data) => {
  const product = await Product.findByIdAndUpdate(id, data, {
    new: true,
  }).exec();
  if (!product) {
    throw new NotFoundError();
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
    throw new NotFoundError();
  }
  return product;
};

exports.createProductVariant = async (data) => {
  const isExisting = await ProductVariant.find({
    productId: productId,
    colorId: data.colorId,
    sizeId: data.sizeId,
    isActive: true,
  }).exec();
  if (isExisting) {
    throw new ConflictError("Increase the stock ,Product was already existing");
  }
  const productVariant = ProductVariant.create(data).exec();
  return productVariant;
};
exports.getProductVariant = async (id) => {
  const isExisting = await ProductVariant.find({
    _id: id,
    isActive: true,
  }).exec();
};
exports.updateProductVariant = async (id, data) => {
  const productVariant = await ProductVariant.findByIdAndUpdate(
    id,
    data,
  ).exec();
  return productVariant;
};
exports.deleteProductVariant = async (id) => {
  const productVariant = await ProductVariant.findByIdAndUpdate(id, {
    isActive: false,
  }).exec();
  return productVariant;
};
