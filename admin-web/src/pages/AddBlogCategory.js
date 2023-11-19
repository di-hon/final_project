import { React, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  createBlogCategories,
  getAblogCategory,
  resetState,
  updateblogCategory,
} from "../features/blogCategory/blogCategorySlice";

let schema = Yup.object().shape({
  name: Yup.string().required("Brand name is required"),
});
const AddBlogCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getBlogCategoryId = location.pathname.split("/")[3];
  const newBlogCategory = useSelector((state) => state.blogCategory);

  const {
    isSuccess,
    isError,
    isLoading,
    blogCategoryName,
    createdBlogCategory,
    updatedBlogCategory,
  } = newBlogCategory;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: blogCategoryName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const data = { id: getBlogCategoryId, blogCategoryData: values };
      if (getBlogCategoryId !== undefined) {
        dispatch(updateblogCategory(data));
        dispatch(resetState());
      } else {
        dispatch(createBlogCategories(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });

  useEffect(() => {
    if (getBlogCategoryId !== undefined) {
      dispatch(getAblogCategory(getBlogCategoryId));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getBlogCategoryId]);

  useEffect(() => {
    if (isSuccess && createdBlogCategory) {
      toast.success("Blog category added successfully!");
    }
    if (isSuccess && updatedBlogCategory) {
      toast.success("Blog category updated successfully!");
      navigate("/admin/blog-category-list");
    }
    if (isError) {
      toast.error("Something went wrong");
    }
  }, [
    isSuccess,
    isError,
    isLoading,
    createdBlogCategory,
    updatedBlogCategory,
    navigate,
  ]);

  return (
    <div>
      <h3 className="mb-4 title">
        {getBlogCategoryId !== undefined ? "Edit" : "Add"} Blog Category
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter blog category"
            name="name"
            onCh={formik.handleChange("name")}
            onBl={formik.handleBlur("name")}
            val={formik.values.name}
            id="blog-category"
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getBlogCategoryId !== undefined ? "Edit" : "Add"} blog category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlogCategory;
