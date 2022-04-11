import { configureStore } from "@reduxjs/toolkit";
import productListSlice from "./productListSlice";
import productDetailsSlice from "./productDetailsSlice";
import cartSlice from "./cartSlice";
import userLoginSlice from "./userLoginSlice";
import userRegisterSlice from "./userRegisterSlice";
import userDetailsSlice from "./userDetailsSlice";
import userUpdateSlice from "./userUpdateSlice";
import orderCreateSlice from "./orderCreateSlice";
import orderDetailsSlice from "./orderDetailsSlice";
import orderPaySlice from "./orderPaySlice";
import orderListMySlice from "./orderListMySlice";
import userListSlice from "./userListSlice";
import userDeleteSlice from "./userDeleteSlice";
import userUpdateAdminSlice from "./userUpdateAdminSlice";
import productDeleteSlice from "./productDeleteSlice";
import productCreateSlice from "./productCreateSlice";
import productUpdateSlice from "./productUpdateSlice";
import orderListSlice from "./orderListSlice";
import orderDeliverSlice from "./orderDeliverSlice";
import productReviewCreateSlice from "./productReviewCreateSlice";

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const preloadedState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const store = configureStore({
  preloadedState,
  reducer: {
    productList: productListSlice.reducer,
    productDetails: productDetailsSlice.reducer,
    productDelete: productDeleteSlice.reducer,
    productCreate: productCreateSlice.reducer,
    productUpdate: productUpdateSlice.reducer,
    productReviewCreate: productReviewCreateSlice.reducer,
    cart: cartSlice.reducer,
    userLogin: userLoginSlice.reducer,
    userRegister: userRegisterSlice.reducer,
    userDetails: userDetailsSlice.reducer,
    userUpdate: userUpdateSlice.reducer,
    userList: userListSlice.reducer,
    userDelete: userDeleteSlice.reducer,
    userUpdateAdmin: userUpdateAdminSlice.reducer,
    orderCreate: orderCreateSlice.reducer,
    orderDetails: orderDetailsSlice.reducer,
    orderPay: orderPaySlice.reducer,
    orderListMy: orderListMySlice.reducer,
    orderList: orderListSlice.reducer,
    orderDeliver: orderDeliverSlice.reducer,
  },
});

export default store;
