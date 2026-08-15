const AppError = require('../utils/app-error');
const { ERROR } = require('../constants/error-code.constants');
const validate = (schema) => {
    return (req, res, next) => {

        const result = schema.safeParse(req.body);

        if (!result.success) {
            const errors = result.error.issues.map((error) => {
                const field = error.path[0];
                return {
                    field: field,
                    value: req.body[field],
                    message: error.message
                };
            });
            throw new AppError(ERROR.VALIDATION_ERROR, errors);
        }

        req.body = result.data;

        next();
    };
};

module.exports = validate;