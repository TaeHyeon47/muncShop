import { createSlice } from "@reduxjs/toolkit";

const orderListSlice = createSlice({
  name: "orderList",
  initialState: { orders: [] },
  reducers: {
    ORDER_LIST_REQUEST(state) {
      state.loading = true;
    },
    ORDER_LIST_SUCCESS(state, action) {
      state.loading = false;
      state.orders = action.payload.data;
    },
    ORDER_LIST_FAIL(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const orderListAction = orderListSlice.actions;

export default orderListSlice;
