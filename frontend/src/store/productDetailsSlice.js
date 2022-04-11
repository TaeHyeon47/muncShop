import { createSlice } from "@reduxjs/toolkit";

const productDetailsSlice = createSlice({
  name: "productdetails",
  initialState: { product: { reviews: [] } },
  reducers: {
    PRODUCT_DETAILS_REQUEST(state) {
      state.loading = true;
      state = { ...state };
    },
    PRODUCT_DETAILS_SUCCESS(state, action) {
      state.loading = false;
      state.product = action.payload.product;
    },
    PRODUCT_DETAILS_FAIL(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export const productDetailsAction = productDetailsSlice.actions;

export default productDetailsSlice;
