const z = require('zod');

const categorySchemaValidation = z.object({
    name: z.string(),
    description: z.string().optional(),
    image: z.string().optional()
}).strict()

const updateCategorySchemaValidation = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    parendId: z.string().optional(),
    isActive: z.boolean().optional(),
    image: z.string().optional()
}).strict()

const subCategorySchemaValidation = z.object({
    name: z.string(),
    description: z.string().optional(),
    parendId: z.string(),
    isActive: z.boolean().optional(),
    image: z.string().optional()
}).strict()

const updateSubCategorySchemaValidation = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    parendId: z.string(),
    isActive: z.boolean().optional(),
    image: z.string().optional()
}).strict()

module.exports = {
    categorySchemaValidation,
    updateCategorySchemaValidation,
    subCategorySchemaValidation,
    updateSubCategorySchemaValidation,

}