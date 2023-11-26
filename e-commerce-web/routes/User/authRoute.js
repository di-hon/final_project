const express = require("express");
const {
  createUser,
  loginUser,
  getUsers,
  getOneUser,
  deleteUser,
  updateUser,
  unblockUser,
  blockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgetPassword,
  resetPassword,
  loginAdmin,
  getWishlist,
  saveAddress,
  addToCart,
  getUserCart,
  // emptyCart,
  // applyCoupon,
  createOrder,
  getOrders,
  // updateOrderStatus,
  // getAllOrders,
  // getOrderByUserId,
  removeProductCart,
  updateProductCartQuantity,
} = require("../../controllers/User/userController");
const { authMiddleware, isAdmin } = require("../../middlewares/authMiddleware");
const {
  checkout,
  paymentVerification,
} = require("../../controllers/User/paymentController");
const router = express.Router();

router.post("/register", createUser);
router.post("/forget-password", forgetPassword);
router.put("/reset-password/:token", resetPassword);
router.put("/password", authMiddleware, updatePassword);

router.post("/login", loginUser);
router.post("/admin-login", loginAdmin);
router.post("/cart", authMiddleware, addToCart);
router.post("/order/checkout", authMiddleware, checkout);
router.post("/order/payment-verification", authMiddleware, paymentVerification);
// router.post("/cart/apply-coupon", authMiddleware, applyCoupon);
router.post("/cart/create-order", authMiddleware, createOrder);
router.get("/all-users", getUsers);
router.get("/order", authMiddleware, getOrders);
// router.get("/all-orders", authMiddleware, isAdmin, getAllOrders);
// router.post("/order-user/:id", authMiddleware, isAdmin, getOrderByUserId);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/wishlist", authMiddleware, getWishlist);
router.get("/cart", authMiddleware, getUserCart);
router.get("/:id", authMiddleware, isAdmin, getOneUser);
// router.delete("/empty-cart", authMiddleware, emptyCart);
router.delete(
  "/delete-product-cart/:cartItemId",
  authMiddleware,
  removeProductCart
);
router.delete(
  "/update-product-cart/:cartItemId/:newQuantity",
  authMiddleware,
  updateProductCartQuantity
);
router.delete("/:id", deleteUser);
router.put("/edit-user", authMiddleware, updateUser);
router.put("/save-address", authMiddleware, saveAddress);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);
// router.put(
//   "/order/order-status/:id",
//   authMiddleware,
//   isAdmin,
//   updateOrderStatus
// );

module.exports = router;
