// master-data.validator.js

const { z } = require("zod");

const brandSchema = z.object({
  name: z.string().trim().min(1),
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
});

module.exports = {
  brandSchema,
  colorSchema,
  sizeSchema,
  materialSchema,
};
