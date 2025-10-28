import React from "react";
import { FaBus, FaBell, FaMapMarkedAlt, FaUserGraduate, FaExclamationTriangle } from "react-icons/fa";

function DriverTuyenDuong() {
  return (
    <div className="driver-dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo-section">
          <FaBus className="logo-icon" />
          <h2>SchoolBus</h2>
          <p>Tài xế</p>
        </div>
        <nav>
          <ul>
            <li><FaMapMarkedAlt /> Lịch làm việc</li>
            <li><FaUserGraduate /> Danh sách học sinh</li>
            <li><FaBell /> Báo cáo chuyến đi</li>
            <li><FaExclamationTriangle /> Cảnh báo sự cố</li>
            <li className="active"><FaMapMarkedAlt /> Bản đồ tuyến đường</li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="main-content">
        <header className="topbar">
          <div>
            <h1>Lịch làm việc hôm nay</h1>
            <p>Thứ Hai, 11 tháng 10, 2024</p>
          </div>
          <div className="driver-info">
            <span className="status-dot"></span>
            <span>Đang hoạt động</span>
            <FaBus className="driver-avatar" />
            <div className="driver-name">
              <strong>Nguyễn Văn A</strong>
              <p>Tài xế xe buýt</p>
            </div>
          </div>
        </header>

        {/* Route information */}
        <section className="route-section">
          <h2>bản đồ tuyến đường</h2>

          <div className="route-stats">
            <div className="stat-card">
              <p>vị trí hiện tại</p>
              <h3>Đường Nguyễn Huệ</h3>
            </div>
            <div className="stat-card">
              <p>trạm tiếp theo</p>
              <h3>Trạm B</h3>
            </div>
            <div className="stat-card">
              <p>thời gian dự kiến</p>
              <h3>10 phút</h3>
            </div>
            <div className="stat-card">
              <p>tốc độ hiện tại</p>
              <h3>50km/h</h3>
            </div>
          </div>

          <div className="map-and-info">
            {/* Map placeholder */}
            <div className="map-placeholder">
              <h3>bản đồ trực tiếp</h3>
            </div>

            {/* Route info */}
            <div className="route-details">
              <div className="info-card">
                <h4>thông tin tuyến đường</h4>
                <p><strong>mã tuyến</strong> <span>A01</span></p>
                <p><strong>quãng đường</strong> <span>12km</span></p>
                <p><strong>thời gian dự kiến</strong> <span>30p</span></p>
                <p><strong>tổng trạm dừng</strong> <span>4</span></p>
              </div>

              <div className="info-card">
                <h4>các điểm dừng</h4>
                <p><strong>trạm 1</strong> <span>đã đến</span></p>
                <p><strong>trạm 2</strong> <span>đang đến</span></p>
                <p><strong>trạm 3</strong> <span>chưa đến</span></p>
                <p><strong>trạm 4</strong> <span>chưa đến</span></p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default DriverTuyenDuong;