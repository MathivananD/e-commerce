
const userService = require('../services/user.service');
const { ERROR } = require('../constants/error-code.constants');
const { SUCCESS } = require('../constants/success-code.constants');
const { successResponse, errorResponse } = require('../utils/response');
const { hashPassword } = require('../utils/hash-password');

exports.updateUser = async (req, res) => {
    try {
        const userData = req.body;
        const updatedUser = await userService.updateUser(userData);
        const success = SUCCESS.USER_UPDATED;
        return successResponse(res, 200, 'User updated successfully', updatedUser);
    } catch (error) {
        return errorResponse(res, error.statusCode || 500, error.message || 'Internal Server Error', error.error);
    }
};

exports.getUser = async (req, res) => {
    try {
        console.log("ssssssssss",req.userId)
        const userData = req.body;
        const updatedUser = await userService.getUser(req.userId);
        const success = SUCCESS.USER_FETCHED;
        return successResponse(res, 200, success.message, updatedUser);
    } catch (error) {
        return errorResponse(res, error.statusCode || 500, error.message || 'Internal Server Error', error.error);
    }
};