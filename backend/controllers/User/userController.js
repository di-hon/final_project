const { generateToken } = require("../../config/jwtToken");
const User = require("../../models/User/userModel");
const Product = require("../../models/Product/productModel");
const Cart = require("../../models/User/cartModel");
const Counpon = require("../../models/User/couponModel");
const Order = require("../../models/User/orderModel");

const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../../utils/validateMongodbId");
const { generateRefreshToken } = require("../../config/refreshToken");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("./emailController");
const uniqid = require("uniqid");

// REGISTER
const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    throw new Error("User already exists");
  }
});

// LOGIN
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // Check if user exists or not
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findUser?._id);
    const updateUser = await User.findByIdAndUpdate(
      findUser?.id,
      {
        refreshToken: refreshToken,
      },
      {
        new: true,
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

// ADMIN LOGIN
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // Check if user exists or not
  const findAdmin = await User.findOne({ email });
  if (findAdmin.role !== "admin") throw new Error("Not Authorized!");
  if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findAdmin?._id);
    const updateAdmin = await User.findByIdAndUpdate(
      findAdmin?.id,
      {
        refreshToken: refreshToken,
      },
      {
        new: true,
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findAdmin?._id,
      firstname: findAdmin?.firstname,
      lastname: findAdmin?.lastname,
      email: findAdmin?.email,
      mobile: findAdmin?.mobile,
      token: generateToken(findAdmin?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

// SAVE ADDRESS
const saveAddress = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  validateMongodbId(_id);
  try {
    const saveAddress = await User.findByIdAndUpdate(
      _id,
      {
        address: req?.body?.address,
      },
      {
        new: true,
      }
    );
    res.json(saveAddress);
  } catch (error) {
    throw new Error(error);
  }
});

// GET ALL USERS
const getUsers = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find();
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

// GET ONE USER
const getOneUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const getOneUser = await User.findById(id);
    res.json({
      getOneUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// HANDLE REFRESH TOKEN
const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No refresh token in cookies!");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user)
    throw new Error("No refresh token present in database or not matched!");
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("There is something wrong!");
    }
    const accessToken = generateToken(user?._id);
    res.json({ accessToken });
  });
});

// LOGOUT
const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No refresh token in cookies!");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204); // forbidden;
  }
  await User.findOneAndUpdate(
    { refreshToken: refreshToken },
    {
      refreshToken: "",
    }
  );
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.sendStatus(204); // forbidden
});

// UPDATE USER
const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongodbId(_id);
  try {
    const updateUser = await User.findByIdAndUpdate(
      _id,
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      {
        new: true,
      }
    );
    res.json(updateUser);
  } catch (error) {
    throw new Error(error);
  }
});

// DELETE USER
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deleteUser = await User.findByIdAndDelete(id);
    res.json({
      deleteUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//BLOCK USER
const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const blockUser = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "User is blocked",
    });
  } catch (error) {
    throw new Error(error);
  }
});

// UNBLOCK USER
const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const unblockUser = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "User is unblocked",
    });
  } catch (error) {
    throw new Error(error);
  }
});

// CHANGE PASSWORD
const updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  validateMongodbId(_id);
  const user = await User.findById(_id);

  if (password) {
    user.password = password;
    const updatedPassword = await user.save();
    res.json(updatedPassword);
  } else {
    res.json(user);
  }
});

// FORGET PASSWORD
const forgetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) throw new Error("User or email not found");
  try {
    const token = await user.createPasswordResetToken();
    await user.save();
    const resetURL = `Hi, please follow this link to reset password. <a href='http://localhost:3000/reset-password/${token}'>Click Here</a>`;
    const data = {
      to: email,
      subject: "Forget password link",
      text: "Hey user",
      htm: resetURL,
    };
    sendEmail(data);
    res.json(token);
  } catch (error) {
    throw new Error(error);
  }
});

// RESET PASSWORD
const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpired: { $gt: Date.now() },
  });

  if (!user) throw new Error("Token is expired");
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpired = undefined;
  await user.save();
  res.json(user);
});

// GET WISHLIST
const getWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const findUser = await User.findById(_id).populate("wishlist");
    res.json(findUser);
  } catch (error) {
    throw new Error(error);
  }
});

// ADD TO CART
const addToCart = asyncHandler(async (req, res) => {
  const { productId, color, quantity, price } = req.body;
  const { _id } = req.user;
  validateMongodbId(_id);
  try {
    let newCart = await new Cart({
      userId: _id,
      productId,
      color,
      price,
      quantity,
    }).save();
    res.json(newCart);
  } catch (error) {
    throw new Error(error);
  }
});

