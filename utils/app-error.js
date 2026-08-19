/**
 * Base Application Error class for operational errors.
 */
class AppError extends Error {
  /**
   * @param {string|object} error - Error message string or error constant object
   * @param {number} [statusCode=500] - HTTP status code
   * @param {number|string} [errorCode=null] - Internal business error code
   * @param {Array|object} [errors=null] - Additional validation or contextual error details
   */
  constructor(error, statusCode = 500, errorCode = null, errors = null) {
    if (typeof error === 'object' && error !== null) {
      super(error.message || 'An unexpected error occurred');
      this.statusCode = error.statusCode || statusCode || 500;
      this.errorCode = error.code || error.errorCode || errorCode || null;
      this.errors = errors !== null ? errors : (error.errors || error.error || null);
    } else {
      super(error || 'An unexpected error occurred');
      this.statusCode = statusCode;
      this.errorCode = errorCode;
      this.errors = errors;
    }

    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

class BadRequestError extends AppError {
  constructor(message = 'Bad Request', errorCode = null, errors = null) {
    super(message, 400, errorCode, errors);
  }
}

class ValidationError extends AppError {
  constructor(message = 'Validation Error', errors = null, errorCode = 240) {
    super(message, 400, errorCode, errors);
  }
}

class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized access', errorCode = 216) {
    super(message, 401, errorCode);
  }
}

class ForbiddenError extends AppError {
  constructor(message = 'Forbidden access', errorCode = 217) {
    super(message, 403, errorCode);
  }
}


class TokenExpiredError extends AppError {
  constructor(message = 'Token Expired', errorCode = 241) {
    super(message, 401, errorCode);
  }
}

class NotFoundError extends AppError {
  constructor(message = 'Resource not found', errorCode = 404) {
    super(message, 404, errorCode);
  }
}

class ConflictError extends AppError {
  constructor(message = 'Resource conflict', errorCode = 409) {
    super(message, 409, errorCode);
  }
}

class InternalServerError extends AppError {
  constructor(message = 'Internal Server Error', errorCode = 500) {
    super(message, 500, errorCode);
    this.isOperational = false;
  }
}

module.exports = AppError;
module.exports.AppError = AppError;
module.exports.BadRequestError = BadRequestError;
module.exports.ValidationError = ValidationError;
module.exports.UnauthorizedError = UnauthorizedError;
module.exports.ForbiddenError = ForbiddenError;
module.exports.NotFoundError = NotFoundError;
module.exports.ConflictError = ConflictError;
module.exports.InternalServerError = InternalServerError;
module.exports.TokenExpiredError = TokenExpiredError;