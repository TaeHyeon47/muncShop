import { createSlice } from "@reduxjs/toolkit";

const productCreateSlice = createSlice({
  name: "productCreate",
  initialState: {},
  reducers: {
    PRODUCT_CREATE_REQUEST(state) {
      state.loading = true;
    },
    PRODUCT_CREATE_SUCCESS(state, action) {
      state.loading = false;
      state.success = true;
      state.product = action.payload.data;
    },
    PRODUCT_CREATE_FAIL(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
    PRODUCT_CREATE_RESET() {
      return {};
    },
  },
});

export const productCreateAction = productCreateSlice.actions;

export default productCreateSlice;
