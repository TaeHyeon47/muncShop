import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { cartItems: [], shippingAddress: {} },
  reducers: {
    // 카트에 아이템을 추가
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

    // 총합계 금액, 배송비, 세금 등으로 최종 결제금액 계산
    CART_SAVE_TOTAL_PRICE(state, action) {
      // 누적된 상품 + 상품 * 상품수량으로 총 상품금액 계산
      state.itemsPrice = state.cartItems.reduce(
        (acc, cur) => acc + cur.price * cur.qty,
        0
      );
      // 총합계 금액이 15000원 이하이면 배송비 3000원 부과, 15000원 이상이면 배송비 0원 부과
      state.shippingPrice = state.itemsPrice > 15000 ? 0 : 3000;

      // 총 구매금액의 10%를 세금으로 계산
      state.taxPrice = Number(0.1 * state.itemsPrice);

      // 총상품금액 + 배송비 + 세금 = 최종 결제 금액 계산
      state.totalPrice =
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice);
    },
  },
});

export const cartAction = cartSlice.actions;

export default cartSlice;
