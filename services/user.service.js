const User = require('../models/user');
const passwordUtils = require('../utils/hash-password');
const { NotFoundError, BadRequestError } = require('../utils/app-error');

exports.getUser = async (userId) => {
  const user = await User.findById(userId).select('-password -__v');

  if (!user) {
    throw new NotFoundError('User profile not found');
  }

  return user;
};

exports.updateUser = async (userId, userData) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new NotFoundError('User not found');
  }


  // Prevent email modification if not allowed or check for uniqueness
  if (userData.email && userData.email !== user.email) {
    const emailExists = await User.findOne({ email: userData.email });
    if (emailExists) {
      throw new BadRequestError('Email address is already in use');
    }
  }

  const updatedUser = await User.findByIdAndUpdate(userId, userData, {
    new: true,
    runValidators: true,
  }).select('-password -__v');

  return updatedUser;
};
