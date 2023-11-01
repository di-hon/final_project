const express = require("express");
const {
  uploadProductImage,
  deleteProductImage,
} = require("../../controllers/Product/uploadController");
const { isAdmin, authMiddleware } = require("../../middlewares/authMiddleware");
const {
  uploadImage,
  productImageResize,
} = require("../../middlewares/uploadImages");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  isAdmin,
  uploadImage.array("images", 10),
  productImageResize,
  uploadProductImage
);
router.delete("/delete-image/:id", authMiddleware, isAdmin, deleteProductImage);

module.exports = router;
