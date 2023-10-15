import React from "react";
import CustomInput from "../components/CustomInput";

const AddBlogCategory = () => {
  return (
    <div>
      <h3 className="mb-4 title">Add Blog Category</h3>
      <div>
        <form action="">
          <CustomInput type="text" label="Enter blog category" />
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add blog category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlogCategory;
