const Enquiry = require("../../models/User/enquiryModel.js");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../../utils/validateMongodbId.js");

// CREATE ENQUIRY
const createEnquiry = asyncHandler(async (req, res) => {
  try {
    const newEnquiry = await Enquiry.create(req.body);
    res.json(newEnquiry);
  } catch (error) {
    throw new Error(error);
  }
});

// UPDATE ENQUIRY
const updateEnquiry = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongodbId(id);
    const updateEnquiry = await Enquiry.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateEnquiry);
  } catch (error) {
    throw new Error(error);
  }
});

// DELETE ENQUIRY
const deleteEnquiry = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongodbId(id);
    const deleteEnquiry = await Enquiry.findByIdAndDelete(id);
    res.json(deleteEnquiry);
  } catch (error) {
    throw new Error(error);
  }
});

// GET ONE ENQUIRY
const getOneEnquiry = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongodbId(id);
    const getOneEnquiry = await Enquiry.findById(id);
    res.json(getOneEnquiry);
  } catch (error) {
    throw new Error(error);
  }
});

//GET ALL ENQUIRIES
const getEnquiries = asyncHandler(async (req, res) => {
  try {
    const getEnquiries = await Enquiry.find();
    res.json(getEnquiries);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
  getOneEnquiry,
  getEnquiries,
};
