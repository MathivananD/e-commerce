const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { USER_ROLE, USER_STATUS } = require('../constants/user.constants');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    countryCode: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: Object.values(USER_ROLE),
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(USER_STATUS),
        required: true,
    }

})

module.exports = mongoose.model('User', userSchema)