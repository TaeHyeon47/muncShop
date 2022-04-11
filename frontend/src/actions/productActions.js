import axios from "axios";
import { productListAction } from "../store/productListSlice";
import { productDetailsAction } from "../store/productDetailsSlice";
import { productDeleteAction } from "../store/productDeleteSlice";
import { productCreateAction } from "../store/productCreateSlice";
import { productUpdateAction } from "../store/productUpdateSlice";
import { productReviewCreateAction } from "../store/productReviewCreateSlice";

export const listProducts =
  (keyword = "", pageNumber = "") =>
  async (dispatch) => {
    try {
      dispatch(productListAction.PRODUCT_LIST_REQUEST());
      const { data } = await axios.get(
        `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
      );

      dispatch(
        productListAction.PRODUCT_LIST_SUCCESS({
          data: data,
        })
      );
    } catch (error) {
      dispatch(
        productListAction.PRODUCT_LIST_FAIL({
          error:
            error && error.response.data.message
              ? error.response.data.message
              : error.message,
        })
      );
    }
  };

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch(productDetailsAction.PRODUCT_DETAILS_REQUEST());
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch(
      productDetailsAction.PRODUCT_DETAILS_SUCCESS({
        product: data,
      })
    );
  } catch (error) {
    dispatch(
      productDetailsAction.PRODUCT_DETAILS_FAIL({
        error:
          error && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    );
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch(productDeleteAction.PRODUCT_DELETE_REQUEST);

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/products/${id}`, config);

    dispatch(productDeleteAction.PRODUCT_DELETE_SUCCESS());
  } catch (error) {
    dispatch(
      productDeleteAction.PRODUCT_DELETE_FAIL({
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    );
  }
};

export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch(productCreateAction.PRODUCT_CREATE_REQUEST());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/products`, {}, config);

    dispatch(productCreateAction.PRODUCT_CREATE_SUCCESS({ data }));
  } catch (error) {
    dispatch(
      productCreateAction.PRODUCT_CREATE_FAIL({
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    );
  }
};

export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch(productUpdateAction.PRODUCT_UPDATE_REQUEST());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      "Content-Type": "application/json",
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/products/${product._id}`,
      product,
      config
    );

    dispatch(productUpdateAction.PRODUCT_UPDATE_SUCCESS(data));
  } catch (error) {
    dispatch(
      productUpdateAction.PRODUCT_UPDATE_FAIL({
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    );
  }
};

export const createProductReview =
  (productId, review) => async (dispatch, getState) => {
    try {
      dispatch(productReviewCreateAction.PRODUCT_CREATE_REVIEW_RESET());

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        "Content-Type": "application/json",
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(`/api/products/${productId}/reviews`, review, config);

      dispatch(productReviewCreateAction.PRODUCT_CREATE_REVIEW_SUCCESS());
    } catch (error) {
      dispatch(
        productReviewCreateAction.PRODUCT_CREATE_REVIEW_FAIL({
          error:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        })
      );
    }
  };
