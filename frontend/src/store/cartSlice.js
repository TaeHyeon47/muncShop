import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { cartItems: [], shippingAddress: {} },
  reducers: {
    CART_ADD_ITEM(state, action) {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.product === existItem.product ? item : x
        );
      } else {
        state.cartItems.push(item);
      }
    },
    CART_REMOVE_ITEM(state, action) {
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (x) => x.product !== action.payload.id
        ),
      };
    },

    CART_SAVE_SHIPPING_ADDRESS(state, action) {
      state.shippingAddress = action.payload.data;
    },
    CART_SAVE_PAYMENT_METHOD(state, action) {
      state.paymentMethod = action.payload.paymentMethod;
    },
    CART_SAVE_TOTAL_PRICE(state, action) {
      state.itemsPrice = state.cartItems.reduce(
        (acc, cur) => acc + cur.price * cur.qty,
        0
      );
      state.shippingPrice = state.itemsPrice > 15000 ? 0 : 3000;
      state.taxPrice = Number(0.15 * state.itemsPrice);
      state.totalPrice =
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice);
    },
  },
});

export const cartAction = cartSlice.actions;

export default cartSlice;
