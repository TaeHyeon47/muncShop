import { createSlice } from "@reduxjs/toolkit";

const orderDeliverSlice = createSlice({
  name: "orderDeliver",
  initialState: {},
  reducers: {
    // 배송 상태 요청
    ORDER_DELIVER_REQUEST(state) {
      state.loading = true; // 배송 요청동안 로딩바가 나타남
    },
    // 배송 상태 성공
    ORDER_DELIVER_SUCCESS(state) {
      state.loading = false; // 배송 성공 시, 로딩바가 사라짐
      state.success = true; // 배송 요청 성공
    },
    // 배송 상태 실패
    ORDER_DELIVER_FAIL(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    // 배송 상태 초기화
    ORDER_DELIVER_RESET() {
      return {}; // 초기화하지 않으면 배송 정보가 뒤섞이면서 오류가 발생
    },
  },
});

export const orderDeliverAction = orderDeliverSlice.actions;

export default orderDeliverSlice;
