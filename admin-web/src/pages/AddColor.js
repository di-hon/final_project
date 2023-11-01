import { React, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createColors } from "../features/color/colorSlice";

let schema = Yup.object().shape({
  name: Yup.string().required("Color is required"),
});
const AddColor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newColor = useSelector((state) => state.color);

  const { isSuccess, isError, isLoading, createdColors } = newColor;
  useEffect(() => {
    if (isSuccess && createdColors) {
      toast.success("Color added successfully!");
    }
    if (isError) {
      toast.error("Something went wrong");
    }
  }, [isSuccess, isError, isLoading, createdColors]);

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createColors(values));
      formik.resetForm();
      setTimeout(() => {
        navigate("/admin/color-list");
      }, 3000);
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">Add Color</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="color"
            label="Enter color"
            name="name"
            onCh={formik.handleChange("name")}
            onBl={formik.handleBlur("name")}
            val={formik.values.name}
            id="color"
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add color
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddColor;
