import React, { useState, useEffect } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../actions/orderActions";
import { orderPaySliceAction } from "../store/orderPaySlice";
import { orderDeliverAction } from "../store/orderDeliverSlice";
import FormContainer from "../components/FormContainer";

// 주문화면
const OrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const orderId = id;
  // sdkReady State가 true이면 페이팔 결제 버튼이 나타나고, false이면 나타나지 않음
  const [sdkReady, setSdkReady] = useState(false);

  // 주문 정보를 가져옴
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  // 경제 정보를 가져옴
  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay; // successPay가 true이면 결제 성공, false이면 결제대기 상태

  // 배송 정보를 가져옴
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver; // successDeliver가 true이면 배송완료, false이면 배송대기 상태

  // 유저 로그인 정보를 가져옴
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin; // userInfo가 true이면 로그인, false이면 로그아웃 상태

  useEffect(() => {
    // 로그인 정보(userInfo)가 없다면, 로그인 화면('/login')으로 이동
    if (!userInfo) {
      navigate("/login");
    }

    // window 돔에 페이팔 정보가 없는 경우에만 실행되는 함수
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    // 주문정보가 없거나 결제가 성공되었거나 배송이 성공된 경우 실행
    if (!order || successPay || successDeliver) {
      dispatch(orderPaySliceAction.ORDER_PAY_RESET()); // 기존 결제 정보와 충돌되지 않도록 RESET
      dispatch(orderDeliverAction.ORDER_DELIVER_RESET()); // 기존 배송 정보와 충돌되지 않도록 RESET
      dispatch(getOrderDetails(orderId));
      // 결제정보가 없는 경우 실행
    } else if (!order.isPaid) {
      // window 돔에 paypal 스크립트가 없다면, addPayPalScript 함수를 실행하여 추가후 setSdkReady() 실행
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [
    dispatch,
    orderId,
    successPay,
    order,
    successDeliver,
    navigate,
    userInfo,
  ]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <FormContainer>
      <>
        <h1>주문번호 {order._id}</h1>
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>배송정보</h2>
                <p>
                  <strong>이름 : </strong> {order.user.name}
                </p>
                <p>
                  <strong>이메일 : </strong>
                  <a
                    style={{ textDecoration: "none" }}
                    href={`mailto:${order.user.email}`}
                  >
                    {order.user.email}
                  </a>
                </p>
                <p>
                  <strong>주소 : </strong>
                  {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                  {order.shippingAddress.postalCode},{" "}
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <Message variant="success">
                    배달일시 {order.deliveredAt}
                  </Message>
                ) : (
                  <Message variant="warning">배송 준비중</Message>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>결제 수단</h2>
                <p>{order.paymentMethod}</p>
                {order.isPaid ? (
                  <Message variant="success">결제일시 {order.paidAt}</Message>
                ) : (
                  <Message variant="warning">결제대기</Message>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>주문상품</h2>
                {order.orderItems.length === 0 ? (
                  <Message>주문상품이 없습니다.</Message>
                ) : (
                  <ListGroup variant="flush">
                    {order.orderItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col>
                            <Link
                              style={{ textDecoration: "none" }}
                              to={`/product/${item.product}`}
                            >
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} x {item.price}원 ={item.qty * item.price}
                            원
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>주문 요약</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>주문 상품</Col>
                    <Col>{order.itemsPrice.toLocaleString("ko-KR")}원</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>배송비</Col>
                    <Col>{order.shippingPrice.toLocaleString("ko-KR")}원</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>부가세</Col>
                    <Col>{order.taxPrice.toLocaleString("ko-KR")}원</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>총 결제 금액</Col>
                    <Col>{order.totalPrice.toLocaleString("ko-KR")}원</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  {error && <Message variant="danger">{error}</Message>}
                </ListGroup.Item>
                {!order.isPaid && (
                  <ListGroup.Item>
                    {loadingPay && <Loader />}
                    {!sdkReady ? (
                      <Loader />
                    ) : (
                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      />
                    )}
                  </ListGroup.Item>
                )}
                {loadingDeliver && <Loader />}
                {userInfo &&
                  userInfo.isAdmin &&
                  order.isPaid &&
                  !order.isDelivered && (
                    <ListGroup.Item>
                      <Button
                        type="button"
                        className="btn btn-block"
                        onClick={deliverHandler}
                      >
                        배송완료로 변경
                      </Button>
                    </ListGroup.Item>
                  )}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </>
    </FormContainer>
  );
};

export default OrderScreen;
