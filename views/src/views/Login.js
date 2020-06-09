import React from 'react';
import {
  Link,
  useHistory,
  useLocation
} from "react-router-dom";
import {
  Container, Row, Col,
  Button, FormInput
} from 'shards-react';

// import logo from '../assets/images/ioe-logo.png';


export default function LoginPage(props) {
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  let login = () => {
    props.auth.authenticate(() => {
      history.replace(from);
    });
  };

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
                id="login__username"
                type="text"
                placeholder="Username"
              />
            </div>
            <div className="form-group">
              <FormInput
                id="login__password"
                type="password"
                placeholder="Password"
              />
            </div>
            <Button block onClick={login}>Log in</Button>
            <div className="text-center">
              <Link to="/register" className="btn btn-link">No account? Register now!</Link>
            </div>
          </form>
        </Col>
      </Row>
    </Container>
  );
}