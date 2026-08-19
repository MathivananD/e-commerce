const z = require('zod');
const { ADDRESSTYPE } = require('../constants/user.constants')

const addressValidator = z.object({
    fullName: z.string(),
    phoneNumber: z.string(),
    addressLine1: z.string(),
    addressLine2: z.string().optional(),
    landmark: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    postalCode: z.number(),
    addressType: z.enum(Object.values(ADDRESSTYPE)),
}).strict()


const addressUpdateValidator = z.object({
    fullName: z.string().optional(),
    phoneNumber: z.string().optional(),
    addressLine1: z.string().optional(),
    addressLine2: z.string().optional(),
    landmark: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    postalCode: z.number().optional(),
    addressType: z.enum(Object.values(ADDRESSTYPE)).optional(),
}).strict()




module.exports = { addressValidator, addressUpdateValidator };