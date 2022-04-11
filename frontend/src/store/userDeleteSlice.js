import { createSlice } from "@reduxjs/toolkit";

const userDeleteSlice = createSlice({
  name: "userDelete",
  initialState: {},
  reducers: {
    USER_DELETE_REQUEST(state) {
      state.loading = true;
    },
    USER_DELETE_SUCCESS(state, action) {
      state.loading = false;
      state.success = true;
    },
    USER_DELETE_FAIL(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export const userDeleteAction = userDeleteSlice.actions;

export default userDeleteSlice;
