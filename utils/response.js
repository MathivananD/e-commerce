const successResponse = (res, statusCode, message, data = null) => {
    const response = {
        success: true,
        statusCode,
        message
    };

    if (data !== null) {
        response.data = data;
    }

    return res.status(statusCode).json(response);
};

const errorResponse = (
    res,
    statusCode,
    message,
    errors = null
) => {
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode: statusCode,
        errors
    });
};

module.exports = {
    successResponse,
    errorResponse
};