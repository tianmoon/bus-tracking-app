import React from "react";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>SchoolBus Pro</h2>
      <ul>
        <li>Tổng quan</li>
        <li>Học sinh</li>
        <li>Phụ huynh</li>
        <li>Tài xế</li>
        <li>Xe buýt</li>
        <li>Tuyến đường</li>
        <li>Lịch trình</li>
        <li>Theo dõi GPS</li>
        <li>Tin nhắn</li>
        <li>Cảnh báo</li>
      </ul>
    </div>
  );
}

export default Sidebar;
