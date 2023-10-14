const express = require("express");
const {
  createProduct,
  getOneProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  addToWishList,
  rating,
  uploadProductImage,
  deleteProductImage,
} = require("../../controllers/Product/productController");
const { isAdmin, authMiddleware } = require("../../middlewares/authMiddleware");
const {
  uploadImage,
  productImageResize,
} = require("../../middlewares/uploadImages");

const router = express.Router();

router.post("/", authMiddleware, isAdmin, createProduct);
router.put(
  "/upload",
  authMiddleware,
  isAdmin,
  uploadImage.array("images", 10),
  productImageResize,
  uploadProductImage
);
router.get("/:id", getOneProduct);
router.put("/wishlist", authMiddleware, addToWishList);
router.put("/rating", authMiddleware, rating);
router.put("/:id", authMiddleware, isAdmin, updateProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);
router.delete("/delete-image/:id", authMiddleware, isAdmin, deleteProductImage);
router.get("/", getProducts);

module.exports = router;
