const z = require('zod');

const userSchemaValidation = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
    countryCode: z.string().min(1),
    phoneNumber: z.string().min(1),
    role: z.enum(['ADMIN', 'USER']),
    status: z.enum(['ACTIVE', 'INACTIVE']),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
});

module.exports = userSchemaValidation;