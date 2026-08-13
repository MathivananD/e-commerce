const User = require('../models/user');
const { ERROR } = require('../constants/error-code.constants');
const AppError = require('../utils/app-error');
const { successResponse, errorResponse } = require('../utils/response');

exports.createUser = async (userData) => {
    const existingUser = await User.findOne({
        email: userData.email
    });


    if (existingUser) {

        const error = ERROR.EMAIL_ALREADY_EXISTS
        throw new AppError(error.message, error.statusCode, error.code);
    }

    const user = await User.create(userData);

    return user;
}

exports.updateUser = async (userData) => {
    const existingUser = await User.findOne({
        email: userData.email
    });
    if (!existingUser) {
        const error = ERROR.USER_NOT_FOUND;
        throw new AppError(error.message, error.statusCode, error.code);
    }

    const updatedUser = await User.findByIdAndUpdate(existingUser._id, userData, { new: true });

    return updatedUser;
};