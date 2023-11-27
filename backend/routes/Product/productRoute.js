const express = require("express");
const {
  createProduct,
  getOneProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  addToWishList,
  rating,
} = require("../../controllers/Product/productController");
const { isAdmin, authMiddleware } = require("../../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, isAdmin, createProduct);
router.get("/:id", getOneProduct);
router.put("/wishlist", authMiddleware, addToWishList);
router.put("/rating", authMiddleware, rating);
router.put("/:id", authMiddleware, isAdmin, updateProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);
router.get("/", getProducts);

module.exports = router;
