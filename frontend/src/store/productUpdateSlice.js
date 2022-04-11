import { createSlice } from "@reduxjs/toolkit";

const productUpdateSlice = createSlice({
  name: "productUpdate",
  initialState: {},
  reducers: {
    PRODUCT_UPDATE_REQUEST(state) {
      state.loading = true;
    },
    PRODUCT_UPDATE_SUCCESS(state, action) {
      state.loading = false;
      state.success = true;
      state.product = action.payload.data;
    },
    PRODUCT_UPDATE_FAIL(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
    PRODUCT_UPDATE_RESET() {
      return { product: {} };
    },
  },
});

export const productUpdateAction = productUpdateSlice.actions;

export default productUpdateSlice;
