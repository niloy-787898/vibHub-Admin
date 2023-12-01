import { React, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { createProductCategory,getAProductCategory,updateAProductCategory, resetState } from "../features/productcatagory/productcatagorySlice";

let schema = yup.object().shape({
  title: yup.string().required("Category Name is Required"),
});

const AddCatagory = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const getPCatId = location.pathname.split("/")[3];
  const navigate = useNavigate();
  const newCategory = useSelector((state) => state.productcatagory.productCatagories);
  console.log(newCategory)
  const {
    isSuccess,
    isError,
    isLoading,
    createdProductCategory,
    updatedProductCategory,
    categoryName,
  } = newCategory;

  useEffect(() => {
    if (getPCatId !== undefined) {
      dispatch(getAProductCategory(getPCatId));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getPCatId]);

  useEffect(() => {
    if (isSuccess && createdProductCategory) {
      toast.success("Category Added Successfully!");
    }
    if (isSuccess && updatedProductCategory) {
      toast.success("Category Updated Successfully!");
      navigate("/admin/category-list");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdProductCategory, navigate, updatedProductCategory]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: categoryName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getPCatId !== undefined) {
        const data = { id: getPCatId, categoryData: values };
        dispatch(updateAProductCategory(data));
        dispatch(resetState());
      } else {
        dispatch(createProductCategory(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });

  return (
    <>
      <div>
      <h3 className="mb-4  title">
        {getPCatId !== undefined ? "Edit" : "Add"} Category
      </h3>
        <div className="py-3">
          <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Product Category"
            onChange={formik.handleChange("title")}
            onBlur={formik.handleBlur("title")}
            value={formik.values.title}
            id="pcatagory"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
            <button
              className="btn btn-success border-0 rounded-3 my-3"
              type="submit"
            >
              {getPCatId !== undefined ? "Edit" : "Add"} Category
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCatagory;
