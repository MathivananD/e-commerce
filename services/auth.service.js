const { ERROR } = require('../constants/error-code.constants');
const passwordUtils = require('../utils/hash-password');
const AppError = require('../utils/app-error');
const tokens = require('../utils/jwt');
const User = require('../models/user')



exports.createUser = async (userData) => {
    const password = await passwordUtils.hashPassword(userData.password);
    userData.password = password;
    const existingUser = await User.findOne({
        email: userData.email
    });


    if (existingUser) {
        throw new AppError(ERROR.EMAIL_ALREADY_EXISTS);
    }

    const user = await User.create(userData);

    return user;
}


exports.login = async (email, password) => {


    const user = await User.findOne({ email });
    if (!user) {
        throw new AppError(ERROR.USER_NOT_FOUND);
    }
    console.log("dddddddddddd", email);
    const isPasswordValid = await passwordUtils.verifyPassword(password, user.password);
    if (!isPasswordValid) {
        throw new AppError(ERROR.INVALID_PASSWORD);
    }

    const token = tokens.generateToken({ userId: user._id, email: user.email });
    const refreshToken = tokens.generateRefreshToken({ userId: user._id, email: user.email });
    return { accessToken: token, refreshToken: refreshToken };
}

exports.refreshToken = async(refreshToken) => {

    const decoded = tokens.verifyRefreshToken(refreshToken)
      
    if (!decoded) {
      
    }
    const email=decoded.email
    const user=await User.findOne({email})
   return generateToken(user._id,user.email)
}

generateToken=(email, password)=>{
    const token = tokens.generateToken({ userId: user._id, email: user.email });
    const refreshToken = tokens.generateRefreshToken({ userId: user._id, email: user.email });
    return { accessToken: token, refreshToken: refreshToken };
}