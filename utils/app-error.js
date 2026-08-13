class AppError extends Error {
  constructor(message, statusCode, errorCode,error) {
    super(message);

    this.statusCode = statusCode;
    this.errorCode = errorCode;
     this.error = error;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;