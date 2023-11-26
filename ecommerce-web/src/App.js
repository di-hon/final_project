import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import OurStore from "./pages/OurStore";
import Blog from "./pages/Blog";
import CompareProduct from "./pages/CompareProduct";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import ForgetPassword from "./pages/ForgetPassword";
import SignUp from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import BlogDetail from "./pages/BlogDetail";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import DeliveryPolicy from "./pages/DeliveryPolicy";
import TermAndCondition from "./pages/TermAndCondition";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import { PrivateRoutes } from "./routing/PrivateRoutes";
import { OpenRoutes } from "./routing/OpenRoutes";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="product" element={<OurStore />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="blogs" element={<Blog />} />
            <Route path="blog/:id" element={<BlogDetail />} />
            <Route
              path="cart"
              element={
                <PrivateRoutes>
                  <Cart />
                </PrivateRoutes>
              }
            />
            <Route
              path="order"
              element={
                <PrivateRoutes>
                  <Orders />
                </PrivateRoutes>
              }
            />
            <Route
              path="profile"
              element={
                <PrivateRoutes>
                  <Profile />
                </PrivateRoutes>
              }
            />
            <Route
              path="checkout"
              element={
                <PrivateRoutes>
                  <Checkout />
                </PrivateRoutes>
              }
            />
            <Route path="compare-product" element={<CompareProduct />} />
            <Route
              path="wishlist"
              element={
                <PrivateRoutes>
                  <Wishlist />
                </PrivateRoutes>
              }
            />
            <Route
              path="login"
              element={
                <OpenRoutes>
                  <Login />
                </OpenRoutes>
              }
            />
            <Route path="forget-password" element={<ForgetPassword />} />
            <Route
              path="signup"
              element={
                <OpenRoutes>
                  <SignUp />
                </OpenRoutes>
              }
            />
            <Route path="reset-password/:token" element={<ResetPassword />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="refund-policy" element={<RefundPolicy />} />
            <Route path="delivery-policy" element={<DeliveryPolicy />} />
            <Route path="term-and-condition" element={<TermAndCondition />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
