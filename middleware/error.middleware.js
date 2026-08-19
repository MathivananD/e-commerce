const { errorResponse } = require('../utils/response');
const { AppError } = require('../utils/app-error');

/**
 * Centralized Production-Grade Express Error Handling Middleware.
 */
const errorMiddleware = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  error.statusCode = err.statusCode || 500;
  error.errorCode = err.errorCode || null;
  error.errors = err.errors || err.error || null;
  error.stack = err.stack;


  // Handle Mongoose Bad ObjectId (CastError)
  if (err.name === 'CastError') {
    error.message = `Invalid ${err.path}: ${err.value}`;
    error.statusCode = 400;
    error.errorCode = 400;
  }

  // Handle Mongoose Duplicate Key Error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    error.message = `Duplicate value for ${field}. Please use another value.`;
    error.statusCode = 409;
    error.errorCode = 211;
  }

  // Handle Mongoose Schema Validation Error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((el) => ({
      field: el.path,
      message: el.message,
    }));
    error.message = 'Validation failed';
    error.statusCode = 400;
    error.errorCode = 240;
    error.errors = errors;
  }

  // Handle JWT Invalid Token Error
  if (err.name === 'JsonWebTokenError') {
    error.message = 'Invalid authentication token. Please log in again.';
    error.statusCode = 401;
    error.errorCode = 217;
  }

  // Handle JWT Expired Token Error
  if (err.name === 'TokenExpiredError') {
    error.message = 'Authentication token has expired. Please log in again.';
    error.statusCode = 401;
    error.errorCode = 241;
  }

  // Log unhandled non-operational errors in development/testing
  if (!err.isOperational) {
    console.error('CRITICAL UNHANDLED ERROR 💥:', err);
  }

  // Send standardized JSON error response
  return errorResponse(
    res,
    error.statusCode,
    error.message || 'Internal Server Error',
    error.errorCode,
    error.errors
  );
};

module.exports = errorMiddleware;