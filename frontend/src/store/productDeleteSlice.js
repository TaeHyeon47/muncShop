import { createSlice } from "@reduxjs/toolkit";

const productDeleteSlice = createSlice({
  name: "productdelete",
  initialState: {},
  reducers: {
    PRODUCT_DELETE_REQUEST(state) {
      state.loading = true;
    },
    PRODUCT_DELETE_SUCCESS(state, action) {
      state.loading = false;
      state.success = true;
    },
    PRODUCT_DELETE_FAIL(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export const productDeleteAction = productDeleteSlice.actions;

export default productDeleteSlice;
