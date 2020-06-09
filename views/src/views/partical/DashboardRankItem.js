import React, { useState } from 'react';
import { Collapse } from "shards-react";

function DashboardRankItem(props) {
  const [toggle, setToggle] = useState(false);
  return (
    <button
      onClick={() => setToggle(!toggle)}
      className="list-group-item list-group-item-action border">
      <span className="font-weight-bold">1. Nguyễn Thành Lộc</span>
      <p className="row mb-0">
        <span className="col-5">
          Điểm: 400</span>
        <span className="col-7">
          Thời gian: 640s</span>
      </p>
      <Collapse open={toggle}>
        <p className="row mb-0">
          <span className="col-5">
            Khối: 12</span>
          <span className="col-7">
            Lớp: 12A3</span>
        </p>
        <p className="m-0">
          Trường: THPT Võ Thị Sáu</p>
        <p className="m-0">
          Huyện: Đất Đỏ</p>
      </Collapse>
    </button>
  );
}

export default DashboardRankItem;