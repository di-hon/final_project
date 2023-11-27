const express = require("express");
const { authMiddleware, isAdmin } = require("../../middlewares/authMiddleware");
const {
  createProductCategory,
  updateProductCategory,
  deleteProductCategory,
  getOneProductCategory,
  getProductCategories,
} = require("../../controllers/Product/productCategoryController");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createProductCategory);
router.put("/:id", authMiddleware, isAdmin, updateProductCategory);
router.delete("/:id", authMiddleware, isAdmin, deleteProductCategory);
router.get("/:id", getOneProductCategory);
router.get("/", getProductCategories);

module.exports = router;
