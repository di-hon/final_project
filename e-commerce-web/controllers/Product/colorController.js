const Color = require("../../models/Product/colorModel");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../../utils/validateMongodbId.js");

// CREATE CATEGORY
const createColor = asyncHandler(async (req, res) => {
  try {
    const newColor = await Color.create(req.body);
    res.json(newColor);
  } catch (error) {
    throw new Error(error);
  }
});

// UPDATE CATEGORY
const updateColor = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongodbId(id);
    const updateColor = await Color.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateColor);
  } catch (error) {
    throw new Error(error);
  }
});

// DELETE CATEGORY
const deleteColor = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongodbId(id);
    const deleteColor = await Color.findByIdAndDelete(id);
    res.json(deleteColor);
  } catch (error) {
    throw new Error(error);
  }
});

const getOneColor = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongodbId(id);
    const getOneColor = await Color.findById(id);
    res.json(getOneColor);
  } catch (error) {
    throw new Error(error);
  }
});

const getColors = asyncHandler(async (req, res) => {
  try {
    const getColors = await Color.find();
    res.json(getColors);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createColor,
  updateColor,
  deleteColor,
  getOneColor,
  getColors,
};
