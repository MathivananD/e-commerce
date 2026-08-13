const ERROR = {
  USER_NOT_FOUND: {
    code: 210,
    statusCode: 404,
    message: 'User not found'
  },

  EMAIL_ALREADY_EXISTS: {
    code: 211,
    statusCode: 409,
    message: 'Email already exists'
  },

  INVALID_PASSWORD: {
    code: 212,
    statusCode: 401,
    message: 'Invalid password'
  },

  PRODUCT_NOT_FOUND: {
    code: 213,
    statusCode: 404,
    message: 'Product not found'
  },

  OUT_OF_STOCK: {
    code: 214,
    statusCode: 409,
    message: 'Product is out of stock'
  },
  ROUTE_NOT_FOUND: {
    code: 220,
    statusCode: 404,
    message: 'Route not found'
  },
  RUNNING: {
    code: 230,
    statusCode: 404,
    message: 'Server is running'
  },
  VALIDATION_ERROR: {
    code: 240,
    statusCode: 400,
    message: 'Validation error'
  }
};


module.exports = {
    ERROR
};