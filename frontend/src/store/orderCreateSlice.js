import { createSlice } from "@reduxjs/toolkit";

const orderCreateSlice = createSlice({
  name: "orderCreate",
  initialState: {},
  reducers: {
    // 주문 생성 요청
    ORDER_CREATE_REQUEST(state, action) {
      state.loading = true;
    },
    // 주문 생성 성공
    ORDER_CREATE_SUCCESS(state, action) {
      state.loading = false;
      state.success = true;
      state.order = action.payload.data;
    },
    // 주문 생성 실패
    ORDER_CREATE_FAIL(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const orderCreateAction = orderCreateSlice.actions;

export default orderCreateSlice;
