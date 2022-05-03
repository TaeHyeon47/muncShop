import { createSlice } from "@reduxjs/toolkit";

const orderCreateSlice = createSlice({
  name: "orderCreate",
  initialState: {},
  reducers: {
    // 주문 생성 요청
    ORDER_CREATE_REQUEST(state, action) {
      state.loading = true; // 주문 생성 요청동안 로딩바가 나타남
    },
    // 주문 생성 성공
    ORDER_CREATE_SUCCESS(state, action) {
      state.loading = false; // 주문 생성 성공 시, 로딩바가 사라짐
      state.success = true; // 주문 상태 값 = 성공
      state.order = action.payload.data; // 주문 리스트 생성
    },
    // 주문 생성 실패
    ORDER_CREATE_FAIL(state, action) {
      state.loading = false; // 주문 실패 시, 로딩바가 사라짐
      state.error = action.payload; // 오류 값 생성
    },
  },
});

export const orderCreateAction = orderCreateSlice.actions;

export default orderCreateSlice;
