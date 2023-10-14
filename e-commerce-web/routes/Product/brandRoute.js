const express = require("express");
const { authMiddleware, isAdmin } = require("../../middlewares/authMiddleware");
const {
  createBrand,
  updateBrand,
  deleteBrand,
  getOneBrand,
  getBrands,
} = require("../../controllers/Product/brandController");

const router = express.Router();

router.post("/", authMiddleware, isAdmin, createBrand);
router.put("/:id", authMiddleware, isAdmin, updateBrand);
router.delete("/:id", authMiddleware, isAdmin, deleteBrand);
router.get("/:id", getOneBrand);
router.get("/", getBrands);

module.exports = router;
