
const {successResponse, errorResponse } = require('../utils/response');
const authService = require('../services/auth.service');
const passwordUtils = require('../utils/hash-password');
const { ERROR } = require('../constants/error-code.constants');
const {SUCCESS}=require('../constants/success-code.constants')

exports.createUser = async (req, res) => {
    try {
        console.log('Request body:', req.body); // Log the request body for debugging
        const userData = req.body;

        const existingUser = await authService.createUser(userData);

        if (existingUser) {
            const success = SUCCESS.USER_CREATED;
            return successResponse(res, 201, 'User created successfully', existingUser);
        }

    } catch (error) {
        console.error('Error creating user:', error.statusCode); // Log the error for debugging
        return errorResponse(res, error.statusCode, error.message, error.error);
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const data = await authService.login(email, password);
        if (!data) {
             const error=ERROR.USER_NOT_FOUND;
            return errorResponse(res, error.statusCode, error.message);
        }

        const success=SUCCESS.LOGIN_SUCCESS
       return successResponse(res,success.statusCode,success.message,data)
        
    } catch (error) {
        console.log(error)
        return errorResponse(res, error.statusCode || 500, error.message || 'Internal Server Error', error.error);
    }
};

exports.refreshToken= async(req,res)=>{}