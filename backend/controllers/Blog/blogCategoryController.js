const blogCategory = require("../../models/Blog/blogCategoryModel.js");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../../utils/validateMongodbId.js");

// CREATE CATEGORY
const createBlogCategory = asyncHandler(async (req, res) => {
  try {
    const newBlogCategory = await blogCategory.create(req.body);
    res.json(newBlogCategory);
  } catch (error) {
    throw new Error(error);
  }
});

// UPDATE CATEGORY
const updateBlogCategory = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongodbId(id);
    const updateBlogCategory = await blogCategory.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );
    res.json(updateBlogCategory);
  } catch (error) {
    throw new Error(error);
  }
});

// DELETE CATEGORY
const deleteBlogCategory = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongodbId(id);
    const deleteBlogCategory = await blogCategory.findByIdAndDelete(id);
    res.json(deleteBlogCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const getOneBlogCategory = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongodbId(id);
    const getOneBlogCategory = await blogCategory.findById(id);
    res.json(getOneBlogCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const getBlogCategories = asyncHandler(async (req, res) => {
  try {
    const getBlogCategories = await blogCategory.find();
    res.json(getBlogCategories);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
  getOneBlogCategory,
  getBlogCategories,
};
