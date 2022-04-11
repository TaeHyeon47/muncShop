import axios from "axios";
import { orderCreateAction } from "../store/orderCreateSlice";
import { orderDetailsSliceAction } from "../store/orderDetailsSlice";
import { orderPaySliceAction } from "../store/orderPaySlice";
import { orderListMyAction } from "../store/orderListMySlice";
import { orderListAction } from "../store/orderListSlice";
import { orderDeliverAction } from "../store/orderDeliverSlice";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch(orderCreateAction.ORDER_CREATE_REQUEST());
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/orders`, order, config);

    dispatch(
      orderCreateAction.ORDER_CREATE_SUCCESS({
        data,
      })
    );
  } catch (error) {
    dispatch(
      orderCreateAction.ORDER_CREATE_FAIL({
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    );
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch(orderDetailsSliceAction.ORDER_DETAILS_REQUEST());
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${id}`, config);

    dispatch(
      orderDetailsSliceAction.ORDER_DETAILS_SUCCESS({
        data,
      })
    );
  } catch (error) {
    dispatch(
      orderDetailsSliceAction.ORDER_DETAILS_FAIL({
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    );
  }
};

export const payOrder =
  (orderId, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch(orderPaySliceAction.ORDER_PAY_REQUEST());

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/orders/${orderId}/pay`,
        paymentResult,
        config
      );

      dispatch(
        orderPaySliceAction.ORDER_PAY_SUCCESS({
          data,
        })
      );
    } catch (error) {
      dispatch(
        orderPaySliceAction.ORDER_PAY_FAIL({
          error:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        })
      );
    }
  };

export const deliverOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch(orderDeliverAction.ORDER_DELIVER_REQUEST());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/orders/${order._id}/deliver`,
      {},
      config
    );

    dispatch(
      orderDeliverAction.ORDER_DELIVER_SUCCESS({
        data,
      })
    );
  } catch (error) {
    dispatch(
      orderDeliverAction.ORDER_DELIVER_FAIL({
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    );
  }
};

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch(orderListMyAction.ORDER_LIST_MY_REQUEST());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/myorders`, config);

    dispatch(
      orderListMyAction.ORDER_LIST_MY_SUCCESS({
        data,
      })
    );
  } catch (error) {
    dispatch(
      orderListMyAction.ORDER_LIST_MY_FAIL({
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    );
  }
};

export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch(orderListAction.ORDER_LIST_REQUEST);

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders`, config);

    dispatch(
      orderListAction.ORDER_LIST_SUCCESS({
        data,
      })
    );
  } catch (error) {
    dispatch(
      orderListAction.ORDER_LIST_FAIL({
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    );
  }
};
