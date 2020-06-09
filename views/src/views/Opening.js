import React from 'react';
import {
  Link
} from "react-router-dom";

function Opening(props) {
  return (
    <div className="vh-100">
      <div className="card text-center p-5 w-50 postion-absolute" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <h3>P1: Ngược dòng thời gian</h3>
        <Link to="/section-1" className="btn btn-primary w-50 mx-auto mt-4">Bắt đầu</Link>
      </div>
    </div>
  );
}

export default Opening;