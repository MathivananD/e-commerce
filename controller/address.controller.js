
const AddressService = require('../services/address.service')
const catchAsync = require('../utils/async-handler')
const { successResponse } = require('../utils/response')

exports.getAddress = catchAsync(async (req, res) => {
    const address = await AddressService.getAddress(req.userId)
    successResponse(res, 200, 'Address created successfully', address)
})


exports.createAddress = catchAsync(async (req, res) => {
    const address = await AddressService.createAddress(req.body, req.user.userId)
    successResponse(res, 200, 'Address created successfully', address)
})

exports.updateAddress = catchAsync(async (req, res) => {
    console.log("sdfsd", `${req.params.id}`);

    const address = await AddressService.updateAddress(req.params.id, req.body)
    successResponse(res, 200, 'Address updated successfully', address)
})

exports.deleteAddress = catchAsync(async (req, res) => {
    const address = await AddressService.delete(req.params.id)
    successResponse(res, 200, 'Address deleted successfully', address)
})