import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";
import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";
import { productReviewCreateAction } from "../store/productReviewCreateSlice";
import FormContainer from "../components/FormContainer";

const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { id } = useParams();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { success: successProductReview, error: errorProductReview } =
    productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      alert("리뷰 작성이 완료되었습니다.");
      setRating(0);
      setComment("");
      dispatch(productReviewCreateAction.PRODUCT_CREATE_REVIEW_RESET());
    }

    dispatch(listProductDetails(id));
  }, [dispatch, id, successProductReview]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(id, {
        rating,
        comment,
      })
    );
  };

  return (
    <FormContainer>
      <Link className="btn btn-dark rounded my-3" to="/">
        뒤로가기
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>

            <Col md={3}>
              <ListGroup variant="flush" className="d-flex flex-column gap-2">
                <ListGroup.Item>
                  <h2>{product.name}</h2>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews}`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>{product.price}원</ListGroup.Item>
                <ListGroup.Item style={{ fontSize: "0.8rem" }}>
                  {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>가격</Col>
                      <Col>
                        <strong>{product.price}원</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>재고수량</Col>
                      <Col>
                        <strong>
                          {product.countInStock > 0 ? "있음" : "없음"}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>수량 선택</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className="w-100"
                      type="button"
                      disabled={product.countInStock === 0}
                    >
                      장바구니 추가
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={6}>
              <h2>상품리뷰</h2>
              {product.reviews.length === 0 && (
                <Message>등록된 상품리뷰가 없습니다</Message>
              )}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createAt}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <br />
                <ListGroup.Item>
                  <h2>리뷰를 작성해주세요</h2>
                  {errorProductReview && (
                    <Message variant="danger">{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form
                      onSubmit={submitHandler}
                      className="d-flex flex-column gap-3"
                    >
                      <Form.Group controlId="rating">
                        <Form.Label>평점</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">평점 선택</option>
                          <option value="1">1 - 마음에 안 들어요</option>
                          <option value="2">2 - 그저 그래요</option>
                          <option value="3">3 - 보통이에요</option>
                          <option value="4">4 - 마음에 들어요</option>
                          <option value="5">5 - 인생템이에요</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>리뷰 내용</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        >
                          리뷰 내용
                        </Form.Control>
                      </Form.Group>
                      <Button type="submit" variant="primary">
                        작성완료
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      {" "}
                      <Link to="/login">로그인</Link>이 필요합니다.{" "}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </FormContainer>
  );
};

export default ProductScreen;
