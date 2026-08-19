const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    addressLine1: {
        type: String,
        required: true
    },
    addressLine2: {
        type: String,
    },
    landmark: {
        type: String,
        rerequiredquire: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    postalCode: {
        type: Number,
        required: true
    },
    addressType: {
        type: String
    }, // HOME / WORK / OTHER
    isDefault: {
        type: Boolean
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

}, {
    versionKey: false
})

module.exports = mongoose.model("Address", addressSchema)