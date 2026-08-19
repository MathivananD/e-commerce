const masterService = require("../services/master-data.service");
const catchAsync = require("../utils/async-handler");
const { successResponse } = require("../utils/response");

exports.createBrand = catchAsync(async (req, res) => {
  const result = await masterService.createBrand(req.body);
  successResponse(res, 201, "Brand created successfully", result);
});
exports.getBrand = catchAsync(async (req, res) => {
  const result = await masterService.getBrand();
  successResponse(res, 201, "Brand fetched successfully", result);
});
exports.getBrandDetail = catchAsync(async (req, res) => {});
exports.updateBrand = catchAsync(async (req, res) => {
  const result = await masterService.updateBrand(req.params.id, req.body);
  successResponse(res, 201, "Brand updated successfully", result);
});
exports.deleteBrand = catchAsync(async (req, res) => {
   const result = await masterService.deleteBrand(req.params.id);
  successResponse(res, 201, "Brand updated successfully", result);
});

exports.createColor = catchAsync(async (req, res) => {
  const result = await masterService.createColor(req.body);
  successResponse(res, 201, "Color created successfully", result);
});
exports.getColor = catchAsync(async (req, res) => {
  const result = await masterService.getColor();
  successResponse(res, 201, "Colors fetched successfully", result);
});
exports.getColorDetail = catchAsync(async (req, res) => {});
exports.updateColor = catchAsync(async (req, res) => {});
exports.deleteColor = catchAsync(async (req, res) => {});

exports.createMaterial = catchAsync(async (req, res) => {});
exports.getMaterial = catchAsync(async (req, res) => {});
exports.getMaterialDetail = catchAsync(async (req, res) => {});
exports.updateMaterial = catchAsync(async (req, res) => {});
exports.deleteMaterial = catchAsync(async (req, res) => {});

exports.createSize = catchAsync(async (req, res) => {});
exports.getSize = catchAsync(async (req, res) => {});
exports.getSizeDetail = catchAsync(async (req, res) => {});
exports.updateSize = catchAsync(async (req, res) => {});
exports.deleteSize = catchAsync(async (req, res) => {});
