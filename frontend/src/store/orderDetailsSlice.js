import { createSlice } from "@reduxjs/toolkit";

const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState: { loading: true },
  reducers: {
    ORDER_DETAILS_REQUEST(state) {
      state = { ...state }; //Spread Operator로 기존 데이터를 가져옴
      state.loading = true;
    },
    ORDER_DETAILS_SUCCESS(state, action) {
      state.loading = false;
      state.order = action.payload.data; //
    },

    ORDER_DETAILS_FAIL(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const orderDetailsSliceAction = orderDetailsSlice.actions;

export default orderDetailsSlice;
