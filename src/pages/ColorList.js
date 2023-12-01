import React, { useEffect,useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getColors, deleteAColor , resetState} from "../features/colors/colorSlice";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "ID",
    dataIndex: "id",
    sorter: (a, b) => a.id.length - b.id.length,
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

const ColorList = () => {

  const [open, setOpen] = useState(false);
  const [colorId, setcolorId] = useState("");
  const dispatch = useDispatch();
  const colorState = useSelector((state) => state.color.colors);

  useEffect(() => {
    dispatch(getColors());
    dispatch(resetState());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showModal = (e) => {
    setOpen(true);
    setcolorId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const deleteColor = (e) => {
    dispatch(deleteAColor(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getColors());
      window.location.reload();
    }, 100);
  }


  const data1 = colorState.map((color, index) => ({
    key: index + 1,
    id: color._id,
    name: color.title,
    action: (
      <>
        <Link to={`/admin/color/${color._id}`} className=" fs-3 text-danger">
          <BiEdit />
        </Link>
        <button
          className="ms-3 fs-3 text-danger bg-transparent border-0"
          onClick={() => showModal(color._id)}
        >
          <AiFillDelete />
        </button>
      </>
    ),
  }));

  return (
    <div className="mt-4">
      <h3 className="mb-5 title">Color List</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteColor(colorId);
        }}
        title="Are you sure you want to delete this color?"
      />
    </div>
  );
};

export default ColorList;
