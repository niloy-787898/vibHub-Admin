import { React, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { createNewblogCat, resetState } from "../features/blogcatagory/blogcatagorySlice";

let schema = yup.object().shape({
  title: yup.string().required("Category Name is Required"),
});

const AddBlogCatagory = () => {
  const dispatch = useDispatch();
  const newBlogCategory = useSelector((state) => state.blogcatagory);

  const {
    isSuccess,
    isError,
    isLoading,
    createBlogCatagory,
    blogCatName,
  } = newBlogCategory;

  useEffect(() => {
    if (isSuccess && createBlogCatagory) {
      toast.success("Blog Category Added Successfullly!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError, isLoading]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogCatName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createNewblogCat(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
      }, 300);
    },
  });
  return (
    <>
      <div>
        <h3 className="mb-4  title">Add Blog Category</h3>
        <div className="py-3">
          <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="title"
            onChange={formik.handleChange("title")}
            onBlur={formik.handleBlur("title")}
            value={formik.values.title}
            label="Enter Blog Category"
            id="blogcat"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
            <button
              className="btn btn-success border-0 rounded-3 my-3"
              type="submit"
            >
              Add Blog Category
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBlogCatagory;
