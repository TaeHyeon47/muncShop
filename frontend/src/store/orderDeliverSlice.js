import { createSlice } from "@reduxjs/toolkit";

const orderDeliverSlice = createSlice({
  name: "orderDeliver",
  initialState: {},
  reducers: {
    // 배송 상태 요청
    ORDER_DELIVER_REQUEST(state) {
      state.loading = true;
    },
    // 배송 상태 성공
    ORDER_DELIVER_SUCCESS(state) {
      state.loading = false;
      state.success = true;
    },
    // 배송 상태 실패
    ORDER_DELIVER_FAIL(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    // 주문 State 초기화
    ORDER_DELIVER_RESET() {
      return {};
    },
  },
});

export const orderDeliverAction = orderDeliverSlice.actions;

export default orderDeliverSlice;
