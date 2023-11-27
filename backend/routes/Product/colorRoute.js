const express = require("express");
const { authMiddleware, isAdmin } = require("../../middlewares/authMiddleware");
const {
  createColor,
  updateColor,
  deleteColor,
  getOneColor,
  getColors,
} = require("../../controllers/Product/colorController");

const router = express.Router();

router.post("/", authMiddleware, isAdmin, createColor);
router.put("/:id", authMiddleware, isAdmin, updateColor);
router.delete("/:id", authMiddleware, isAdmin, deleteColor);
router.get("/:id", getOneColor);
router.get("/", getColors);

module.exports = router;
