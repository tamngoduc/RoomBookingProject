import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reviewAPI from "../services/reviewAPI";

const initialState = {
  reviewsList: [],
  isReviewsListLoading: false,
  reviewsListError: null,
};

export const getReviewsList = createAsyncThunk(
  "review/getReviewsList",
  async (roomId) => {
    try {
      const data = await reviewAPI.getReviewsList(roomId);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getReviewsList.pending, (state) => {
      return { ...state, isReviewsListLoading: true, reviewsListError: null };
    });
    builder.addCase(getReviewsList.fulfilled, (state, { payload }) => {
      return { ...state, isReviewsListLoading: false, reviewsList: payload };
    });
    builder.addCase(getReviewsList.rejected, (state, { error }) => {
      return {
        ...state,
        isReviewsListLoading: false,
        reviewsListError: error.message,
      };
    });
  },
});

export default reviewSlice.reducer;
