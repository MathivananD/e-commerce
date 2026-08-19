const CategoryService = require("../services/category.service");
const catchAsync = require("../utils/async-handler");
const { successResponse } = require("../utils/response");

exports.addCategory = catchAsync(async (req, res) => {
  const result = await CategoryService.addCategory(req.body);
  return successResponse(res, 200, "Category added successfully", result);
});

exports.getCategory = catchAsync(async (req, res) => {
  const result = await CategoryService.getCategory();
  return successResponse(res, 200, "Category retrieved successfully", result);
});

exports.getSubCategory = catchAsync(async (req, res) => {
  const result = await CategoryService.getSubCategory(req.params.categoryId);
  return successResponse(
    res,
    200,
    "SubCategory retrieved successfully",
    result,
  );
});

exports.updateCategory = catchAsync(async (req, res) => {
  const result = await CategoryService.updateCategory(req.body);
  return successResponse(res, 200, "Category updated successfully", result);
});

exports.addSubCategory = catchAsync(async (req, res) => {
  const result = await CategoryService.addSubCategory(req);
  return successResponse(res, 200, "SubCategory added successfully", result);
});

exports.updateSubCategory = catchAsync(async (req, res) => {
  const result = await CategoryService.updateSubCategory(req.body);
  return successResponse(res, 200, "SubCategory updated successfully", result);
});
