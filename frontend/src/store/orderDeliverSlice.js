import { createSlice } from "@reduxjs/toolkit";

const orderDeliverSlice = createSlice({
  name: "orderDeliver",
  initialState: {},
  reducers: {
    ORDER_DELIVER_REQUEST(state) {
      state.loading = true;
    },
    ORDER_DELIVER_SUCCESS(state) {
      state.loading = false;
      state.success = true;
    },
    ORDER_DELIVER_FAIL(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    ORDER_DELIVER_RESET() {
      return {};
    },
  },
});

export const orderDeliverAction = orderDeliverSlice.actions;

export default orderDeliverSlice;
