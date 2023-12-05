import React, { useEffect, useState } from "react";
import { BsArrowDownRight } from "react-icons/bs";
import { Column } from "@ant-design/plots";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getMonthlyData,
  getYearlyData,
  getOrders,
  resetState,
} from "../features/auth/authSlice";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product Name",
    dataIndex: "productname",
  },
  {
    title: "Product Count",
    dataIndex: "productcount",
  },
  {
    title: "Total Price",
    dataIndex: "totalprice",
  },
  {
    title: "Total Price After Discount",
    dataIndex: "totalpricediscount",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const [dataMonthlyIncome, setDataMonthlyIncome] = useState([]);
  const [dataMonthlySales, setDataMonthlySales] = useState([]);
  const monthlyDataState = useSelector((state) => state?.auth?.monthlydata);
  const yearlyDataState = useSelector((state) => state?.auth?.yearlydata);
  const orderState = useSelector((state) => state?.auth?.orders);

  useEffect(() => {
    dispatch(resetState());
    dispatch(getOrders());
    dispatch(getMonthlyData());
    dispatch(getYearlyData());
  }, [dispatch]);

  useEffect(() => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const transformedData = monthlyDataState?.map((item) => ({
      type: monthNames[item._id.month - 1],
      income: item.amount,
      sales: item.sales,
    }));
    const transformedData2 = monthlyDataState?.map((item) => ({
      type: monthNames[item._id.month - 1],
      sales: item.count,
    }));

    setDataMonthlyIncome(transformedData || []);
    setDataMonthlySales(transformedData2 || []);
  }, [monthlyDataState, yearlyDataState]);

  const config = {
    data: dataMonthlyIncome,
    xField: "type",
    yField: "income",
    color: ({ type }) => {
      return "#000c17";
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };
  const config2 = {
    data: dataMonthlySales,
    xField: "type",
    yField: "sales",
    color: ({ type }) => {
      return "#000c17";
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Sales",
      },
    },
  };

  const data1 = [];
  if (Array.isArray(orderState) && orderState.length > 0) {
    for (let i = 0; i < orderState?.length; i++) {
      const orderItem = orderState[i]?.orderItems[0] || {}; // To handle potential undefined orderItems
      const product = orderItem.product || {};

      data1.push({
        key: i + 1,
        name: `${orderState[i].user?.firstname} ${orderState[i].user?.lastname}`,
        pname: product.title || "", // Handle undefined product title
        productname: product.title || "", // Duplicate entry; consider modifying if necessary
        productcount: orderItem.quantity || 0, // Handle undefined quantity
        totalprice: orderItem.price || 0, // Handle undefined price
        totalpricediscount: (orderItem.price || 0) - (product.reedim || 0), // Handle potential undefined reedim
        status: orderState[i]?.status || "",
      });
    }
  }

  return (
    <div>
      <h3 className="mb-4 title">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-4 roudned-3">
          <div>
            <p className="desc mb-0">Total</p>
            <h4 className="sub-title mb-0 ">
              $
              {Array.isArray(yearlyDataState) && yearlyDataState?.length > 0
                ? yearlyDataState[0]?.amount !== undefined
                  ? yearlyDataState[0].amount
                  : "No data"
                : "No data"}
            </h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <p className="mb-0  desc">Yearly Total Income</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-4 roudned-3">
          <div className="">
            <p className="desc mb-0 ">Total</p>
            <h4 className="sub-title mb-0 ">
              {Array.isArray(yearlyDataState) && yearlyDataState?.length > 0
                ? yearlyDataState[0]?.count !== undefined
                  ? yearlyDataState[0].count
                  : "No data"
                : "No data"}
            </h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <p className="mb-0  desc">Yearly Total Income</p>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "30px",
        }}
      >
        <div style={{ flex: 1, maxWidth: "calc(50% - 10px)" }}>
          <div className="mt-4">
            <h3 className="mb-5 title">Income Statics</h3>
            <div>
              <Column {...config} />
            </div>
          </div>
        </div>
        <div style={{ flex: 1, maxWidth: "calc(50% - 10px)" }}>
          <div className="mt-4">
            <h3 className="mb-5 title">Sales Statics</h3>
            <div>
              <Column {...config2} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="mb-5 title">Recent Orders</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
