import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductCategory,
  getProductCategories,
  resetState,
} from "../features/productCategory/productCategorySlice";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "SNo.",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const CategoryList = () => {
  const [open, setOpen] = useState(false);
  const [productCategoryId, setProductCategoryId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setProductCategoryId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getProductCategories());
  }, []);
  const productCategoryState = useSelector(
    (state) => state.productCategory.productCategories
  );
  const data1 = [];
  for (let i = 0; i < productCategoryState.length; i++) {
    data1.push({
      key: i + 1,
      name: productCategoryState[i].name,
      action: (
        <>
          <Link
            to={`/admin/category/${productCategoryState[i]._id}`}
            className="fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(productCategoryState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteAProductCategory = (e) => {
    dispatch(deleteProductCategory(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getProductCategories());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Product Category List</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteAProductCategory(productCategoryId);
        }}
        title="Are you sure you want to delete this category?"
      />
    </div>
  );
};

export default CategoryList;
