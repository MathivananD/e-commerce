const express = require("express");
const router = express.Router();
const categoryController = require("../controller/category.controller");
const validate = require("../validators/custom.validators");
const middleware = require("../middleware/auth.middleware");
const {
  categorySchemaValidation,
  updateCategorySchemaValidation,
  subCategorySchemaValidation,
  updateSubCategorySchemaValidation,
} = require("../validators/category.validation");

router.post(
  "/create",
  middleware.adminMiddleWare,
  validate(categorySchemaValidation),
  categoryController.addCategory,
);
router.get("/", categoryController.getCategory);
router.put(
  "/update/:id",
  middleware.adminMiddleWare,
  validate(updateCategorySchemaValidation),
  categoryController.updateCategory,
);
router.post(
  "/add-sub-category",
  middleware.adminMiddleWare,
  validate(subCategorySchemaValidation),
  categoryController.addSubCategory,
);
router.post(
  "/update-sub-category",
  middleware.adminMiddleWare,
  validate(updateSubCategorySchemaValidation),
  categoryController.updateSubCategory,
);

module.exports = router;
