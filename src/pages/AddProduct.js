import { React, useState, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getBrands } from "../features/brands/brandSlice";
import { getProductCatagories } from "../features/productcatagory/productcatagorySlice";
import { getColors } from "../features/colors/colorSlice";
import {
  createProducts,
  getSingleProduct,
  updateSingleProduct,
  resetState,
 
} from "../features/products/productsSlice";
import { Select } from "antd";
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from "../features/upload/uploadSlice";

let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  price: yup.number().required("Price is Required"),
  brands: yup.string().required("Brand is Required"),
  catagory: yup.string().required("Category is Required"),
  tags: yup.string().required("Tag is Required"),
  color: yup
    .array()
    .min(1, "Pick at least one color")
    .required("Color is Required"),
  quantity: yup.number().required("Quantity is Required"),
  reedim: yup.number().required("Reedim is Required"),
});

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getProductId = location.pathname.split("/")[3];
  const [color, setColor] = useState([]);

  const brandState = useSelector((state) => state?.brand?.brands);
  const productCatagoryState = useSelector(
    (state) => state?.productcatagory?.productCatagories
  );
  const colorState = useSelector((state) => state?.color?.colors);
  const imgState = useSelector((state) => state?.upload?.images);
  const newProduct = useSelector((state) => state?.product);
  console.log(newProduct)
  const {
    isSuccess,
    isError,
    isLoading,
    createdProduct,
    updatedProduct,
    productName,
  } = newProduct;

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getProductCatagories());
    dispatch(getColors());
  }, [dispatch]);

  useEffect(() => {
    if (getProductId !== undefined) {
      dispatch(getSingleProduct(getProductId));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getProductId]);

  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("Product Added Successfullly!");
    }
    if (isSuccess && updatedProduct) {
      toast.success("Product Updated Successfullly!");
      navigate("/admin/product-list");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdProduct, updatedProduct, navigate]);

  const coloropt = colorState.map((i) => ({
    label: i.title,
    value: i.title,
  }));

  const img = [];
  imgState?.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  useEffect(() => {
    formik.values.color = color ? color : [];
    formik.values.images = img;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color, img]);

  const formik = useFormik({
    initialValues: {
      title: productName | "",
      description: "",
      price: "",
      brands: "",
      catagory: "",
      tags: "",
      color: "",
      quantity: "",
      reedim: "",
      images: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getProductId !== undefined) {
        const data = { id: getProductId, productData: values };
        dispatch(updateSingleProduct(data));
        dispatch(resetState());
      } else {
        dispatch(createProducts(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });

  const handleColors = (e) => {
    setColor(e);
  };

  return (
    <div>
      <h3 className="mb-4 title">
        {getProductId !== undefined ? "Edit" : "Add"} Product
      </h3>
      <div>
        <form
          action=""
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          <CustomInput
            type="text"
            label="Enter Product Title"
            name="title"
            onChange={formik.handleChange("title")}
            onBlur={formik.handleBlur("title")}
            value={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>

          <div className="mb-3">
            <ReactQuill
              theme="snow"
              name="description"
              onChange={formik.handleChange("description")}
              value={formik.values.description}
            />
          </div>
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>

          <CustomInput
            type="number"
            label="Enter Product Price"
            name="price"
            onChange={formik.handleChange("price")}
            onBlur={formik.handleBlur("price")}
            value={formik.values.price}
          />
          <div className="error">
            {formik.touched.price && formik.errors.price}
          </div>

          <select
            name="brands"
            onChange={formik.handleChange("brands")}
            onBlur={formik.handleBlur("brands")}
            value={formik.values.brands}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="">Select Brand</option>
            {brandState &&
              brandState.map((i, j) => {
                return (
                  <option key={j} value={i.title}>
                    {i.title}
                  </option>
                );
              })}
          </select>
          <div className="error">
            {formik.touched.brands && formik.errors.brands}
          </div>

          <select
            name="catagory"
            onChange={formik.handleChange("catagory")}
            onBlur={formik.handleBlur("catagory")}
            value={formik.values.catagory}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="">Select Category</option>
            {productCatagoryState &&
              productCatagoryState.map((i, j) => {
                return (
                  <option key={j} value={i.title}>
                    {i.title}
                  </option>
                );
              })}
          </select>
          <div className="error">
            {formik.touched.catagory && formik.errors.catagory}
          </div>

          <select
            name="tags"
            onChange={formik.handleChange("tags")}
            onBlur={formik.handleBlur("tags")}
            value={formik.values.tags}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="" disabled>
              Select Tags
            </option>
            <option value="featured">Featured</option>
            <option value="popular">Popular</option>
            <option value="special">Special</option>
          </select>
          <div className="error">
            {formik.touched.tags && formik.errors.tags}
          </div>

          <Select
            mode="multiple"
            allowClear
            className="w-100"
            placeholder="Select colors"
            defaultValue={color}
            onChange={(selectedValues) => handleColors(selectedValues)}
            options={coloropt}
          />
          <div className="error">
            {formik.touched.color && formik.errors.color}
          </div>

          <CustomInput
            type="number"
            label="Enter Product Quantity"
            name="quantity"
            onChange={formik.handleChange("quantity")}
            onBlur={formik.handleBlur("quantity")}
            value={formik.values.quantity}
          />
          <div className="error">
            {formik.touched.quantity && formik.errors.quantity}
          </div>
          <CustomInput
            type="number"
            label="Enter Product Reedim"
            name="reedim"
            onChange={formik.handleChange("reedim")}
            onBlur={formik.handleBlur("reedim")}
            value={formik.values.reedim}
          />
          <div className="error">
            {formik.touched.reedim && formik.errors.reedim}
          </div>

          <div className="bg-white border-1 p-5 text-center">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <h5 className="fw-9 fs-6">
                      Drag 'n' drop some files here, or click to select files
                    </h5>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="showimages d-flex flex-wrap gap-3">
            {imgState &&
              imgState?.map((i, j) => {
                return (
                  <div className=" position-relative" key={j}>
                    <button
                      type="button"
                      onClick={() => dispatch(delImg(i.public_id))}
                      className="btn-close position-absolute"
                      style={{ top: "10px", right: "10px" }}
                    ></button>
                    <img src={i.url} alt="" width={200} height={200} />
                  </div>
                );
              })}
          </div>

          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getProductId !== undefined ? "Edit" : "Add"} Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
