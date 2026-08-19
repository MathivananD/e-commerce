const Product = require("../models/product");
const ProductVariant = require("../models/product-variant");
const {
  BadRequestError,
  NotFoundError,
  ConflictError,
} = require("../utils/app-error");

exports.createProduct = async (data) => {
  const product = await Product.create(data).exec();
  if (product) {
    const variants = data.variants.map((variant) => ({
      ...variant,
      productId: product._id,
    }));
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
