import React from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, FormInput } from 'shards-react';

import { AppContext } from '../AppProvider';

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
            <AppContext.Consumer>
              {
                context => (
                  <div className="mt-5 w-75">
                    <div className="form-group">
                      <FormInput
                        name="email"
                        id="login__email"
                        type="email"
                        placeholder="email"
                        onChange={context.getEmailAndPassword}
                      />
                    </div>
                    <div className="form-group">
                      <FormInput
                        name="password"
                        id="login__password"
                        type="password"
                        placeholder="Password"
                        onChange={context.getEmailAndPassword}
                      />
                    </div>
                    <Button block onClick={context.sendEmailAndPasswordToServer}>Log in</Button>
                    <div className="text-center">
                      <Link to="/register" className="btn btn-link">No account? Register now!</Link>
                    </div>
                  </div>
                )
              }
            </AppContext.Consumer>
          </Col>
        </Row>
      </Container>
    );
  }
}