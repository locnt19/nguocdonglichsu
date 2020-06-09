import React, { Component } from 'react';
import {
  Container, Row, Col,
  Navbar
} from 'shards-react';

import {
  Link
} from "react-router-dom";

import DashboardRankItem from './partical/DashboardRankItem';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }
  render() {
    return (
      <React.Fragment>
        <Navbar className="shadow-sm bg-white justify-content-end">
          <Link to="/opening">Dự thi</Link>
          <span className="d-flex ml-5">
            <span style={{ fontSize: 20 }} className="material-icons">person</span>
            <span>Nguyen Thanh Loc</span>
          </span>
          <Link className="ml-3" to="/">Thoát</Link>
        </Navbar>
        <Container>
          <Row className="page-header py-4">
            <div className="page-title">
              Số lần thi còn lại: 2
            </div>
          </Row>
          <div className="card p-5">
            <Row>
              <Col xs={8}>
                <h5>Kết quả thi đợt: 1</h5>
                <table className="table table-hover table-bordered">
                  <thead className="bg-light">
                    <tr>
                      <th scope="col" className="border-0">
                        #
                  </th>
                      <th scope="col" className="border-0">
                        Bài thi
                  </th>
                      <th scope="col" className="border-0">
                        Điểm
                  </th>
                      <th scope="col" className="border-0">
                        Thời gian
                  </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>P1: Ngược dòng thời gian</td>
                      <td>100</td>
                      <td>200s</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>P2: Giải mã lịch sử</td>
                      <td>100</td>
                      <td>180s</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>P3: Khám phá</td>
                      <td>100</td>
                      <td>160s</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>P4: Kết nối</td>
                      <td>100</td>
                      <td>100s</td>
                    </tr>
                    <tr>
                      <td colSpan={2}>Tổng:</td>
                      <td>400</td>
                      <td>640s</td>
                    </tr>
                  </tbody>
                </table>
                <a
                  target="_blank"
                  without="true"
                  rel="noopener noreferrer"
                  href="https://drive.google.com/file/d/1bAqd3j3KpwoGsbdzbQ4QJrfbO6WpWokt/view?usp=sharing">
                  Xem thể lệ cuộc thi tại đây</a>
              </Col>
              <Col xs={4}>
                <div className="d-flex align-items-center">
                  <img
                    width={64}
                    height={64}
                    src="https://via.placeholder.com/64"
                    alt="64x64" />
                  <div className="ml-3">
                    <p className="m-0">
                      Nguyễn Thành Lộc</p>
                    <p className="m-0">
                      ID: 273593068</p>
                    <p className="m-0">
                      Hạng: 1</p>
                  </div>
                </div>
                <div className="border rounded p-3 mt-3">
                  <p className="m-0">
                    <span>Khối: 12</span>
                    <span className="ml-3">Lớp: 12A3</span>
                  </p>
                  <p className="m-0">
                    Trường: THPT Võ Thị Sáu</p>
                  <p className="m-0">
                    Huyện: Đất Đỏ</p>
                </div>
                <div className="mt-4 font-weight-bold text-primary">
                  Xếp hạng Tuần 1</div>
                <ul className="list-group mt-2">
                  <DashboardRankItem />
                  <DashboardRankItem />
                </ul>
                <div className="mt-4 font-weight-bold text-primary">
                  Xếp hạng Đợt 1</div>
                <ul className="list-group mt-2">
                  <DashboardRankItem />
                  <DashboardRankItem />
                </ul>
              </Col>
            </Row>
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

export default Dashboard;