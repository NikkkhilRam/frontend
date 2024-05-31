import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  blogs: [],
};

export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async (_, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/blogs");

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data.errors : error.message
      );
    }
  }
);

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const selectBlogs = (state) => state.blogs;
export default blogSlice.reducer;
