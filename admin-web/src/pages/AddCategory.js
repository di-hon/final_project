import { React, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createProductCategories } from "../features/productCategory/productCategorySlice";
import { resetState } from "../features/blog/blogSlice";

let schema = Yup.object().shape({
  name: Yup.string().required("Category name is required"),
});
const AddCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newCategory = useSelector((state) => state.productCategory);

  const { isSuccess, isError, isLoading, createdCategories } = newCategory;
  useEffect(() => {
    if (isSuccess && createdCategories) {
      toast.success("Category added successfully!");
    }
    if (isError) {
      toast.error("Something went wrong");
    }
  }, [isSuccess, isError, isLoading, createdCategories]);

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createProductCategories(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/category-list");
      }, 3000);
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">Add Category</h3>
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
            Add category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
