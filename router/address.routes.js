const express = require('express')
const router = express.Router()

const AddressController = require('../controller/address.controller')
const { addressValidator, addressUpdateValidator } = require('../validators/address.validator')
const validate = require('../validators/custom.validators')


router.get('/', AddressController.getAddress)
router.post('/create', validate(addressValidator), AddressController.createAddress)
router.put('/update/:id', validate(addressUpdateValidator), AddressController.updateAddress)
router.delete('/delete/:id', AddressController.deleteAddress)

module.exports = router