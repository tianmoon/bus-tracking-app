import React from "react";
import "./SettingPH.css";
import { FaBus, FaBell, FaHistory, FaChild, FaCog, FaQuestionCircle } from "react-icons/fa";

const SettingPH = () => {
  return (
    <div className="settingph-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <FaBus className="bus-icon" />
          <h3>SafeBus Parent</h3>
        </div>
        <ul className="menu">
          <li><FaBus /> Theo dõi xe buýt</li>
          <li><FaBell /> Thông báo</li>
          <li><FaHistory /> Lịch sử chuyến đi</li>
          <li><FaChild /> Thông tin con em</li>
          <li className="active"><FaCog /> Cài đặt</li>
        </ul>
      </aside>

      {/* Main content */}
      <main className="main-content">
        {/* Header */}
        <header className="topbar">
          <h3>Cài đặt Phụ huynh</h3>
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

        {/* Content */}
        <section className="content-box">
          <div className="setting-header">
            <h3>Cài đặt</h3>
            <FaQuestionCircle className="help-icon" />
          </div>

          {/* Thông tin tài khoản */}
          <div className="info-section">
            <h4>Thông tin tài khoản</h4>
            <p><b>Họ và tên:</b> Nguyễn Thị Lan</p>
            <p><b>Email:</b> hovaten@gmail.com</p>
            <p><b>SDT:</b> 0123456789</p>
          </div>

          {/* Thông báo & ngôn ngữ */}
          <div className="info-section">
            <h4>Thông báo & ngôn ngữ</h4>
            <p>Bật/tắt thông báo</p>
            <p>Ngôn ngữ</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SettingPH;