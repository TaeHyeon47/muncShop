import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    // 주문 유저 정보
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", //User 스키마(데이터모델) 참고
    },
    // 주문서 상품
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
    // 배송주소
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    // 결제방법
    paymentMethod: {
      type: String,
      required: true,
      default: false,
    },
    // 결제결과
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    // 세금
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    // 배송비
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    // 상품가격
    itemsPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    // 최종가격
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    // 결제여부
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    // 결제시간
    paidAt: {
      type: Date,
    },
    // 배송여부
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    // 배송시간
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
