const Address = require('../models/address')
const { InternalServerError } = require('../utils/app-error')

exports.getAddress = async (userId) => {

    const address = await Address.find({ userId: userId }).exec()
    if (!address) {
        throw new InternalServerError('Address not created')
    }
    return address
}



exports.createAddress = async (addressData, userId) => {
    const address = await Address.create({ ...addressData, userId: userId })
    if (!address) {
        throw new InternalServerError('Address not created')
    }
    return address
}

exports.updateAddress = async (addressId, addressData) => {
    const address = await Address.findByIdAndUpdate(addressId, addressData, { new: true, runValidators: true, })
    if (!address) {
        throw new InternalServerError('Address not updated')
    }
    return address
}

exports.delete = async (addressId) => {
    const address = await Address.findByIdAndDelete(addressId, { new: true })
    if (!address) {
        throw new InternalServerError('Address not updated')
    }
    return address
}
