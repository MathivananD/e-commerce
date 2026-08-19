const Category = require("../models/categories");
const { InternalServerError, BadRequestError } = require("../utils/app-error");

exports.addCategory = async (body) => {
  const existinCategory =  Category.findOne({ name: body.name }).exec();
  if (existinCategory) {
    throw new BadRequestError("Category already exists");
  }

  const category = await Category.create(body);
  if (!category) {
    throw new InternalServerError("Category not created");
  }
  return category;
};

exports.getCategory = async () => {
  const category =  Category.find({ parendId: null }).exec();
  return category;
};

exports.getSubCategory = async () => {
  const category =  Category.find({ parendId: { $ne: null } }).exec();
  return category;
};

exports.getSubCategoryById = async (categoryId) => {
  const category =  Category.find({ parendId: categoryId }).exec();
  return category;
};

exports.updateCategory = async (body) => {
  const category =  Category.findByIdAndUpdate(body.id, body, {
    new: true,
    runValidators: true,
  }).exec();
  if (!category) {
    throw new InternalServerError("Category not Updated");
  }
  return category;
};

exports.updateSubCategory = async (body) => {
  const category =  Category.findByIdAndUpdate(body.id, body, {
    new: true,
    runValidators: true,
  }).exec();
  if (!category) {
    throw new InternalServerError("Category not Updated");
  }
  return category;
};

exports.addSubCategory = async (req) => {
  const category =  Category.create(req.body).exec();
  if (!category) {
    throw new InternalServerError("Category not created");
  }
  return category;
};
