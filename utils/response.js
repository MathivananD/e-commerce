/**
 * Standardized API Success Response.
 */
const successResponse = (res, statusCode = 200, message = 'Success', data = null) => {
  const response = {
    success: true,
    statusCode,
    message,
  };

  if (data !== null) {
    response.data = data;
  }

  return res.status(statusCode).json(response);
};

/**
 * Standardized API Error Response.
 */
const errorResponse = (
  res,
  statusCode = 500,
  message = 'An unexpected error occurred',
  errorCode = null,
  errors = null,
  stack = null
) => {
  const response = {
    success: false,
    statusCode,
    message,
  };

  if (errorCode !== null && errorCode !== undefined) {
    response.errorCode = errorCode;
  }

  if (errors !== null && errors !== undefined) {
    response.errors = errors;
  }

  if (stack && process.env.NODE_ENV !== 'production') {
    response.stack = stack;
  }

  return res.status(statusCode).json(response);
};

module.exports = {
  successResponse,
  errorResponse,
};