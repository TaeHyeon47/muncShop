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

// 홈 화면
const HomeScreen = () => {
  // URL의 검색 키워드와 페이지 수 파라미터를 가져옴
  const { keyword, pageNumber } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    // 파라미터에 있는 검색 키워드와 페이지 수를 전달
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  // 상품 리스트를 Store에서 가져오기
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  return (
    <Fragment>
      <Meta />
      {products.length === 0 ? (
        <Loader />
      ) : !keyword ? (
        <>
          {/* 이벤트 슬라이더 컴포넌트 */}
          <EventCarousel products={products} />
        </>
      ) : (
        <div className="product-container">
          <Link to="/" className="btn btn-dark rounded">
            뒤로가기
          </Link>
        </div>
      )}

      <div className="product-container">
        <h2>뭉크몰에서 추천하는 아이템!</h2>
        {/* 로딩 값이 true인 경우 로딩바 나타남*/}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            <Row>
              {/* 상품리스트를 뿌려주는 영역 */}
              {products.map((product) => (
                <Col key={product._id} xs={6} sm={6} md={4} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
            {/* 상품 페이지 넘버 컴포넌트 */}
            <Paginate
              pages={pages}
              page={page}
              keyword={keyword ? keyword : ""}
            />
          </>
        )}
      </div>
      {!keyword ? (
        // 인스타그램 사진 영역
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
