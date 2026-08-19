const { ValidationError } = require('../utils/app-error');

/**
 * Zod Schema Validation Middleware Generator.
 *
 * @param {import('zod').ZodSchema} schema - Zod validation schema
 * @returns {Function} Express middleware function
 */
const validate = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        value: req.body[issue.path[0]],
        message: issue.message,
      }));

      throw new ValidationError('Validation failed', errors);
    }

    req.body = result.data;
    next();
  };
};

module.exports = validate;