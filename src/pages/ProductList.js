import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  deleteSingleProduct,
  resetState,
} from "../features/products/productsSlice";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Brand",
    dataIndex: "brands",
    sorter: (a, b) => a.brands.length - b.brands.length,
  },
  {
    title: "Category",
    dataIndex: "catagory",
    sorter: (a, b) => a.catagory.length - b.catagory.length,
  },
  {
    title: "Tags",
    dataIndex: "tags",
    sorter: (a, b) => a.tags.length - b.tags.length,
  },
  {
    title: 'Color',
    dataIndex: 'color',
  
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    sorter: (a, b) => a.quantity.length - b.quantity.length,
  },
  {
    title: "Reedim",
    dataIndex: "reedim",
    sorter: (a, b) => a.reedim.length - b.reedim.length,
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const ProductList = () => {
  const [open, setOpen] = useState(false);
  const [productId, setproductId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setproductId(e);
    console.log("id:", e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetState());
    dispatch(getProducts());
  }, [dispatch]);

  const productState = useSelector((state) => state.product.products);

  const data1 = productState.map((product, i) => ({
    key: i + 1,
    title: productState[i].title,
    brands: productState[i].brands,
    catagory: productState[i].catagory,
    tags: productState[i].tags,
    color: (
      <div>
        {productState[i].color?.map((color, index) => (
          <span
            key={index}
            style={{
              display: 'inline-block',
              width: '20px',
              height: '20px',
              backgroundColor: color?.title, // Assuming color.title holds color name
              marginRight: '5px',
            }}
          />
        ))}
      </div>
    ),
    quantity: productState[i].quantity,
    reedim: productState[i].reedim,
    price: `${productState[i].price}`,
    action: (
      <>
        <Link
          to={`/admin/product/${productState[i]._id}`}
          className=" fs-3 text-danger"
        >
          <BiEdit />
        </Link>
        <Link
          className="ms-3 fs-3 text-danger"
          onClick={() => showModal(productState[i]._id)}
        >
          <AiFillDelete />
        </Link>
      </>
    ),
  }));

  const deleteBrand = (e) => {
    dispatch(deleteSingleProduct(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getProducts());
      window.location.reload();
    }, 100);
  };

  return (
    <div className="mt-4">
      <h3 className="mb-5 title">Product List</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteBrand(productId);
        }}
        title="Are you sure you want to delete this product?"
      />
    </div>
  );
};

export default ProductList;
