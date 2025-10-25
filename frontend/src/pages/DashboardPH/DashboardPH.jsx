import React from "react";
import "./DashboardPH.css";
import {
  FaBus,
  FaBell,
  FaUserCircle,
  FaRoute,
  FaClock,
  FaMapMarkedAlt,
} from "react-icons/fa";

function DashboardPH() {
  return (
    <div className="ph-container">
      {/* Sidebar */}
      <aside className="ph-sidebar">
        <div className="ph-logo">
          <FaBus className="ph-logo-icon" />
          <h2>SafeBus Parent</h2>
        </div>
        <ul className="ph-menu">
          <li className="active">🚌 Theo dõi xe buýt</li>
          <li>🔔 Thông báo</li>
          <li>🧾 Lịch sử chuyến đi</li>
          <li>👦 Thông tin con em</li>
          <li>⚙️ Cài đặt</li>
        </ul>
      </aside>

      {/* Main content */}
      <main className="ph-main">
        <header className="ph-header">
          <div>
            <h3>Theo dõi xe buýt</h3>
            <p>Theo dõi vị trí và trạng thái xe buýt của con em bạn</p>
          </div>
          <div className="ph-user">
            <FaUserCircle className="ph-avatar" />
            <span>Nguyễn Thị Lan</span>
          </div>
        </header>

        <div className="ph-content">
          {/* Info cards */}
          <div className="ph-info-cards">
            <div className="ph-card green">
              <h4>Xe buýt số 15</h4>
              <p>Tuyến: Trường THCS ABC → Nhà</p>
              <p>Học sinh: Nguyễn Minh An</p>
              <span className="ph-status">Đang di chuyển</span>
              <small>Dự kiến đến: 16:45</small>
            </div>

            <div className="ph-card yellow">
              <h4>Thời gian dự kiến</h4>
              <p>Đến điểm đón: 16:50</p>
              <p>Khoảng cách: 2.3 km</p>
              <p>Tốc độ TB: 25 km/h</p>
              <span className="ph-delay">Trễ 5 phút</span>
            </div>

            <div className="ph-card blue">
              <h4>Tuyến đường</h4>
              <p>8/12 điểm dừng đã qua</p>
              <p>Còn lại: 4 điểm dừng</p>
              <span className="ph-follow">Đang theo dõi</span>
            </div>
          </div>

          {/* Bản đồ theo dõi */}
          <section className="ph-map-section">
            <div className="ph-map-header">
              <h4>Bản đồ theo dõi</h4>
              <button className="ph-fullscreen">Toàn màn hình</button>
            </div>
            <div className="ph-map-placeholder">
              <FaMapMarkedAlt className="ph-map-icon" />
              <p>Bản đồ hiển thị vị trí xe buýt (demo placeholder)</p>
            </div>
          </section>

          {/* Cột bên phải */}
          <aside className="ph-right-panel">
            <div className="ph-recent">
              <h4>Thông báo gần đây</h4>
              <div className="ph-notice orange">
                <FaClock /> Xe bị trễ 5 phút
                <small>16:40 - Đắc Lộ đường</small>
              </div>
              <div className="ph-notice blue">
                <FaRoute /> Xe đã qua điểm dừng số 8<small>16:35</small>
              </div>
              <div className="ph-notice green">
                <FaBus /> Con em đã lên xe
                <small>15:30 - Trường THCS ABC</small>
              </div>
            </div>

            <div className="ph-child-info">
              <h4>Thông tin con em</h4>
              <div className="ph-child-card">
                <FaUserCircle className="ph-child-avatar" />
                <div>
                  <p>
                    <b>Nguyễn Minh An</b>
                  </p>
                  <p>Lớp 8A2</p>
                </div>
              </div>
              <p>
                <b>Trường:</b> THCS ABC
              </p>
              <p>
                <b>Tuyến xe:</b> Số 15
              </p>
              <p>
                <b>Điểm đón:</b> Ngã tư Bình Triệu
              </p>
              <p>
                <b>Trạng thái:</b>{" "}
                <span className="ph-active">Đang trên xe</span>
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default DashboardPH;
