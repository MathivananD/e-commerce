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
    let response = {
        success: false,
        message:message || 'An error occurred',
        statusCode: statusCode|| 500,
    }
    if (errors != null) {
        response.errors = errors
    }
    return res.status(statusCode).json(response);
};

module.exports = {
    successResponse,
    errorResponse
};