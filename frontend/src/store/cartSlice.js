import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { cartItems: [], shippingAddress: {} },
  reducers: {
    CART_ADD_ITEM(state, action) {
      const item = action.payload;
      // 카트에 추가된 상품이 이미 카트에 존재하는지 판단
      const existItem = state.cartItems.find((x) => x.product === item.product);

      // 카트에 존재하는 아이템이면 수량을 추가, 아니면 신규 상품을 카트에 추가
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.product === existItem.product ? item : x
        );
      } else {
        state.cartItems.push(item);
      }
    },

    // Id 값으로 특정 상품만 장바구니에서 삭제
    CART_REMOVE_ITEM(state, action) {
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (x) => x.product !== action.payload.id
        ),
      };
    },
    // 장바구니 주문 프로세스에서 주소 값을 저장
    CART_SAVE_SHIPPING_ADDRESS(state, action) {
      state.shippingAddress = action.payload.data;
    },
    // 장바구니 주문 프로세스에서 결제 방법을 저장
    CART_SAVE_PAYMENT_METHOD(state, action) {
      state.paymentMethod = action.payload.paymentMethod;
    },
    // 총금액 15000이하 배송비 부과, 세금 계산, 총지불금액을 계산
    CART_SAVE_TOTAL_PRICE(state, action) {
      state.itemsPrice = state.cartItems.reduce(
        (acc, cur) => acc + cur.price * cur.qty,
        0
      );
      state.shippingPrice = state.itemsPrice > 15000 ? 0 : 3000;
      state.taxPrice = Number(0.1 * state.itemsPrice);
      state.totalPrice =
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice);
    },
  },
});

export const cartAction = cartSlice.actions;

export default cartSlice;
