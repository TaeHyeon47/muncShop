import { createSlice } from "@reduxjs/toolkit";

const productListSlice = createSlice({
  name: "productlist",
  initialState: { loading: true, products: [] },
  reducers: {
    // 상품 리스트 정보 가져오기 전 로딩
    PRODUCT_LIST_REQUEST(state) {
      state.loading = true;
    },
    // 상품 리스트 정보 가져오기 성공, 페이지 수 정보 가져오기 성공
    PRODUCT_LIST_SUCCESS(state, action) {
      state.loading = false;
      state.products = action.payload.data.products;
      state.pages = action.payload.data.pages;
      state.page = action.payload.data.page;
    },
    // 상품 리스트 정보 가져오기 실패
    PRODUCT_LIST_FAIL(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export const productListAction = productListSlice.actions;

export default productListSlice;
