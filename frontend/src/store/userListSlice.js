import { createSlice } from "@reduxjs/toolkit";

const userListSlice = createSlice({
  name: "userList",
  initialState: { users: [] },
  reducers: {
    USER_LIST_REQUEST(state) {
      state.loading = true;
    },
    USER_LIST_SUCCESS(state, action) {
      state.loading = false;
      state.users = action.payload.users;
    },
    USER_LIST_FAIL(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
    USER_LIST_RESET() {
      return { users: [] };
    },
  },
});

export const userListAction = userListSlice.actions;

export default userListSlice;
