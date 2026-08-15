const { successResponse, errorResponse } = require('../utils/response');

const errorMiddleware = (err, req, res, next) => {
    return errorResponse(res, err.statusCode || 500, err.message || 'Internal Server Error', err.error);
};

module.exports = errorMiddleware;