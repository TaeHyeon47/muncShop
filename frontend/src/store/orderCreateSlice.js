import { createSlice } from "@reduxjs/toolkit";

const orderCreateSlice = createSlice({
  name: "orderCreate",
  initialState: {},
  reducers: {
    ORDER_CREATE_REQUEST(state, action) {
      state.loading = true;
    },
    ORDER_CREATE_SUCCESS(state, action) {
      state.loading = false;
      state.success = true;
      state.order = action.payload.data;
    },
    ORDER_CREATE_FAIL(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const orderCreateAction = orderCreateSlice.actions;

export default orderCreateSlice;
