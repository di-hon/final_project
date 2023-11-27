const express = require("express");
const { authMiddleware, isAdmin } = require("../../middlewares/authMiddleware");
const {
  createBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
  getOneBlogCategory,
  getBlogCategories,
} = require("../../controllers/Blog/blogCategoryController");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createBlogCategory);
router.put("/:id", authMiddleware, isAdmin, updateBlogCategory);
router.delete("/:id", authMiddleware, isAdmin, deleteBlogCategory);
router.get("/:id", getOneBlogCategory);
router.get("/", getBlogCategories);

module.exports = router;
