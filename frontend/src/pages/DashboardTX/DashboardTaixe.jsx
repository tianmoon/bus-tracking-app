import React from "react";
import "./DashboardTaixe.css";
import { FaBus, FaUserCircle, FaMapMarkerAlt, FaExclamationTriangle, FaPhoneAlt, FaMapMarkedAlt, FaGasPump, FaVideo } from "react-icons/fa";

function DashboardTaixe() {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <FaBus className="logo-icon" />
          <h2>SchoolBus</h2>
          <p className="role">Tài xế</p>
        </div>
        <ul className="menu">
          <li className="active">📅 Lịch làm việc</li>
          <li>👥 Danh sách học sinh</li>
          <li>📝 Báo cáo chuyến đi</li>
          <li>⚠️ Cảnh báo sự cố</li>
          <li>🗺️ Bản đồ tuyến đường</li>
        </ul>
      </aside>

      {/* Main content */}
      <main className="main">
        <div className="header">
          <h3>Lịch làm việc hôm nay</h3>
          <p>Thứ Hai, 11 tháng 10, 2024</p>
          <div className="driver-status">
            <span className="status-dot active"></span> Đang hoạt động
            <div className="driver-info">
              <FaUserCircle className="driver-avatar" />
              <span>Nguyễn Văn A</span>
              <p className="driver-role">Tài xế xe buýt</p>
            </div>
          </div>
        </div>

        <div className="content">
          {/* Lịch trình */}
          <section className="schedule">
            <h4>Lịch trình hôm nay</h4>
            <div className="schedule-box">
              <div className="shift-header morning">
                <span>☀️ Chuyến sáng - Đón học sinh</span>
                <p>5:30 - 7:30</p>
              </div>

              <div className="route-card done">
                <FaMapMarkerAlt />
                <div>
                  <p>Điểm 1: 123 Lê Lợi, Q1</p>
                  <small>3 học sinh - 6:30 AM</small>
                </div>
                <span className="status success">Đã đón</span>
              </div>

              <div className="route-card coming">
                <FaMapMarkerAlt />
                <div>
                  <p>Điểm 2: 456 Nguyễn Huệ, Q1</p>
                  <small>5 học sinh - 6:45 AM</small>
                </div>
                <span className="status blue">Đang đến</span>
              </div>

              <div className="route-card waiting">
                <FaMapMarkerAlt />
                <div>
                  <p>Điểm 3: 789 Đồng Khởi, Q1</p>
                  <small>2 học sinh - 7:00 AM</small>
                </div>
                <span className="status gray">Chờ</span>
              </div>

              <div className="shift-header afternoon">
                <span>🌙 Chuyến chiều - Trả học sinh</span>
                <p>4:00 - 5:00 PM</p>
              </div>

              <div className="route-card school">
                <FaMapMarkerAlt />
                <div>
                  <p>Trường Tiểu học ABC</p>
                  <small>Đón tất cả học sinh - 4:00 PM</small>
                </div>
                <span className="status gray">Chưa đến giờ</span>
              </div>
            </div>
          </section>

          {/* Cột bên phải */}
          <aside className="right-panel">
            <div className="students-today">
              <h4>Học sinh hôm nay</h4>
              <ul>
                <li><span>🧒 Trần Thị B</span> <small>Lớp 5A</small> ✅</li>
                <li><span>🧑‍🎓 Lê Văn C</span> <small>Lớp 4B</small> ✅</li>
                <li><span>👧 Phạm Thị D</span> <small>Lớp 3C</small> ⏳</li>
                <li><span>👦 Hoàng Văn E</span> <small>Lớp 2A</small> ⏳</li>
              </ul>
              <p className="summary">Tổng số: 10 học sinh | Đã đón: 3 học sinh</p>
            </div>

            <div className="quick-actions">
              <button className="report"><FaExclamationTriangle /> Báo cáo sự cố</button>
              <button className="contact"><FaPhoneAlt /> Liên hệ trường</button>
              <button className="map"><FaMapMarkedAlt /> Xem bản đồ</button>
            </div>

            <div className="vehicle-status">
              <h4>Trạng thái xe</h4>
              <p><FaGasPump /> Nhiên liệu: <b>80%</b></p>
              <p><FaMapMarkerAlt /> GPS: <span className="active">Hoạt động</span></p>
              <p><FaVideo /> Camera: <span className="active">Hoạt động</span></p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default DashboardTaixe;