// GET USER CART
const getUserCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongodbId(_id);
  try {
    const cart = await Cart.find({ userId: _id })
      .populate("productId")
      .populate("color");
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});

// REMOVE PRODUCT FROM CART
const removeProductCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { cartItemId } = req.params;
  validateMongodbId(_id);
  try {
    const deletedProductCart = await Cart.deleteOne({
      userId: _id,
      _id: cartItemId,
    });
    res.json(deletedProductCart);
  } catch (error) {
    throw new Error(error);
  }
});

// EMPTY CART AFTER CREATE ORDER
const emptyCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongodbId(_id);
  try {
    const deleteCart = await Cart.deleteMany({ userId: _id });
    res.json(deleteCart);
  } catch (error) {
    throw new Error(error);
  }
});

// UPDATE PRODUCT QUANTITY IN CART
const updateProductCartQuantity = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { cartItemId, newQuantity } = req.params;
  validateMongodbId(_id);
  try {
    const cartItem = await Cart.findOne({
      userId: _id,
      _id: cartItemId,
    });
    cartItem.quantity = newQuantity;
    cartItem.save();
    res.json(cartItem);
  } catch (error) {
    throw new Error(error);
  }
});

// CREATE ORDER
const createOrder = asyncHandler(async (req, res) => {
  const {
    deliveryInfo,
    orderItems,
    totalPrice,
    totalPriceAfterDiscount,
    paymentInfo,
  } = req.body;
  const { _id } = req.user;
  try {
    const order = await Order.create({
      deliveryInfo,
      orderItems,
      totalPrice,
      totalPriceAfterDiscount,
      paymentInfo,
      user: _id,
    });
    res.json({
      order,
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// GET USER ORDERS
const getUserOrders = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const orders = await Order.find({ user: _id })
      .populate("user")
      .populate("orderItems.product")
      .populate("orderItems.color");
    res.json({
      orders,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// GET ALL ORDERS
const getOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find().populate("user");
    res.json({
      orders,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// GET ORDER DETAIL
const getOrderDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const orderDetail = await Order.findOne({ _id: id })
      .populate("orderItems.product")
      .populate("orderItems.color");
    res.json({
      orderDetail,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// UPDATE ORDER STATUS
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    console.log(order);
    order.orderStatus = req.body.status;
    await order.save();
    res.json({
      order,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// GET MONTHLY ORDERS
const getMonthlyOrder = asyncHandler(async (req, res) => {
  let monthNames = [
    "January",
    "February",
    "Mars",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let d = new Date();
  let endDate = "";
  d.setDate(1);
  for (let index = 0; index < 11; index++) {
    d.setMonth(d.getMonth() - 1);
    endDate = monthNames[d.getMonth()] + " " + d.getFullYear();
  }
  const data = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $lte: new Date(),
          $gte: new Date(endDate),
        },
      },
    },
    {
      $group: {
        _id: {
          month: "$month",
        },
        amount: {
          $sum: "$totalPriceAfterDiscount",
        },
        count: {
          $sum: 1,
        },
      },
    },
  ]);
  res.json(data);
});

// GET YEARLY ORDERS
const getYearlyTotalOrders = asyncHandler(async (req, res) => {
  let monthNames = [
    "January",
    "February",
    "Mars",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let d = new Date();
  let endDate = "";
  d.setDate(1);
  for (let index = 0; index < 11; index++) {
    d.setMonth(d.getMonth() - 1);
    endDate = monthNames[d.getMonth()] + " " + d.getFullYear();
  }
  const data = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $lte: new Date(),
          $gte: new Date(endDate),
        },
      },
    },
    {
      $group: {
        _id: null,
        count: {
          $sum: 1,
        },
        amount: {
          $sum: "$totalPriceAfterDiscount",
        },
      },
    },
  ]);
  res.json(data);
});

module.exports = {
  createUser,
  loginUser,
  getUsers,
  getOneUser,
  deleteUser,
  updateUser,
  blockUser,
  unblockUser,
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
  emptyCart,
  // applyCoupon,
  createOrder,
  getUserOrders,
  getOrders,
  getOrderDetails,
  updateOrderStatus,
  removeProductCart,
  updateProductCartQuantity,
  getMonthlyOrder,
  getYearlyTotalOrders,
};
