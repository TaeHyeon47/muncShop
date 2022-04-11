import { createSlice } from "@reduxjs/toolkit";

const userUpdateAdminSlice = createSlice({
  name: "userUpdateAdmin",
  initialState: { user: {} },
  reducers: {
    USER_UPDATE_ADMIN_REQUEST(state) {
      state.loading = true;
    },
    USER_UPDATE_ADMIN_SUCCESS(state, action) {
      state.loading = false;
      state.success = true;
    },
    USER_UPDATE_ADMIN_FAIL(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
    USER_UPDATE_ADMIN_RESET() {
      return { user: {} };
    },
  },
});

export const userUpdateAdminAction = userUpdateAdminSlice.actions;

export default userUpdateAdminSlice;
