import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";

// 로그인 화면
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin); //로그인 Store에서 로그인 정보를 가져옴
  const { loading, error, userInfo } = userLogin; // 로그인한 경우 userInfo 정보가 있음

  let redirect = location.search ? location.search.split("=")[1] : "/"; // 검색 값이 있는 경우, 파라미터 "=" 뒤에 있는 1번째 값을 redirect에 redirect에 추가

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h1>로그인</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>이메일 주소</Form.Label>
          <Form.Control
            type="text"
            placeholder="이메일을 입력해주세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <br />
        <Form.Group controlId="password">
          <Form.Label>패스워드</Form.Label>
          <Form.Control
            type="password"
            placeholder="패스워드를 입력해주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <br />
        <Button type="submit" variant="primary" className="rounded">
          로그인
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          처음 방문하셨나요?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            회원가입
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
