const { successResponse, errorResponse } = require('../utils/response');

const errorMiddleware = (err, req, res, next) => {
   console.error('Error:', err);

    return errorResponse(res, err.errorCode || 500, err.message || 'Internal Server Error', err.error);
};

module.exports = errorMiddleware;