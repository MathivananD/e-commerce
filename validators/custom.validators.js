
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
            return res.status(819).json({
                message: 'Validation failed',
                errors: errors
            });
        }

        req.body = result.data;

        next();
    };
};

module.exports = validate;