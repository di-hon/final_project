import React from "react";
import CustomInput from "../components/CustomInput";

const AddColor = () => {
  return (
    <div>
      <h3 className="mb-4 title">Add Color</h3>
      <div>
        <form action="">
          <CustomInput type="color" label="Enter color" />
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
