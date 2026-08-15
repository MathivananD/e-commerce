const User = require('../models/user');
const { ERROR } = require('../constants/error-code.constants');
const passwordUtils = require('../utils/hash-password');
const AppError = require('../utils/app-error');

exports.updateUser = async (userData) => {
    const existingUser = await User.findOne({
        email: userData.email
    });
    const isPasswordChanged = passwordUtils.verifyPassword(userData.password, existingUser.password);
    if (!existingUser) {
        throw new AppError(ERROR.USER_NOT_FOUND);
    }

    const updatedUser = await User.findByIdAndUpdate(existingUser._id, userData, { new: true });

    return updatedUser;
};


exports.getUser = async (id) => {
    const existingUser = await User.findById(id).select('-password -__v');

    if (!existingUser) {
        throw new AppError(ERROR.USER_NOT_FOUND);
    }

    

    return existingUser;
};

