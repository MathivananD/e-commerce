const express = require("express");
const router = express.Router();
const masterDataController = require("../controller/master-data.controller");
const masterDataValidator = require("../validators/master-data.validator");
const validate = require("../validators/custom.validators");

// Single API endpoint to bulk create default/custom master data across all categories
router.post(
  "/bulk",
  validate(masterDataValidator.bulkAllMasterDataSchema),
  masterDataController.createAllBulkMasterData
);
router.post(
  "/seed-default",
  validate(masterDataValidator.bulkAllMasterDataSchema),
  masterDataController.createAllBulkMasterData
);

// Specific bulk endpoints for individual categories
router.post(
  "/categories/bulk",
  validate(masterDataValidator.bulkCategorySchema),
  masterDataController.createBulkCategories
);
router.post(
  "/brands/bulk",
  validate(masterDataValidator.bulkBrandSchema),
  masterDataController.createBulkBrands
);
router.post(
  "/colors/bulk",
  validate(masterDataValidator.bulkColorSchema),
  masterDataController.createBulkColors
);
router.post(
  "/sizes/bulk",
  validate(masterDataValidator.bulkSizeSchema),
  masterDataController.createBulkSizes
);
router.post(
  "/material/bulk",
  validate(masterDataValidator.bulkMaterialSchema),
  masterDataController.createBulkMaterials
);

// GET All endpoints
router.get("/brands", masterDataController.getBrand);
router.get("/colors", masterDataController.getColor);
router.get("/sizes", masterDataController.getSize);
router.get("/material", masterDataController.getMaterial);

// GET Detail endpoints
router.get("/brands/:id", masterDataController.getBrandDetail);
router.get("/colors/:id", masterDataController.getColorDetail);
router.get("/sizes/:id", masterDataController.getSizeDetail);
router.get("/material/:id", masterDataController.getMaterialDetail);

// POST Single endpoints
router.post(
  "/brands",
  validate(masterDataValidator.brandSchema),
  masterDataController.createBrand
);
router.post(
  "/colors",
  validate(masterDataValidator.colorSchema),
  masterDataController.createColor
);
router.post(
  "/sizes",
  validate(masterDataValidator.sizeSchema),
  masterDataController.createSize
);
router.post(
  "/material",
  validate(masterDataValidator.materialSchema),
  masterDataController.createMaterial
);

// PUT endpoints
router.put(
  "/brands/:id",
  validate(masterDataValidator.brandSchema),
  masterDataController.updateBrand
);
router.put(
  "/colors/:id",
  validate(masterDataValidator.colorSchema),
  masterDataController.updateColor
);
router.put(
  "/sizes/:id",
  validate(masterDataValidator.sizeSchema),
  masterDataController.updateSize
);
router.put(
  "/material/:id",
  validate(masterDataValidator.materialSchema),
  masterDataController.updateMaterial
);

// DELETE endpoints
router.delete("/brands/:id", masterDataController.deleteBrand);
router.delete("/colors/:id", masterDataController.deleteColor);
router.delete("/sizes/:id", masterDataController.deleteSize);
router.delete("/material/:id", masterDataController.deleteMaterial);

module.exports = router;
