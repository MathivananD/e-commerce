const catchAsync = require('../utils/async-handler');
const { successResponse } = require('../utils/response');
const authService = require('../services/auth.service');

exports.createUser = catchAsync(async (req, res) => {
  const user = await authService.createUser(req.body);
  return successResponse(res, 201, 'User registered successfully', user);
});

exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.login(email, password);
  return successResponse(res, 200, 'Login successful', result);
});

exports.refreshToken = catchAsync(async (req, res) => {
  const refreshToken = req.body.refreshToken || req.headers['x-refresh-token'];
  const result = await authService.refreshToken(refreshToken);
  return successResponse(res, 200, 'Token refreshed successfully', result);
});

exports.logOut = catchAsync(async (req, res) => {

  return successResponse(res, 200, 'Token refreshed successfully', result);
});