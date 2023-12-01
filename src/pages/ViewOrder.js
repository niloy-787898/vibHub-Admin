import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { getOrder } from "../features/auth/authSlice";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Product Name",
    dataIndex: "pname",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Catagory",
    dataIndex: "catagory",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Reedim",
    dataIndex: "reedim",
  },
  {
    title: "Price",
    dataIndex: "price",
  },

];

const ViewOrder = () => {
  const location = useLocation();
  const orderId = location.pathname.split("/")[3];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrder(orderId));
  }, [dispatch, orderId]);

  const orderState = useSelector((state) => state?.auth?.singleorder);
  console.log(orderState, 'data')


  const data1 = [];

  for (let i = 0; i < orderState?.orderItems?.length; i++) {
    data1.push({
      key: i + 1,
      pname: orderState.orderItems[i]?.product?.title,
      brand: orderState.orderItems[i]?.product?.brands,
      catagory: orderState.orderItems[i]?.product?.catagory,
      quantity: orderState.orderItems[i]?.quantity,
      color: orderState.orderItems[i]?.color?.title,
      reedim: orderState.orderItems[i]?.product?.reedim,
      price: orderState.orderItems[i]?.price,

    });
  }

  return (
    <div>
      <h3 className="mb-4 title">View Order</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default ViewOrder;
