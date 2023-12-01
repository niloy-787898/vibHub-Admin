import { React, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  createBrand,
  getSingleBrand,
  resetState,
  updateSingleBrand,
} from "../features/brands/brandSlice";

let schema = yup.object().shape({
  title: yup.string().required("Brand Name is Required"),
});

const AddBrand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getBrandId = location.pathname.split("/")[3];
  const newBrand = useSelector((state) => state.brand.brands);

  const {
    isSuccess,
    isError,
    isLoading,
    createdBrand,
    updatedBrand,
    brandName,
  } = newBrand;

  useEffect(() => {
    if (getBrandId !== undefined) {
      dispatch(getSingleBrand(getBrandId));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getBrandId]);

  useEffect(() => {
    if (isSuccess && createdBrand) {
      toast.success("Brand Added Successfullly!");
    }
    if (isSuccess && updatedBrand) {
      toast.success("Brand Updated Successfullly!");
      navigate("/admin/brand-list");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdBrand, updatedBrand, navigate]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: brandName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getBrandId !== undefined) {
        const data = { id: getBrandId, brandData: values };
        dispatch(updateSingleBrand(data));
        dispatch(resetState());
      } else {
        dispatch(createBrand(values));
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
        <h3 className="mb-4 title">
          {getBrandId !== undefined ? "Edit" : "Add"} Brand
        </h3>
        <div className="py-3">
          <form action="" onSubmit={formik.handleSubmit}>
            <CustomInput
              type="text"
              name="title"
              onChange={formik.handleChange("title")}
              onBlur={formik.handleBlur("title")}
              value={formik.values.title}
              label="Enter Brand"
              id="brand"
            />
            <div className="error">
              {formik.touched.title && formik.errors.title}
            </div>

            <button
              className="btn btn-success border-0 rounded-3 my-3"
              type="submit"
            >
              {getBrandId !== undefined ? "Edit" : "Add"} Brand
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBrand;
