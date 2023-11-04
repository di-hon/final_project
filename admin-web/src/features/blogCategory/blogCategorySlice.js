import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import blogCategoryService from "../blogCategory/blogCategoryService";

export const getBlogCategories = createAsyncThunk(
  "blog-category/get-blog-categories",
  async (thunkAPI) => {
    try {
      return await blogCategoryService.getBlogCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createBlogCategories = createAsyncThunk(
  "blog-category/create-blog-category",
  async (blogCategoryData, thunkAPI) => {
    try {
      return await blogCategoryService.createBlogCategory(blogCategoryData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  blogCategories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const blogCategorySlice = createSlice({
  name: "blogCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBlogCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.blogCategories = action.payload;
      })
      .addCase(getBlogCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createBlogCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlogCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdBlogCategory = action.payload;
      })
      .addCase(createBlogCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default blogCategorySlice.reducer;
