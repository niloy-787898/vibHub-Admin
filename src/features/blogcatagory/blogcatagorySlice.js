import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import blogcatagoryService from "./blogcatagoryService";

export const getBlogCatagories = createAsyncThunk(
  "blog-catagory/get-blog-catagories",
  async (thunkAPI) => {
    try {
      return await blogcatagoryService.getBlogCatagories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createNewblogCat = createAsyncThunk(
  "blog-catagory/create-blog-catagory",
  async (catData, thunkAPI) => {
    try {
      return await blogcatagoryService.createBlogCategory(catData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  blogCatagories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const blogcatagorySlice = createSlice({
  name: "blogCatagories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBlogCatagories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogCatagories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.blogCatagories = action.payload;
      })
      .addCase(getBlogCatagories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createNewblogCat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewblogCat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createBlogCatagory = action.payload;
      })
      .addCase(createNewblogCat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});
export default blogcatagorySlice.reducer;
