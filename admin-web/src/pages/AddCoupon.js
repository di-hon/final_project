import { React, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createCoupons, resetState } from "../features/coupon/couponSlice";

let schema = Yup.object().shape({
  name: Yup.string().required("Coupon name is required"),
  expiredDate: Yup.date().required("Expired date is required"),
  discount: Yup.number().required("Discount is required"),
});
const AddCoupon = () => {
  const dispatch = useDispatch();
  const newCoupon = useSelector((state) => state.coupon);

  const { isSuccess, isError, isLoading, createdCoupon } = newCoupon;

  useEffect(() => {
    if (isSuccess && createdCoupon) {
      toast.success("Coupon added successfully!");
    }
    if (isError) {
      toast.error("Something went wrong");
    }
  }, [isSuccess, isError, isLoading, createdCoupon]);

  const formik = useFormik({
    initialValues: {
      name: "",
      expiredDate: "",
      discount: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createCoupons(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">Add Coupon</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter coupon name"
            name="name"
            onCh={formik.handleChange("name")}
            onBl={formik.handleBlur("name")}
            val={formik.values.name}
            id="name"
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>
          <CustomInput
            type="date"
            label="Enter expired date"
            name="expiredDate"
            onCh={formik.handleChange("expiredDate")}
            onBl={formik.handleBlur("expiredDate")}
            val={formik.values.expiredDate}
            id="expiredDate"
          />
          <div className="error">
            {formik.touched.expiredDate && formik.errors.expiredDate}
          </div>
          <CustomInput
            type="number"
            label="Enter discount"
            name="discount"
            onCh={formik.handleChange("discount")}
            onBl={formik.handleBlur("discount")}
            val={formik.values.discount}
            id="discount"
          />
          <div className="error">
            {formik.touched.discount && formik.errors.discount}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add coupon
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCoupon;
