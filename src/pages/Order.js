import React, { useEffect} from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrders, resetState, updateOrder } from "../features/auth/authSlice";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Ordered By",
    dataIndex: "orderby",
  },
  {
    title: "Prodcut Name",
    dataIndex: "pname",
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Coin Earned",
    dataIndex: "coinsEarned",
  },

  {
    title: "Staus",
    dataIndex: "status",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
];

const Order = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getOrders());
  }, [dispatch]);

  const orderState = useSelector((state) => state?.auth?.orders);
  const data1 = [];
  for (let i = 0; i < orderState?.length; i++) {
    data1.push({
      key: i + 1,
      orderby:
        orderState[i].user?.firstname + " " + orderState[i].user?.lastname,
      pname: orderState[i].orderItems[0]?.product?.title,
      product: (
        <Link to={`/admin/orders/${orderState[i]?._id}`}>View Orders</Link>
      ),
      amount: orderState[i].totalPrice,
      coinsEarned: orderState[i].orderItems[0]?.product?.reedim,
      status: (
        <>
          <select
            name=""
            defaultValue={
              orderState[i] && orderState[i]?.status
                ? orderState[i]?.status
                : "ordered"
            }
            className="form-control form-select"
            id=""
            onChange={(e) =>
              handleOrderStatusChange(orderState[i]?._id, e.target.value)
            }
          >
            <option value="ordered" disabled>
              ordered
            </option>
            <option value="progress">In Progress</option>
            <option value="delivered">Delivered</option>
            <option value="canceled">Canceled</option>
          </select>
        </>
      ),
      date: new Date(orderState[i].createdAt).toLocaleString(),
    });
    
  }
  const handleOrderStatusChange = (orderId, newStatus) => {
    // Dispatch an action to update the order status
    dispatch(updateOrder({ id: orderId, status: newStatus }));
  };



  return (
    <div className="mt-4">
      <h3 className="mb-5 title">Order</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Order;
