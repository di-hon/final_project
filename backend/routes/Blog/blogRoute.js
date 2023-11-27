const express = require("express");
const {
  createBlog,
  updateBlog,
  getOneBlog,
  getBlogs,
  deleteBlog,
  likeBlog,
  dislikeBlog,
  uploadBlogImage,
} = require("../../controllers/Blog/blogController");
const { authMiddleware, isAdmin } = require("../../middlewares/authMiddleware");
const {
  blogImageResize,
  uploadImage,
} = require("../../middlewares/uploadImages");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createBlog);
router.put(
  "/upload/:id",
  authMiddleware,
  isAdmin,
  uploadImage.array("images", 2),
  blogImageResize,
  uploadBlogImage
);
router.put("/likes", authMiddleware, likeBlog);
router.put("/dislikes", authMiddleware, dislikeBlog);
router.put("/:id", authMiddleware, isAdmin, updateBlog);
router.get("/:id", getOneBlog);
router.get("/", getBlogs);
router.delete("/:id", authMiddleware, isAdmin, deleteBlog);

module.exports = router;
