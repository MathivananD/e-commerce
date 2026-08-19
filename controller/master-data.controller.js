const masterService = require("../services/master-data.service");
const catchAsync = require("../utils/async-handler");
const { successResponse } = require("../utils/response");

// --- Unified Bulk Master Data Controller ---
exports.createAllBulkMasterData = catchAsync(async (req, res) => {
  const result = await masterService.createAllBulkMasterData(req.body);
  successResponse(res, 201, "Master data bulk creation processed successfully", result);
});

// --- Category Controllers ---
exports.createBulkCategories = catchAsync(async (req, res) => {
  const result = await masterService.createBulkCategories(req.body);
  successResponse(res, 201, "Bulk categories created successfully", result);
});


// --- Brand Controllers ---
exports.createBrand = catchAsync(async (req, res) => {
  const result = await masterService.createBrand(req.body);
  successResponse(res, 201, "Brand created successfully", result);
});

exports.getBrand = catchAsync(async (req, res) => {
  const result = await masterService.getBrand();
  successResponse(res, 200, "Brand fetched successfully", result);
});

exports.getBrandDetail = catchAsync(async (req, res) => {
  const result = await masterService.getBrandDetail(req.params.id);
  successResponse(res, 200, "Brand detail fetched successfully", result);
});

exports.updateBrand = catchAsync(async (req, res) => {
  const result = await masterService.updateBrand(req.params.id, req.body);
  successResponse(res, 200, "Brand updated successfully", result);
});

exports.deleteBrand = catchAsync(async (req, res) => {
  const result = await masterService.deleteBrand(req.params.id);
  successResponse(res, 200, "Brand deleted successfully", result);
});

exports.createBulkBrands = catchAsync(async (req, res) => {
  const result = await masterService.createBulkBrands(req.body);
  successResponse(res, 201, "Bulk brands created successfully", result);
});

// --- Color Controllers ---
exports.createColor = catchAsync(async (req, res) => {
  const result = await masterService.createColor(req.body);
  successResponse(res, 201, "Color created successfully", result);
});

exports.getColor = catchAsync(async (req, res) => {
  const result = await masterService.getColor();
  successResponse(res, 200, "Colors fetched successfully", result);
});

exports.getColorDetail = catchAsync(async (req, res) => {
  const result = await masterService.getColorDetail(req.params.id);
  successResponse(res, 200, "Color detail fetched successfully", result);
});

exports.updateColor = catchAsync(async (req, res) => {
  const result = await masterService.updateColor(req.params.id, req.body);
  successResponse(res, 200, "Color updated successfully", result);
});

exports.deleteColor = catchAsync(async (req, res) => {
  const result = await masterService.deleteColor(req.params.id);
  successResponse(res, 200, "Color deleted successfully", result);
});

exports.createBulkColors = catchAsync(async (req, res) => {
  const result = await masterService.createBulkColors(req.body);
  successResponse(res, 201, "Bulk colors created successfully", result);
});

// --- Material Controllers ---
exports.createMaterial = catchAsync(async (req, res) => {
  const result = await masterService.createMaterial(req.body);
  successResponse(res, 201, "Material created successfully", result);
});

exports.getMaterial = catchAsync(async (req, res) => {
  const result = await masterService.getMaterial();
  successResponse(res, 200, "Materials fetched successfully", result);
});

exports.getMaterialDetail = catchAsync(async (req, res) => {
  const result = await masterService.getMaterialDetail(req.params.id);
  successResponse(res, 200, "Material detail fetched successfully", result);
});

exports.updateMaterial = catchAsync(async (req, res) => {
  const result = await masterService.updateMaterial(req.params.id, req.body);
  successResponse(res, 200, "Material updated successfully", result);
});

exports.deleteMaterial = catchAsync(async (req, res) => {
  const result = await masterService.deleteMaterial(req.params.id);
  successResponse(res, 200, "Material deleted successfully", result);
});

exports.createBulkMaterials = catchAsync(async (req, res) => {
  const result = await masterService.createBulkMaterials(req.body);
  successResponse(res, 201, "Bulk materials created successfully", result);
});

// --- Size Controllers ---
exports.createSize = catchAsync(async (req, res) => {
  const result = await masterService.createSize(req.body);
  successResponse(res, 201, "Size created successfully", result);
});

exports.getSize = catchAsync(async (req, res) => {
  const result = await masterService.getSize();
  successResponse(res, 200, "Sizes fetched successfully", result);
});

exports.getSizeDetail = catchAsync(async (req, res) => {
  const result = await masterService.getSizeDetail(req.params.id);
  successResponse(res, 200, "Size detail fetched successfully", result);
});

exports.updateSize = catchAsync(async (req, res) => {
  const result = await masterService.updateSize(req.params.id, req.body);
  successResponse(res, 200, "Size updated successfully", result);
});

exports.deleteSize = catchAsync(async (req, res) => {
  const result = await masterService.deleteSize(req.params.id);
  successResponse(res, 200, "Size deleted successfully", result);
});

exports.createBulkSizes = catchAsync(async (req, res) => {
  const result = await masterService.createBulkSizes(req.body);
  successResponse(res, 201, "Bulk sizes created successfully", result);
});
