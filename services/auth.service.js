const User = require('../models/user');
const passwordUtils = require('../utils/hash-password');
const tokens = require('../utils/jwt');
const { ConflictError, NotFoundError, UnauthorizedError } = require('../utils/app-error');

exports.createUser = async (userData) => {
  const existingUser = await User.findOne({ email: userData.email });

  if (existingUser) {
    throw new ConflictError('Email already exists');
  }

  const hashedPassword = await passwordUtils.hashPassword(userData.password);

  const user = await User.create({
    ...userData,
    password: hashedPassword,
  });

  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.__v;

  return userObject;
};

exports.login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new NotFoundError('User not found');
  }

  const isPasswordValid = await passwordUtils.verifyPassword(password, user.password);

  if (!isPasswordValid) {
    throw new UnauthorizedError('Invalid email or password');
  }

  const payload = { userId: user._id, email: user.email, role: user.role };
  const accessToken = tokens.generateToken(payload);
  const refreshToken = tokens.generateRefreshToken(payload);

  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.__v;

  return {
    accessToken,
    refreshToken,
    user: userObject,
  };
};

exports.refreshToken = async (refreshToken) => {
  if (!refreshToken) {
    throw new UnauthorizedError('Refresh token is required');
  }

  const decoded = tokens.verifyRefreshToken(refreshToken);

  const user = await User.findById(decoded.userId);
  if (!user) {
    throw new NotFoundError('User associated with token no longer exists');
  }

  const payload = { userId: user._id, email: user.email, role: user.role };
  const newAccessToken = tokens.generateToken(payload);
  const newRefreshToken = tokens.generateRefreshToken(payload);

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};

exports.logOut = () => {

  return {
    message: 'Logout successful',
  };
}