import React from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, FormInput } from 'shards-react';

export default class LoginPage extends React.Component {
  render() {
    return (
      <Container className="login__container mt-5">
        <Row className="card p-5">
          <div className="text-right">
            <Link to="/">Trang chủ</Link>
          </div>
          <Col xs={5} className="mt-4">
            <p className="mb-0">Welcome to</p>
            <h2 className="mb-0">Stepping back</h2>
            <h1 className="mb-0">IN HISTORY</h1>
            <form className="mt-5 w-75">
              <div className="form-group">
                <FormInput
                  id="login__email"
                  type="mail"
                  placeholder="email"
                />
              </div>
              <div className="form-group">
                <FormInput
                  id="login__password"
                  type="password"
                  placeholder="Password"
                />
              </div>
              <Button block >Log in</Button>
              <div className="text-center">
                <Link to="/register" className="btn btn-link">No account? Register now!</Link>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}