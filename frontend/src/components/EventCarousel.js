import React from "react";
import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
import { Carousel, Image } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import "./EventCarousel.css";

const EventCarousel = ({ products }) => {
  // const productList = useSelector((state) => state.productList);
  // const { loading, error } = productList;

  console.log("evnet");
  console.log(products);

  return (
    // <>
    //   {loading ? (
    //     <Loader />
    //   ) : error ? (
    //     <Message variant="danger">{error}</Message>
    //   ) : (
    <>
      <Carousel
        pause="hover"
        className="bd-white"
        interval={3000}
        variant="dark"
      >
        <Carousel.Item>
          <Link to={`/product/${products[0]._id}`}>
            <Image
              src="/images/event/event-01.jpeg"
              className="mobile-01"
              alt=""
              fluid
            />
          </Link>
        </Carousel.Item>
        <Carousel.Item>
          <Link to={`/product/${products[1]._id}`}>
            <Image
              src="/images/event/event-02.jpeg"
              className="mobile-02"
              alt=""
              fluid
            />
          </Link>
        </Carousel.Item>
        <Carousel.Item>
          <Link to={`/product/${products[3]._id}`}>
            <Image
              src="/images/event/event-03.jpeg"
              className="mobile-03"
              alt=""
              fluid
            />
          </Link>
        </Carousel.Item>
        <Carousel.Item>
          <Link to={`/product/${products[4]._id}`}>
            <Image
              src="/images/event/event-04.png"
              className="mobile-04"
              alt=""
              fluid
            />
          </Link>
        </Carousel.Item>
        <Carousel.Item>
          <Link to={`/product/${products[5]._id}`}>
            <Image
              src="/images/event/event-05.png"
              className="mobile-05"
              alt=""
              fluid
            />
          </Link>
        </Carousel.Item>
      </Carousel>
      {/* </>
      )} */}
    </>
  );
};

export default EventCarousel;
