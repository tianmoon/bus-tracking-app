import React from "react";
import Sidebar from "./Sidebar";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main-content">
        <header className="dashboard-header">
          <h1>Dashboard Quản lý</h1>
          <p>Tổng quan hệ thống xe buýt trường học</p>
        </header>

        <section className="stats">
          <div className="stat-box blue">
            <h2>1,247</h2>
            <p>Tổng số học sinh</p>
            <span>+125 số vòng trước</span>
          </div>
          <div className="stat-box green">
            <h2>45</h2>
            <p>Tài xế</p>
            <span>Đang hoạt động: 42</span>
          </div>
          <div className="stat-box yellow">
            <h2>28</h2>
            <p>Xe buýt</p>
            <span>Đang chờ: 25</span>
          </div>
          <div className="stat-box purple">
            <h2>15</h2>
            <p>Tuyến đường</p>
            <span>Hoạt động: 14</span>
          </div>
        </section>

        <section className="tracking-alerts">
          <div className="gps-tracking">
            <h3>Theo dõi xe buýt theo thời gian thực</h3>
            <p>Bật theo dõi GPS để cập nhật mỗi 3 giây</p>
          </div>
          <div className="alerts">
            <h3>Cảnh báo & Thông báo</h3>
            <ul>
              <li className="alert red">A-001: Quá thời gian dừng tại trạm (16 giờ trước)</li>
              <li className="alert yellow">B-003: Dừng quá lâu tại trạm (10 giờ trước)</li>
              <li className="alert red">C-005: Mất tín hiệu GPS</li>
            </ul>
            <button>Xem tất cả cảnh báo</button>
          </div>
        </section>

        <section className="active-buses">
          <h3>Xe buýt đang hoạt động</h3>
          <ul>
            <li className="bus green">A-001 - Hoạt động</li>
            <li className="bus yellow">B-003 - Tại trạm</li>
            <li className="bus green">C-005 - Hoạt động</li>
          </ul>
          <a href="#">Xem tất cả</a>
        </section>

        <section className="recent-messages">
          <h3>Tin nhắn gần đây</h3>
          <ul>
            <li><strong>Tài Hồ Nguyễn Văn A:</strong> Đã cập nhật điểm đón</li>
            <li><strong>Phụ huynh Lê Tị B:</strong> Con chưa liên lạc được</li>
            <li><strong>Tài xế Trần Văn C:</strong> Kẹt xe lúc 7h, chưa gửi tin trong 15 phút</li>
          </ul>
          <a href="#">Quản lý tin nhắn</a>
        </section>

        <section className="quick-actions">
          <button className="blue">Tạo lộ trình</button>
          <button className="green">Thêm tài xế</button>
          <button className="purple">Phân công tuyến</button>
          <button className="orange">Quản lý xe buýt</button>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
