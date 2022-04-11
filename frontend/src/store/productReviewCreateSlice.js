import { createSlice } from "@reduxjs/toolkit";

const productReviewCreateSlice = createSlice({
  name: "productReviewCreate",
  initialState: {},
  reducers: {
    PRODUCT_CREATE_REVIEW_REQUEST(state) {
      state.loading = true;
    },
    PRODUCT_CREATE_REVIEW_SUCCESS(state, action) {
      state.loading = false;
      state.success = true;
    },
    PRODUCT_CREATE_REVIEW_FAIL(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
    PRODUCT_CREATE_REVIEW_RESET() {
      return {};
    },
  },
});

export const productReviewCreateAction = productReviewCreateSlice.actions;

export default productReviewCreateSlice;
