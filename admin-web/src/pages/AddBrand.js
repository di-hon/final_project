import { React, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createBrands, resetState } from "../features/brand/brandSlice";

let schema = Yup.object().shape({
  name: Yup.string().required("Brand name is required"),
});
const AddBrand = () => {
  const dispatch = useDispatch();
  const newBrand = useSelector((state) => state.brand);

  const { isSuccess, isError, isLoading, createdBrand } = newBrand;
  useEffect(() => {
    if (isSuccess && createdBrand) {
      toast.success("Brand added successfully!");
    }
    if (isError) {
      toast.error("Something went wrong");
    }
  }, [isSuccess, isError, isLoading, createdBrand]);

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createBrands(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">Add Brand</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter brand"
            name="name"
            onCh={formik.handleChange("name")}
            onBl={formik.handleBlur("name")}
            val={formik.values.name}
            id="brand"
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add brand
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBrand;
