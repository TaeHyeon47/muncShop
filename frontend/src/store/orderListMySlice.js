import { createSlice } from "@reduxjs/toolkit";

const orderListMySlice = createSlice({
  name: "orderListMy",
  initialState: { orders: [] },
  reducers: {
    ORDER_LIST_MY_REQUEST(state) {
      state.loading = true;
    },
    ORDER_LIST_MY_SUCCESS(state, action) {
      state.loading = false;
      state.orders = action.payload.data;
    },
    ORDER_LIST_MY_FAIL(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    ORDER_LIST_MY_RESET(state, action) {
      state.orders = [];
    },
  },
});

export const orderListMyAction = orderListMySlice.actions;

export default orderListMySlice;
