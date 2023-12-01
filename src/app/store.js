import { configureStore } from "@reduxjs/toolkit";
import authReduducer from "../features/auth/authSlice";
import customerReducer from "../features/customers/customerSlice";
import productReducer from "../features/products/productsSlice";
import brandReducer from "../features/brands/brandSlice";
import colorReducer from "../features/colors/colorSlice";
import productcatagoryReducer from "../features/productcatagory/productcatagorySlice";
import blogReducer from "../features/blogs/blogSlice";
import couponReducer from "../features/coupon/couponSlice";
import blogcatagoryReducer from "../features/blogcatagory/blogcatagorySlice";
import enquaryReducer from "../features/enquary/enquarySlice";
import uploadReducer from "../features/upload/uploadSlice";
export const store = configureStore({
  reducer: {
    auth: authReduducer,
    customer: customerReducer,
    product: productReducer,
    brand: brandReducer,
    color: colorReducer,
    productcatagory: productcatagoryReducer,
    blog: blogReducer,
    blogcatagory: blogcatagoryReducer,
    coupon: couponReducer,
    enquary: enquaryReducer,
    upload: uploadReducer,
  },
});
