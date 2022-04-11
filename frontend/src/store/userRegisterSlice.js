import { createSlice } from "@reduxjs/toolkit";

const userRegisterSlice = createSlice({
  name: "userRegister",
  initialState: {},
  reducers: {
    USER_REGISTER_REQUEST(state) {
      state.loading = true;
    },
    USER_REGISTER_SUCCESS(state, action) {
      state.loading = false;
      state.userInfo = action.payload.userInfo;
    },
    USER_REGISTER_FAIL(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export const userRegisterAction = userRegisterSlice.actions;

export default userRegisterSlice;
