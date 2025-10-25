import React from "react";
import "./PHThongBao.css";
import { FaBus, FaBell, FaHistory, FaChild, FaCog, FaExclamationTriangle, FaCheckCircle, FaInfoCircle } from "react-icons/fa";

const PHThongBao = () => {
  const recentNoti = [
    { icon: <FaExclamationTriangle />, text: "Xe bị trễ 5 phút", detail: "Do tắc đường", color: "#fff6e5", date: "27/10/2025" },
    { icon: <FaInfoCircle />, text: "Xe đã qua điểm dừng số 8", detail: "", color: "#eef4ff", date: "27/10/2025" },
    { icon: <FaCheckCircle />, text: "Con em đã lên xe", detail: "Tại trường THCS ABC", color: "#e9f9f2", date: "27/10/2025" },
  ];

  const viewedNoti = [
    { icon: <FaExclamationTriangle />, text: "Xe bị trễ 5 phút", detail: "Do tắc đường", color: "#fff6e5", date: "26/10/2025" },
    { icon: <FaInfoCircle />, text: "Xe đã qua điểm dừng số 8", detail: "", color: "#eef4ff", date: "26/10/2025" },
    { icon: <FaCheckCircle />, text: "Con em đã lên xe", detail: "Tại trường THCS ABC", color: "#e9f9f2", date: "26/10/2025" },
  ];

  return (
    <div className="thongbaoph-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <FaBus className="bus-icon" />
          <h3>SafeBus Parent</h3>
        </div>
        <ul className="menu">
          <li><FaBus /> Theo dõi xe buýt</li>
          <li className="active"><FaBell /> Thông báo</li>
          <li><FaHistory /> Lịch sử chuyến đi</li>
          <li><FaChild /> Thông tin con em</li>
          <li><FaCog /> Cài đặt</li>
        </ul>
      </aside>

      {/* Main content */}
      <main className="main-content">
        {/* Header */}
        <header className="topbar">
          <h3>Thông báo mới</h3>
          <div className="user-info">
            <FaBell className="notif-icon" />
            <img
              src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
              alt="avatar"
              className="avatar"
            />
            <span>Nguyễn Thị Lan</span>
          </div>
        </header>

        {/* Recent notifications */}
        <section className="notification-section">
          <h4>Thông báo gần đây</h4>
          <div className="noti-list">
            {recentNoti.map((n, i) => (
              <div className="noti-card" key={i} style={{ backgroundColor: n.color }}>
                <div className="noti-icon">{n.icon}</div>
                <div className="noti-content">
                  <p className="noti-title">{n.text}</p>
                  <p className="noti-detail">{n.detail}</p>
                </div>
                <p className="noti-date">{n.date}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Viewed notifications */}
        <section className="notification-section">
          <h4>Đã xem</h4>
          <div className="noti-list">
            {viewedNoti.map((n, i) => (
              <div className="noti-card" key={i} style={{ backgroundColor: n.color }}>
                <div className="noti-icon">{n.icon}</div>
                <div className="noti-content">
                  <p className="noti-title">{n.text}</p>
                  <p className="noti-detail">{n.detail}</p>
                </div>
                <p className="noti-date">{n.date}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default PHThongBao;
