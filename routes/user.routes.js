const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const validate = require('../validators/custom.validators');
const { userSchemaValidation, userUpdateSchemaValidation } = require('../validators/user.validation');
const { successResponse, errorResponse } = require('../utils/response');
const authMiddleWare = require('../middleware/auth.middleware');

/**
 * @openapi
 * /user:
 *   get:
 *     summary: Get user profile
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/', userController.getUser);

/**
 * @openapi
 * /user/update:
 *   put:
 *     summary: Update user profile
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdateInput'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put('/update', authMiddleWare, validate(userUpdateSchemaValidation), userController.updateUser);

module.exports = router;