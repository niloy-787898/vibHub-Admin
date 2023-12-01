import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  getEnquaries,
  deleteAEnquiry,
  resetState,
  updateAEnquiry,
} from "../features/enquary/enquarySlice";
import CustomModal from "../components/CustomModal";

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
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
  {
    title: "Comment",
    dataIndex: "comment",
  },
  {
    title: "Staus",
    dataIndex: "status",
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

const Enquaries = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [enqId, setenqId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setenqId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(resetState());
    dispatch(getEnquaries());
  }, [dispatch]);
  const enquaryState = useSelector((state) => state.enquary.enquaries);
  console.log(enquaryState);

  const data1 = [];
  for (let i = 0; i < enquaryState.length; i++) {
    data1.push({
      key: i + 1,
      name: enquaryState[i].name,
      email: enquaryState[i].email,
      mobile: enquaryState[i].mobile,
      comment: enquaryState[i].comment,
      status: (
        <>
          <select
            name=""
            defaultValue={
              enquaryState[i].status ? enquaryState[i].status : "Submitted"
            }
            className="form-control form-select"
            id=""
            onChange={(e) => setEnquiryStatus(e.target.value, enquaryState[i]._id)}
          >
            <option value="Submitted">Submitted</option>
            <option value="Contacted">Contacted</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </>
      ),

      action: (
        <>
          <Link
            className="ms-3 fs-3 text-danger"
            to={`/admin/enquiries/${enquaryState[i]._id}`}
          >
            <AiOutlineEye />
          </Link>
          <button className="ms-3 fs-3 text-danger bg-transparent border-0" onClick={() => showModal(enquaryState[i]._id)}>
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const setEnquiryStatus = (e, i) => {
    console.log(e, i);
    const data = { id: i, enqData: e };
    dispatch(updateAEnquiry(data));
  };
  const deleteEnq = (e) => {
    dispatch(deleteAEnquiry(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getEnquaries());
    }, 100);
  };
  return (
    <div className="mt-4">
      <h3 className="mb-5 title">Enquaries</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div><CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteEnq(enqId);
        }}
        title="Are you sure you want to delete this enquiry?"
      />
    </div>
  );
};

export default Enquaries;
