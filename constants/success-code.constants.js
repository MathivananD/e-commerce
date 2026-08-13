const SUCCESS = {
  USER_CREATED: {
    code: 100,
    statusCode: 201,
    message: 'User created successfully'
  },

  USER_FETCHED: {
    code: 101,
    statusCode: 200,
    message: 'User fetched successfully'
  },

  USER_UPDATED: {
    code: 102,
    statusCode: 200,
    message: 'User updated successfully'
  },

  USER_DELETED: {
    code: 103,
    statusCode: 200,
    message: 'User deleted successfully'
  },

  LOGIN_SUCCESS: {
    code: 104,
    statusCode: 200,
    message: 'Login successful'
  }
};

module.exports = {SUCCESS};