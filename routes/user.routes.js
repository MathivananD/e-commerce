const express= require('express');
const router=express.Router();
const userController=require('../controller/user.controller');
const validate=require('../validators/custom.validators');
const userValidation=require('../validators/user.validation');
const { successResponse, errorResponse } = require('../utils/response');


router.post('/register',userController.createUser)

router.put('/update',userController.createUser)
// router.put('/update')


module.exports = router;