import axios from "axios";
import { base_url } from "../../utils/base_url";

const getTokenFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const config = {
  headers: {
    Authorization: `Bearer ${getTokenFromLocalStorage.token}`,
    Accept: "application/json",
  },
};

const login = async (user) => {
  const response = await axios.post(`${base_url}user/admin-login`, user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const getOrders = async () => {
  const response = await axios.get(`${base_url}user/all-orders`, config);
  return response.data;
};

const getOrderDetail = async (id) => {
  const response = await axios.get(
    `${base_url}user/order-details/${id}`,
    config
  );
  return response.data;
};

const updateOrderStatus = async (data) => {
  const response = await axios.put(
    `${base_url}user/order/order-status/${data.id}`,
    { status: data.status },
    config
  );
  return response.data;
};

const getMonthlyOrder = async () => {
  const response = await axios.get(
    `${base_url}user/get-monthly-orders`,
    config
  );
  return response.data;
};

const getYearlyOrder = async () => {
  const response = await axios.get(`${base_url}user/get-yearly-orders`, config);
  return response.data;
};

const authService = {
  login,
  getOrders,
  getMonthlyOrder,
  getYearlyOrder,
  getOrderDetail,
  updateOrderStatus,
};

export default authService;
