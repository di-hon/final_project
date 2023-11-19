import { React, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  createProductCategories,
  getProductCategory,
  resetState,
  updateProductCategory,
} from "../features/productCategory/productCategorySlice";

let schema = Yup.object().shape({
  name: Yup.string().required("Category name is required"),
});
const AddCategory = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const getProductCategoryId = location.pathname.split("/")[3];
  const navigate = useNavigate();
  const newCategory = useSelector((state) => state.productCategory);

  const {
    isSuccess,
    isError,
    isLoading,
    createdCategories,
    categoryName,
    updatedCategory,
  } = newCategory;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: categoryName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getProductCategoryId !== undefined) {
        const data = { id: getProductCategoryId, productCategoryData: values };
        dispatch(updateProductCategory(data));
        dispatch(resetState());
      } else {
        dispatch(createProductCategories(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });
  useEffect(() => {
    if (getProductCategoryId !== undefined) {
      dispatch(getProductCategory(getProductCategoryId));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getProductCategoryId]);

  useEffect(() => {
    if (isSuccess && createdCategories) {
      toast.success("Category added successfully!");
    }
    if (isSuccess && updatedCategory) {
      toast.success("Category updated successfully");
      navigate("/admin/category-list");
    }
    if (isError) {
      toast.error("Something went wrong");
    }
  }, [
    isSuccess,
    isError,
    isLoading,
    createdCategories,
    categoryName,
    updatedCategory,
    navigate,
  ]);

  return (
    <div>
      <h3 className="mb-4 title">
        {getProductCategoryId !== undefined ? "Edit" : "Add"} Category
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter product category"
            name="name"
            onCh={formik.handleChange("name")}
            onBl={formik.handleBlur("name")}
            val={formik.values.name}
            id="category"
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getProductCategoryId !== undefined ? "Edit" : "Add"} category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
