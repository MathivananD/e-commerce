
const userService = require('../services/user.service');
const { ERROR } = require('../constants/error-code.constants');
const {SUCCESS}= require('../constants/success-code.constants');
const { successResponse, errorResponse } = require('../utils/response');


exports.createUser = async (req, res) => {
    try {
        console.log('Request body:', req.body); // Log the request body for debugging
        const userData = req.body;
        const existingUser = await userService.createUser(userData);

        if (existingUser) {
             const success = SUCCESS.USER_CREATED;
            return successResponse(res, 201, 'User created successfully', existingUser);
        }

    } catch (error) {
        return errorResponse(res, error.statusCode || 500, error.message || 'Internal Server Error', error.error);
    }
};

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