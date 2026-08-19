const { z } = require("zod");

const createVariantSchema = z.object({
  colorId: z.string(),

  sizeId: z.string(),
  actualPrice: z
    .number({
      error: "Actual price is required",
    })
    .positive("Actual price must be greater than 0"),

  discountPercentage: z
    .number()
    .min(0, "Discount cannot be negative")
    .max(100, "Discount cannot exceed 100")
    .default(0),

  stock: z
    .number({
      error: "Stock is required",
    })
    .int("Stock must be an integer")
    .min(0, "Stock cannot be negative"),

  lowStockThreshold: z
    .number()
    .int("Low stock threshold must be an integer")
    .min(0, "Low stock threshold cannot be negative")
    .default(5),

  images: z.array(z.string().url("Invalid image URL")).optional().default([]),

  isActive: z.boolean().optional().default(true),
});

const createProductSchema = z.object({
  name: z.string().trim().min(3, "Product name must be at least 3 characters"),

  description: z.string().trim().min(1, "Description is required"),

  categoryId: z.string(),

  brandId: z.string(),

  materialId: z.string().optional(),

  specifications: z.record(z.string(), z.any()).optional().default({}),

  variants: z
    .array(createVariantSchema)
    .min(1, "At least one variant is required"),
});

module.exports = {
  createProductSchema,
  createVariantSchema,
};
