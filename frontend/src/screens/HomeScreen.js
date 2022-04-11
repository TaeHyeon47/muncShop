import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import Instagram from "../components/Instagram";
import EventCarousel from "../components/EventCarousel";
import Meta from "../components/Meta";
import { listProducts } from "../actions/productActions";
import "./HomeScreen.css";

const HomeScreen = () => {
  const { keyword, pageNumber } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  return (
    <Fragment>
      <Meta />
      {!keyword ? (
        <EventCarousel />
      ) : (
        <div className="product-container">
          <Link to="/" className="btn btn-dark rounded">
            뒤로가기
          </Link>
        </div>
      )}

      <div className="product-container">
        <h2>뭉크몰에서 추천하는 아이템!</h2>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            <Row>
              {products.map((product) => (
                <Col key={product._id} xs={6} sm={6} md={4} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
            <Paginate
              pages={pages}
              page={page}
              keyword={keyword ? keyword : ""}
            />
          </>
        )}
      </div>
      {!keyword ? (
        <Instagram />
      ) : (
        <div className="product-container">
          {" "}
          <strong> 검색 결과가 없습니다.</strong>{" "}
        </div>
      )}
    </Fragment>
  );
};

export default HomeScreen;
