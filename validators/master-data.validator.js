// master-data.validator.js

const { z } = require("zod");

const categorySchema = z.object({
  name: z.string().trim().min(1),
  description: z.string().optional(),
  parentId: z.string().optional().nullable(),
  image: z.string().optional(),
});

const brandSchema = z.object({
  name: z.string().trim().min(1),
  logo: z.string().optional(),
});

const colorSchema = z.object({
  name: z.string().trim().min(1),
  hexCode: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
});

const sizeSchema = z.object({
  name: z.string().trim().min(1),
});

const materialSchema = z.object({
  name: z.string().trim().min(1),
  description: z.string().optional(),
  image: z.string().optional(),
});

const bulkCategorySchema = z.union([
  z.array(categorySchema),
  z.object({ items: z.array(categorySchema) }),
]);

const bulkBrandSchema = z.union([
  z.array(brandSchema),
  z.object({ items: z.array(brandSchema) }),
]);

const bulkColorSchema = z.union([
  z.array(colorSchema),
  z.object({ items: z.array(colorSchema) }),
]);

const bulkSizeSchema = z.union([
  z.array(sizeSchema),
  z.object({ items: z.array(sizeSchema) }),
]);

const bulkMaterialSchema = z.union([
  z.array(materialSchema),
  z.object({ items: z.array(materialSchema) }),
]);

const bulkAllMasterDataSchema = z.object({
  categories: z.array(categorySchema).optional(),
  brands: z.array(brandSchema).optional(),
  colors: z.array(colorSchema).optional(),
  sizes: z.array(sizeSchema).optional(),
  materials: z.array(materialSchema).optional(),
}).optional();

module.exports = {
  categorySchema,
  brandSchema,
  colorSchema,
  sizeSchema,
  materialSchema,
  bulkCategorySchema,
  bulkBrandSchema,
  bulkColorSchema,
  bulkSizeSchema,
  bulkMaterialSchema,
  bulkAllMasterDataSchema,
};
