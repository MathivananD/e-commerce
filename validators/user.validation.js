const z = require('zod');
const USER_ROLE = require('../constants/user.constants').USER_ROLE;

const userSchemaValidation = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string(),
    countryCode: z.string().length(2),
    phoneNumber: z.string().length(10),
    role: z.enum(USER_ROLE)
}).refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match'
});

const userUpdateSchemaValidation = z.object({
    name: z.string().min(3).optional(),
    email: z.string().email().optional(),
    countryCode: z.string().length(2).optional(),
    phoneNumber: z.string().length(10).optional()
}).strict();
module.exports = userSchemaValidation;