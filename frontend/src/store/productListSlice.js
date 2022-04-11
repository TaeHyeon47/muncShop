import { createSlice } from "@reduxjs/toolkit";

const productListSlice = createSlice({
  name: "productlist",
  initialState: { loading: true, products: [] },
  reducers: {
    PRODUCT_LIST_REQUEST(state) {
      state.loading = true;
    },
    PRODUCT_LIST_SUCCESS(state, action) {
      state.loading = false;
      state.products = action.payload.data.products;
      state.pages = action.payload.data.pages;
      state.page = action.payload.data.page;
    },
    PRODUCT_LIST_FAIL(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export const productListAction = productListSlice.actions;

export default productListSlice;
