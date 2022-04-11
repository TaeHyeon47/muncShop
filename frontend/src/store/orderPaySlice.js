import { createSlice } from "@reduxjs/toolkit";

const orderPaySlice = createSlice({
  name: "orderPay",
  initialState: {},
  reducers: {
    ORDER_PAY_REQUEST(state) {
      state.loading = true;
    },
    ORDER_PAY_SUCCESS(state) {
      state.loading = false;
      state.success = true;
    },
    ORDER_PAY_FAIL(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    ORDER_PAY_RESET() {
      return {};
    },
  },
});

export const orderPaySliceAction = orderPaySlice.actions;

export default orderPaySlice;
