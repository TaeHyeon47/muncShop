import { createSlice } from "@reduxjs/toolkit";

const productUpdateSlice = createSlice({
  name: "productUpdate",
  initialState: {},
  reducers: {
    // 상품 업데이트 요청
    PRODUCT_UPDATE_REQUEST(state) {
      state.loading = true;
    },
    PRODUCT_UPDATE_SUCCESS(state, action) {
      // 상품 업데이트 성공
      state.loading = false;
      state.success = true;
      state.product = action.payload.data;
    },
    PRODUCT_UPDATE_FAIL(state, action) {
      // 상품 업데이트 실패
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
