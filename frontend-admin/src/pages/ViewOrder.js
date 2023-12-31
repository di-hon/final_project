import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getOrderDetail } from "../features/auth/authSlice";

const columns = [
  {
    title: "SNo.",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Count",
    dataIndex: "count",
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
];

const ViewOrder = () => {
  const location = useLocation();
  const getOrderId = location.pathname.split("/")[3];
  const dispatch = useDispatch();
  const orderState = useSelector(
    (state) => state?.auth?.orderDetail?.orderDetail
  );
  console.log(orderState);
  const data1 = [];

  useEffect(() => {
    dispatch(getOrderDetail(getOrderId));
  }, [getOrderId]);

  for (let i = 0; i < orderState?.orderItems?.length; i++) {
    data1.push({
      key: i + 1,
      name: orderState.orderItems[i]?.product.name,
      brand: orderState.orderItems[i]?.product.brand,
      count: orderState.orderItems[i]?.quantity,
      amount: orderState.orderItems[i]?.price,
      color: orderState.orderItems[i]?.color?.name,
    });
  }

  return (
    <div>
      <h3 className="mb-4 title"> View Order</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default ViewOrder;
