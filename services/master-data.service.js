const path = require("path");
const fs = require("fs");
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

const getDefaultMasterData = () => {
  const filePath = path.join(
    __dirname,
    "../master_data/default-master-data.json",
  );
  if (fs.existsSync(filePath)) {
    const rawData = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(rawData);
  }
  return {};
};

// --- Category Bulk Services ---
exports.createBulkCategories = async (data) => {
  const items = Array.isArray(data) ? data : data?.items || [];
  if (!items.length) {
    return { createdCount: 0, created: [], skippedCount: 0 };
  }

  const names = items.map((i) => i.name);
  const existing = await Category.find({
    isActive: true,
    name: { $in: names },
  }).select("name");
  const existingNames = new Set(existing.map((c) => c.name));

  const uniqueToInsert = [];
  const seenInPayload = new Set();

  for (const item of items) {
    if (!existingNames.has(item.name) && !seenInPayload.has(item.name)) {
      seenInPayload.add(item.name);
      uniqueToInsert.push(item);
    }
  }

  const created = uniqueToInsert.length
    ? await Category.insertMany(uniqueToInsert)
    : [];
  return {
    createdCount: created.length,
    created,
    skippedCount: items.length - created.length,
  };
};

// --- Brand Services ---
exports.createBrand = async (data) => {
  const isExist = await Brand.findOne({ isActive: true, name: data.name });

  if (isExist) {
    throw new ConflictError(`${data.name} already exists`);
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
  if (!brand) {
    throw new NotFoundError("Brand not found");
  }
  return brand;
};

exports.updateBrand = async (id, data) => {
  const brand = await Brand.findByIdAndUpdate(
    id,
    { name: data.name, logo: data.logo },
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
  return brand;
};

exports.createBulkBrands = async (data) => {
  const items = Array.isArray(data) ? data : data?.items || [];
  if (!items.length) {
    return { createdCount: 0, created: [], skippedCount: 0 };
  }

  const names = items.map((i) => i.name);
  const existing = await Brand.find({
    isActive: true,
    name: { $in: names },
  }).select("name");
  const existingNames = new Set(existing.map((b) => b.name));

  const uniqueToInsert = [];
  const seenInPayload = new Set();

  for (const item of items) {
    if (!existingNames.has(item.name) && !seenInPayload.has(item.name)) {
      seenInPayload.add(item.name);
      uniqueToInsert.push(item);
    }
  }

  const created = uniqueToInsert.length
    ? await Brand.insertMany(uniqueToInsert)
    : [];
  return {
    createdCount: created.length,
    created,
    skippedCount: items.length - created.length,
  };
};

// --- Color Services ---
exports.createColor = async (data) => {
  const isExist = await Color.findOne({
    isActive: true,
    name: data.name,
    hexCode: data.hexCode,
  }).exec();
  if (isExist) {
    throw new ConflictError(`${data.name} already exists`);
  }
  const color = await Color.create(data);
  return color;
};

exports.getColor = async () => {
  const color = await Color.find({ isActive: true }).exec();
  return color;
};

exports.getColorDetail = async (id) => {
  const color = await Color.findOne({ _id: id, isActive: true }).exec();
  if (!color) {
    throw new NotFoundError("Color not found");
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

exports.createBulkColors = async (data) => {
  const items = Array.isArray(data) ? data : data?.items || [];
  if (!items.length) {
    return { createdCount: 0, created: [], skippedCount: 0 };
  }

  const hexCodes = items.map((i) => i.hexCode);
  const names = items.map((i) => i.name);
  const existing = await Color.find({
    isActive: true,
    $or: [{ hexCode: { $in: hexCodes } }, { name: { $in: names } }],
  }).select("name hexCode");

  const existingHexes = new Set(existing.map((c) => c.hexCode));
  const existingNames = new Set(existing.map((c) => c.name));

  const uniqueToInsert = [];
  const seenHex = new Set();
  const seenName = new Set();

  for (const item of items) {
    if (
      !existingHexes.has(item.hexCode) &&
      !existingNames.has(item.name) &&
      !seenHex.has(item.hexCode) &&
      !seenName.has(item.name)
    ) {
      seenHex.add(item.hexCode);
      seenName.add(item.name);
      uniqueToInsert.push(item);
    }
  }

  const created = uniqueToInsert.length
    ? await Color.insertMany(uniqueToInsert)
    : [];
  return {
    createdCount: created.length,
    created,
    skippedCount: items.length - created.length,
  };
};

// --- Material Services ---
exports.createMaterial = async (data) => {
  const isExist = await Material.findOne({
    isActive: true,
    name: data.name,
  }).exec();
  if (isExist) {
    throw new ConflictError(`${data.name} material already exists`);
  }
  const material = await Material.create(data);
  return material;
};

exports.getMaterial = async () => {
  const material = await Material.find({ isActive: true }).exec();
  return material;
};

exports.getMaterialDetail = async (id) => {
  const material = await Material.findOne({ _id: id, isActive: true }).exec();
  if (!material) {
    throw new NotFoundError("Material not found");
  }
  return material;
};

exports.updateMaterial = async (id, data) => {
  const material = await Material.findByIdAndUpdate(id, data, {
    new: true,
  }).exec();
  return material;
};

exports.deleteMaterial = async (id) => {
  const material = await Material.findByIdAndUpdate(
    id,
    {
      isActive: false,
    },
    { new: true },
  ).exec();
  return material;
};

exports.createBulkMaterials = async (data) => {
  const items = Array.isArray(data) ? data : data?.items || [];
  if (!items.length) {
    return { createdCount: 0, created: [], skippedCount: 0 };
  }

  const names = items.map((i) => i.name);
  const existing = await Material.find({
    isActive: true,
    name: { $in: names },
  }).select("name");
  const existingNames = new Set(existing.map((m) => m.name));

  const uniqueToInsert = [];
  const seenInPayload = new Set();

  for (const item of items) {
    if (!existingNames.has(item.name) && !seenInPayload.has(item.name)) {
      seenInPayload.add(item.name);
      uniqueToInsert.push(item);
    }
  }

  const created = uniqueToInsert.length
    ? await Material.insertMany(uniqueToInsert)
    : [];
  return {
    createdCount: created.length,
    created,
    skippedCount: items.length - created.length,
  };
};

// --- Size Services ---
exports.createSize = async (data) => {
  const isExist = await Size.findOne({
    isActive: true,
    name: data.name,
  }).exec();
  if (isExist) {
    throw new ConflictError(`${data.name} size already exists`);
  }
  const size = await Size.create(data);
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
  const size = await Size.findByIdAndUpdate(id, data, { new: true }).exec();
  return size;
};

exports.deleteSize = async (id) => {
  const size = await Size.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true },
  ).exec();
  return size;
};

exports.createBulkSizes = async (data) => {
  const items = Array.isArray(data) ? data : data?.items || [];
  if (!items.length) {
    return { createdCount: 0, created: [], skippedCount: 0 };
  }

  const names = items.map((i) => i.name);
  const existing = await Size.find({
    isActive: true,
    name: { $in: names },
  }).select("name");
  const existingNames = new Set(existing.map((s) => s.name));

  const uniqueToInsert = [];
  const seenInPayload = new Set();

  for (const item of items) {
    if (!existingNames.has(item.name) && !seenInPayload.has(item.name)) {
      seenInPayload.add(item.name);
      uniqueToInsert.push(item);
    }
  }

  const created = uniqueToInsert.length
    ? await Size.insertMany(uniqueToInsert)
    : [];
  return {
    createdCount: created.length,
    created,
    skippedCount: items.length - created.length,
  };
};

// --- Unified Bulk Creation for All Master Data ---
exports.createAllBulkMasterData = async (payload = {}) => {
  const defaultData = getDefaultMasterData();

  const categoriesPayload =
    payload && payload.categories && payload.categories.length
      ? payload.categories
      : defaultData.categories || [];
  const brandsPayload =
    payload && payload.brands && payload.brands.length
      ? payload.brands
      : defaultData.brands || [];
  const colorsPayload =
    payload && payload.colors && payload.colors.length
      ? payload.colors
      : defaultData.colors || [];
  const sizesPayload =
    payload && payload.sizes && payload.sizes.length
      ? payload.sizes
      : defaultData.sizes || [];
  const materialsPayload =
    payload && payload.materials && payload.materials.length
      ? payload.materials
      : defaultData.materials || [];

  const [categories, brands, colors, sizes, materials] = await Promise.all([
    exports.createBulkCategories(categoriesPayload),
    exports.createBulkBrands(brandsPayload),
    exports.createBulkColors(colorsPayload),
    exports.createBulkSizes(sizesPayload),
    exports.createBulkMaterials(materialsPayload),
  ]);

  return {
    categories,
    brands,
    colors,
    sizes,
    materials,
  };
};
