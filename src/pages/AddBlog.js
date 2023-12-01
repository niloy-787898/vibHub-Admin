import { React, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import { getBlogCatagories } from "../features/blogcatagory/blogcatagorySlice";
import { createBlogs, resetState } from "../features/blogs/blogSlice";

let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  catagory: yup.string().required("Category is Required"),
});

const AddBlog = () => {
  const dispatch = useDispatch();

  const blogState = useSelector((state) => state.blog);
  const imgState = useSelector((state) => state.upload.images);
  const bCatState = useSelector((state) => state.blogcatagory.blogCatagories);

  const {
    isSuccess,
    isError,
    isLoading,
    createdBlog,
    blogName,
    blogDesc,
    blogCategory,
    blogImages,
  } = blogState;

  useEffect(() => {
    dispatch(getBlogCatagories());
    dispatch(resetState());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isSuccess && createdBlog) {
      toast.success("Blog Added Successfullly!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError, isLoading]);

  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });
  console.log(img);
  useEffect(() => {
    formik.values.images = img;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blogImages]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogName || "",
      description: blogDesc || "",
      catagory: blogCategory || "",
      images: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createBlogs(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
    },
  });
  return (
    <>
      <div>
        <h3 className="mb-4 title">Add Blog</h3>

        <div className="">
          <form action="" onSubmit={formik.handleSubmit}>
            <div className="mt-4">
              <CustomInput
                type="text"
                label="Enter Blog Title"
                name="title"
                onChange={formik.handleChange("title")}
                onBlur={formik.handleBlur("title")}
                value={formik.values.title}
              />
            </div>
            <div className="error">
              {formik.touched.title && formik.errors.title}
            </div>
            <select
              name="catagory"
              onChange={formik.handleChange("catagory")}
              onBlur={formik.handleBlur("catagory")}
              value={formik.values.catagory}
              className="form-control py-3  mt-3"
              id=""
            >
              <option value="">Select Blog Category</option>
              {bCatState.map((i, j) => {
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

            <ReactQuill
              theme="snow"
              className="mt-3"
              name="description"
              onChange={formik.handleChange("description")}
              value={formik.values.description}
            />
            <div className="error">
              {formik.touched.description && formik.errors.description}
            </div>

            <div className="bg-white border-1 p-5 text-center mt-3">
              <Dropzone
                onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
              >
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <p>
                        Drag 'n' drop some files here, or click to select files
                      </p>
                    </div>
                  </section>
                )}
              </Dropzone>
            </div>
            <div className="showimages d-flex flex-wrap mt-3 gap-3">
              {imgState?.map((i, j) => {
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
              Add Blog
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBlog;
