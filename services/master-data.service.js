const Brand = require("../models/brand");
const Category = require("../models/categories");
const Color = require("../models/color");
const Material = require("../models/material");
const Size = require("../models/size");
const {
  BadRequestError,
  NotFoundError,
  ConflictError,
} = require("../utils/app-error");

exports.createBrand = async (data) => {
  const isExist = await Brand.findOne({ isActive: true, name: data.name });
  console.log(isExist);

  if (isExist) {
    throw new ConflictError();
  }
  const newBrand = await Brand.create(data);
  return newBrand;
};

exports.getBrand = async () => {
  const brand = await Brand.find({ isActive: true }).exec();

  return brand;
};

exports.getBrandDetail = async (id) => {
  const brand = await Brand.findOne({ _id: id, isActive: true }).exec();
  return brand;
};

exports.updateBrand = async (id, data) => {
  const brand = await Brand.findByIdAndUpdate(
    id,
    { name: data.name },
    { new: true },
  ).exec();
  return brand;
};

exports.deleteBrand = async (id) => {
  const brand = await Brand.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true },
  ).exec();
};

exports.createColor = async (data) => {
  const isExist = await Color.findOne({
    isActive: true,
    name: data.name,
    hexCode: data.hexCode,
  }).exec();
  if (isExist) {
    throw new ConflictError();
  }
  const color = await Color.create(data).exec();
  return color;
};
exports.getColor = async () => {
  const color = await Color.find({ isActive: true }).exec();

  return color;
};
exports.getColorDetail = async (id) => {
  const color = await Color.findOne({ _id: id, isActive: true }).exec();
  if (!color) {
    throw new NotFoundError();
  }
  return color;
};

exports.updateColor = async (id, data) => {
  const color = await Color.findByIdAndUpdate(id, data, { new: true }).exec();
  return color;
};

exports.deleteColor = async (id) => {
  const color = await Color.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true },
  ).exec();
  return color;
};

exports.createMaterial = async (data) => {
  const isExist = await Color.findOne({
    isActive: true,
    name: data.name,
  }).exec();
  if (isExist) {
    throw new ConflictError();
  }
  const material = Material.create(data).exec();
  return material;
};
exports.getMaterial = async () => {
  const material = await Material.find({ isActive: true }).exec();
  return material;
};
exports.getMaterialDetail = async (id) => {
  const material = await Material.findOne({ _id: id, isActive: true }).exec();
  if (!size) {
    throw new NotFoundError("Size not found");
  }
  return material;
};
exports.updateMaterial = async (id, data) => {
  const material = await Material.findByIdAndUpdate(id, data).exec();
  return material;
};
exports.deleteMaterial = async (id) => {
  const material = await Material.findByIdAndUpdate(id, {
    isActive: false,
  }).exec();
  return material;
};

exports.createSize = async (data) => {
  const isExist = await Color.findOne({
    isActive: true,
    name: data.name,
  }).exec();
  if (isExist) {
    throw new ConflictError();
  }
  const size = await Size.create(data).exec();
  return size;
};
exports.getSize = async () => {
  const size = await Size.find({ isActive: true }).exec();
  return size;
};
exports.getSizeDetail = async (id) => {
  const size = await Size.findOne({ _id: id, isActive: true }).exec();
  if (!size) {
    throw new NotFoundError("Size not found");
  }
  return size;
};
exports.updateSize = async (id, data) => {
  const size = await Size.findByIdAndUpdate(id, data).exec();
  return size;
};
exports.deleteSize = async () => {
  const size = await Size.findByIdAndUpdate(id, { isActive: false }).exec();
  return size;
};
