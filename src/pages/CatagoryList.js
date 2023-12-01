import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductCatagories,
  deleteAProductCategory,
  resetState,
} from "../features/productcatagory/productcatagorySlice";
import CustomModal from "../components/CustomModal";
const columns = [
  {
    title: "SNo",
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

const CatagoryList = () => {
  
  const [open, setOpen] = useState(false);
  const [pCatId, setpCatId] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetState());
    dispatch(getProductCatagories());
  }, [dispatch]);

  const productCatagoryState = useSelector(
    (state) => state.productcatagory.productCatagories
  );

  const showModal = (e) => {
    setOpen(true);
    setpCatId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };


  const data1 = productCatagoryState.map((category, index) => ({
    key: index + 1,
    name: category.title,
    action: (
      <>
        <Link
          to={`/admin/category/${category._id}`}
          className=" fs-3 text-danger"
        >
          <BiEdit />
        </Link>
        <button
          className="ms-3 fs-3 text-danger bg-transparent border-0"
          onClick={() => showModal(category._id)}
        >
          <AiFillDelete />
        </button>
      </>
    ),
  }));
  const deleteCategory = (e) => {
    dispatch(deleteAProductCategory(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getProductCatagories());
      window.location.reload();
    }, 100)
  };

  return (
    <div className="mt-4">
      <h3 className="mb-5 title">Catagory List</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteCategory(pCatId);
        }}
        title="Are you sure you want to delete this Product Category?"
      />
    </div>
  );
};

export default CatagoryList;
