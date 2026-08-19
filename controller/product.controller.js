const productService = require("../services/product.service");
const catchAsync = require("../utils/async-handler");
const { successResponse } = require("../utils/response");

exports.createProduct = catchAsync(async (req, res) => {
  const result = await productService.createProduct(req.body,req.userId);
  successResponse(res, 200, "Successfull", result);
});

exports.getProduct = catchAsync(async (req, res) => {
  const result = await productService.getProduct();
  successResponse(res, 200, "Successfull", result);
});

exports.getProductDetails = catchAsync(async (req, res) => {
  const result = await productService.getProductDetail(req.params.id);
  successResponse(res, 200, "Successfull", result);
});
exports.updateProduct = catchAsync(async (req, res) => {
  const result = await productService.updateProduct(req.params.id, req.body);
  successResponse(res, 200, "Successfull", result);
});
exports.deleteProduct = catchAsync(async (req, res) => {
  const result = await productService.deleteProduct(req.params.id);
  successResponse(res, 200, "Successfull", result);
});

exports.createProductVariant = catchAsync(async (req, res) => {
  const result = await productService.createProductVariant(req.body);
  successResponse(res, 200, "Successfull", result);
});
exports.getProductVariant = catchAsync(async (req, res) => {
  const result = await productService.getProductVariant(req.body);
  successResponse(res, 200, "Successfull", result);
});
exports.getProductVariantDetail = catchAsync(async (req, res) => {
  const result = await productService.createProduct(req.params.id);
  successResponse(res, 200, "Successfull", result);
});
exports.updateProductVariant = catchAsync(async (req, res) => {
  const result = await productService.updateProductVariant(
    req.params.id,
    req.body,
  );
  successResponse(res, 200, "Successfull", result);
});
exports.deleteProductVariant = catchAsync(async (req, res) => {
  const result = await productService.deleteProductVariant(req.params.id);
  successResponse(res, 200, "Successfull", result);
});
