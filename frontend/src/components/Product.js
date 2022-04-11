import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import "./Product.css";

const Product = ({ product }) => {
  return (
    <Card className="my-3 rounded" border="light">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top"></Card.Img>
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`} className="rm-underline">
          <Card.Title as="div" className="card-title">
            <strong className="product-name">{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <p className="product-price">
            {" "}
            {product.price.toLocaleString("ko-KR")}원{" "}
          </p>
        </Card.Text>

        <Card.Text as="div">
          <Rating value={product.rating} text={`${product.numReviews}`} />
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
