import { createSlice } from "@reduxjs/toolkit";

const userUpdateSlice = createSlice({
  name: "userUpdate",
  initialState: {},
  reducers: {
    USER_UPDATE_REQUEST(state) {
      state.loading = true;
    },
    USER_UPDATE_SUCCESS(state, action) {
      state.loading = false;
      state.success = true;
      state.userInfo = action.payload.userInfo;
    },
    USER_UPDATE_FAIL(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export const userUpdateAction = userUpdateSlice.actions;

export default userUpdateSlice;
