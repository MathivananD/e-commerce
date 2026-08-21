const { ValidationError } = require("../utils/app-error");

/**
 * Zod Schema Validation Middleware Generator.
 *
 * @param {import('zod').ZodSchema} schema - Zod validation schema
 * @returns {Function} Express middleware function
 */
const validate = (schema) => {
  return (req, res, next) => {
    let result;

    if (Object.keys(req.query).length != 0) {
      result = schema.safeParse(req.query);
    } else if (req.body) {
      result = schema.safeParse(req.body);
    } else {
      console.log("dssssssf", req.body);
      result = { success: true };
    }

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        value: req.body[issue.path[0]],
        message: issue.message,
      }));

      throw new ValidationError("Validation failed", errors);
    }

    req.body = result.data;
    next();
  };
};

module.exports = validate;
