import axios from "axios";
import { userLoginAction } from "../store/userLoginSlice";
import { userRegisterAction } from "../store/userRegisterSlice";
import { userDetailsAction } from "../store/userDetailsSlice";
import { userUpdateAction } from "../store/userUpdateSlice";
import { orderListMyAction } from "../store/orderListMySlice";
import { userListAction } from "../store/userListSlice";
import { userDeleteAction } from "../store/userDeleteSlice";
import { userUpdateAdminAction } from "../store/userUpdateAdminSlice";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(userLoginAction.USER_LOGIN_REQUEST());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );

    dispatch(
      userLoginAction.USER_LOGIN_SUCCESS({
        userInfo: data,
      })
    );

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch(
      userLoginAction.USER_LOGIN_FAIL({
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    );
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch(userLoginAction.USER_LOGOUT());
  dispatch(userDetailsAction.USER_DETAILS_RESET());
  dispatch(orderListMyAction.ORDER_LIST_MY_RESET());
  dispatch(userListAction.USER_LIST_RESET());
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch(userRegisterAction.USER_REGISTER_REQUEST());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users",
      { name, email, password },
      config
    );

    dispatch(
      userRegisterAction.USER_REGISTER_SUCCESS({
        userInfo: data,
      })
    );

    dispatch(
      userLoginAction.USER_LOGIN_SUCCESS({
        userInfo: data,
      })
    );

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch(
      userRegisterAction.USER_REGISTER_FAIL({
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    );
  }
};

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch(userDetailsAction.USER_DETAILS_REQUEST());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/${id}`, config);

    dispatch(
      userDetailsAction.USER_DETAILS_SUCCESS({
        user: data,
      })
    );
  } catch (error) {
    dispatch(
      userDetailsAction.USER_DETAILS_FAIL({
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    );
  }
};

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch(userUpdateAction.USER_UPDATE_REQUEST());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/users/profile`, user, config);

    dispatch(
      userUpdateAction.USER_UPDATE_SUCCESS({
        user: data,
      })
    );
  } catch (error) {
    dispatch(
      userUpdateAction.USER_UPDATE_FAIL({
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    );
  }
};

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch(userListAction.USER_LIST_REQUEST());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users`, config);

    dispatch(userListAction.USER_LIST_SUCCESS({ users: data }));
  } catch (error) {
    dispatch(
      userListAction.USER_LIST_FAIL({
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    );
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch(userDeleteAction.USER_DELETE_REQUEST());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/users/${id}`, config);

    dispatch(userDeleteAction.USER_DELETE_SUCCESS({ users: data }));
  } catch (error) {
    dispatch(
      userDeleteAction.USER_DELETE_FAIL({
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    );
  }
};

export const updateAdminUser = (user) => async (dispatch, getState) => {
  try {
    dispatch(userUpdateAdminAction.USER_UPDATE_ADMIN_REQUEST());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/users/${user._id}`, user, config);

    dispatch(userUpdateAdminAction.USER_UPDATE_ADMIN_SUCCESS());

    dispatch(
      userUpdateAdminAction.USER_UPDATE_ADMIN_SUCCESS({ payload: data })
    );
  } catch (error) {
    dispatch(
      userUpdateAdminAction.USER_UPDATE_ADMIN_FAIL({
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    );
  }
};
