import React, { useEffect } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../actions/cartActions";

// 장바구니 화면
const CartScreen = () => {
  const { id } = useParams();
  const productId = id;

  const location = useLocation();
  // 쿼리문의 '='을 구분자로 카트에 담길 숫자를 가져옴
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // 쿼리문의 상품 Id와 수량 qty를 상품생성 action으로 전달
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  // 상품 Id 값을 제품 삭제 action으로 전달
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  // 주소 작성 화면으로 페이지 이동
  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <FormContainer>
      <Row className="p-0 m-0">
        <Col md={8}>
          <h1>장바구니</h1>
          {cartItems.length === 0 ? (
            <Message>
              장바구니가 비었습니다 <Link to="/">Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={3}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        fluid
                        rounded
                      ></Image>
                    </Col>
                    <Col
                      md={4}
                      className="d-flex align-items-center overflow-scroll"
                    >
                      <Link
                        style={{ textDecoration: "none" }}
                        to={`/product/${item.product}`}
                      >
                        {item.name}
                      </Link>
                    </Col>
                    <Col md={2} className="d-flex align-items-center">
                      {item.price.toLocaleString("ko-KR")}원
                    </Col>
                    <Col md={2} className="d-flex align-items-center">
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={1} className="row align-items-center">
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>
                  결제 예정 금액 (
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)})
                </h2>
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toLocaleString("ko-KR")}
                원
              </ListGroup.Item>
              <ListGroup.Item className="d-grid gap-2">
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  주문하기
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default CartScreen;
