import React, { Component } from 'react';
import {
  Container, Row, Col,
  FormRadio, Button
} from 'shards-react';

class Question extends Component {
  render() {
    return (
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col xs={6}>
            <h4>Section 1: Ngược dòng thời gian</h4>
            <div className="card p-5">
              <h5>Question 1: Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam molestiae quo, sapiente sit nostrum hic?</h5>
              <div>
                <FormRadio name="answer">A. Lorem, ipsum.</FormRadio>
                <FormRadio name="answer">B. Lorem, ipsum.</FormRadio>
                <FormRadio name="answer">C. Lorem, ipsum.</FormRadio>
                <FormRadio name="answer">D. Lorem, ipsum.</FormRadio>
              </div>
            </div>
          </Col>
          <Col xs={3} className="d-flex flex-column justify-content-center">
            <div className="display-4 font-weight-bold text-warning">20s</div>
            <div>
              <Button className="px-5 mt-3">Next</Button>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Question;