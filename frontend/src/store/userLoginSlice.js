import { createSlice } from "@reduxjs/toolkit";

const userLoginSlice = createSlice({
  name: "userlogin",
  initialState: {},
  reducers: {
    USER_LOGIN_REQUEST(state) {
      state.loading = true;
    },
    USER_LOGIN_SUCCESS(state, action) {
      state.loading = false;
      state.userInfo = action.payload.userInfo;
    },
    USER_LOGIN_FAIL(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
    USER_LOGOUT() {
      return {};
    },
  },
});

export const userLoginAction = userLoginSlice.actions;

export default userLoginSlice;
