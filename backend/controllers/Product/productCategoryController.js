const productCategory = require("../../models/Product/productCategoryModel.js");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../../utils/validateMongodbId.js");

// CREATE CATEGORY
const createProductCategory = asyncHandler(async (req, res) => {
  try {
    const newProductCategory = await productCategory.create(req.body);
    res.json(newProductCategory);
  } catch (error) {
    throw new Error(error);
  }
});

// UPDATE CATEGORY
const updateProductCategory = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongodbId(id);
    const updateProductCategory = await productCategory.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );
    res.json(updateProductCategory);
  } catch (error) {
    throw new Error(error);
  }
});

// DELETE CATEGORY
const deleteProductCategory = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongodbId(id);
    const deleteProductCategory = await productCategory.findByIdAndDelete(id);
    res.json(deleteProductCategory);
  } catch (error) {
    throw new Error(error);
  }
});

// GET ONE PRODUCT CATEGORY
const getOneProductCategory = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongodbId(id);
    const getOneProductCategory = await productCategory.findById(id);
    res.json(getOneProductCategory);
  } catch (error) {
    throw new Error(error);
  }
});

// GET ALL PRODUCT CATEGORIES
const getProductCategories = asyncHandler(async (req, res) => {
  try {
    const getProductCategories = await productCategory.find();
    res.json(getProductCategories);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createProductCategory,
  updateProductCategory,
  deleteProductCategory,
  getOneProductCategory,
  getProductCategories,
};
