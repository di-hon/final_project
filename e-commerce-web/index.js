const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const dbConnect = require("./config/dbConnect");
const authRouter = require("./routes/User/authRoute");
const productRouter = require("./routes/Product/productRoute");
const blogRouter = require("./routes/Blog/blogRoute");
const productCategoryRouter = require("./routes/Product/productCategoryRoute");
const blogCategoryRouter = require("./routes/Blog/blogCategoryRoute");
const brandRouter = require("./routes/Product/brandRoute");
const colorRouter = require("./routes/Product/colorRoute");
const enquiryRouter = require("./routes/User/enquiryRoute");
const couponRouter = require("./routes/User/couponRoute");
const morgan = require("morgan");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require("cors");

dbConnect();

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/user", authRouter);
app.use("/api/product", productRouter);
app.use("/api/blog", blogRouter);
app.use("/api/product-category", productCategoryRouter);
app.use("/api/blog-category", blogCategoryRouter);
app.use("/api/brand", brandRouter);
app.use("/api/color", colorRouter);
app.use("/api/enquiry", enquiryRouter);
app.use("/api/coupon", couponRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
