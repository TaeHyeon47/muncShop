import { createSlice } from "@reduxjs/toolkit";

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState: { user: {} },
  reducers: {
    USER_DETAILS_REQUEST(state) {
      state = { ...state };
      state.loading = true;
    },
    USER_DETAILS_SUCCESS(state, action) {
      state.loading = false;
      state.user = action.payload.user;
    },
    USER_DETAILS_FAIL(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
    USER_DETAILS_RESET(state) {
      state.user = {};
    },
  },
});

export const userDetailsAction = userDetailsSlice.actions;

export default userDetailsSlice;
