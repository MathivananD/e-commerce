const express = require("express");
const router = express.Router();
const { adminMiddleWare } = require("../middleware/auth.middleware");
const productController = require("../controller/product.controller");
const {
  createProductSchema,
  productFilterSchema,
} = require("../validators/product.validator");
const validate = require("../validators/custom.validators");

router.get("/", validate(productFilterSchema), productController.getProduct);
router.get("/:productId/variants", productController.getProductVariant);
router.get("/:id", adminMiddleWare, productController.getProductDetails);
router.post(
  "/",
  adminMiddleWare,
  validate(createProductSchema),
  productController.createProduct,
);
router.put("/:id", adminMiddleWare, productController.updateProduct);
router.put(
  "/:productId/variants/:variantId",
  adminMiddleWare,
  productController.updateProductVariant,
);
router.delete("/update/:id", adminMiddleWare, productController.deleteProduct);

module.exports = router;
