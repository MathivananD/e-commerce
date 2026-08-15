class AppError extends Error {
  constructor(errorObj, extraError = null) {
    if (typeof errorObj === 'object' && errorObj !== null) {
      super(errorObj.message || 'An error occurred');
      this.statusCode = errorObj.statusCode || 500;
      this.errorCode = errorObj.code || errorObj.errorCode;
      this.error = extraError !== null ? extraError : (errorObj.error || null);
    } else {
      super(errorObj || 'An error occurred');
      this.statusCode = arguments[1] || 500;
      this.errorCode = arguments[2];
      this.error = arguments[3] || null;
    }

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;