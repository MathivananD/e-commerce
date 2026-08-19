const express = require("express");
const router = express.Router();
const masterDataController = require("../controller/master-data.controller");
const masterDataValidator=require('../validators/master-data.validator')
const validate = require("../validators/custom.validators");

router.get("/brands", masterDataController.getBrand);
router.get("/colors", masterDataController.getColor);
router.get("/sizes", masterDataController.getSize);
router.get("/material", masterDataController.getMaterial);

router.get("/brands/:id", masterDataController.getBrandDetail);
router.get("/colors/:id", masterDataController.getColorDetail);
router.get("/sizes/:id", masterDataController.getSizeDetail);
router.get("/material/:id", masterDataController.getMaterialDetail);

router.post("/brands",validate(masterDataValidator.brandSchema) ,masterDataController.createBrand);
router.post("/colors",validate(masterDataValidator.colorSchema) , masterDataController.createColor);
router.post("/sizes", validate(masterDataValidator.sizeSchema) ,masterDataController.createSize);
router.post("/material",validate(masterDataValidator.materialSchema) , masterDataController.createMaterial);

router.put("/brands/:id",validate(masterDataValidator.brandSchema) , masterDataController.updateBrand);
router.put("/colors/:id",validate(masterDataValidator.colorSchema) , masterDataController.updateColor);
router.put("/sizes/:id",validate(masterDataValidator.sizeSchema) , masterDataController.updateSize);
router.put("/material/:id",validate(masterDataValidator.materialSchema) , masterDataController.updateMaterial);

router.delete("/brands/:id", masterDataController.deleteBrand);
router.delete("/colors/:id", masterDataController.deleteColor);
router.delete("/sizes/:id", masterDataController.deleteSize);
router.delete("/material/:id", masterDataController.deleteMaterial);

module.exports = router;
