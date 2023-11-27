const Brand = require("../../models/Product/brandModel.js");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../../utils/validateMongodbId.js");

// CREATE CATEGORY
const createBrand = asyncHandler(async (req, res) => {
  try {
    const newBrand = await Brand.create(req.body);
    res.json(newBrand);
  } catch (error) {
    throw new Error(error);
  }
});

// UPDATE CATEGORY
const updateBrand = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongodbId(id);
    const updateBrand = await Brand.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateBrand);
  } catch (error) {
    throw new Error(error);
  }
});

// DELETE CATEGORY
const deleteBrand = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongodbId(id);
    const deleteBrand = await Brand.findByIdAndDelete(id);
    res.json(deleteBrand);
  } catch (error) {
    throw new Error(error);
  }
});

// GET ONE BRAND
const getOneBrand = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongodbId(id);
    const getOneBrand = await Brand.findById(id);
    res.json(getOneBrand);
  } catch (error) {
    throw new Error(error);
  }
});

// GET ALL BRANDS
const getBrands = asyncHandler(async (req, res) => {
  try {
    const getBrands = await Brand.find();
    res.json(getBrands);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createBrand,
  updateBrand,
  deleteBrand,
  getOneBrand,
  getBrands,
};
