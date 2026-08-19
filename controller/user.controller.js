const catchAsync = require('../utils/async-handler');
const { successResponse } = require('../utils/response');
const userService = require('../services/user.service');

exports.getUser = catchAsync(async (req, res) => {
  const user = await userService.getUser(req.userId);
  return successResponse(res, 200, 'User profile retrieved successfully', user);
});

exports.updateUser = catchAsync(async (req, res) => {
  const updatedUser = await userService.updateUser(req.userId, req.body);
  return successResponse(res, 200, 'User profile updated successfully', updatedUser);
});