import React from "react";
import { FaBus, FaBell, FaUserCircle, FaUserGraduate, FaRoute, FaCalendarAlt, FaEnvelope } from "react-icons/fa";
import "./DriverListForAdmin.css";

function DriverListForAdmin() {
  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo-section">
          <FaBus className="logo-icon" />
          <h2>SchoolBus Pro</h2>
          <p>Hệ thống quản lý</p>
        </div>
        <nav>
          <ul>
            <li><FaBus /> Tổng quan</li>
            <li><FaUserGraduate /> Học sinh</li>
            <li className="active"><FaUserCircle /> Tài xế</li>
            <li><FaBus /> Xe buýt</li>
            <li><FaRoute /> Tuyến đường</li>
            <li><FaCalendarAlt /> Lịch trình</li>
            <li><FaEnvelope /> Tin nhắn</li>
            <li><FaBell /> Cảnh báo</li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="main-content">
        <header className="topbar">
          <div>
            <h1>Dashboard Quản lý</h1>
            <p>Tổng quan hệ thống xe buýt trường học</p>
          </div>
          <div className="admin-info">
            <FaUserCircle className="admin-avatar" />
            <span>Admin</span>
          </div>
        </header>

        <section className="driver-section">
          <h2>Danh sách tài xế</h2>
          <button className="add-button">Thêm</button>

          <table className="driver-table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Tên</th>
                <th>Số Điện Thoại</th>
                <th>Tuyến Phụ Trách</th>
                <th>Xe Buýt Chỉ Định</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td><strong>Nguyễn Văn A</strong></td>
                <td>0123456789</td>
                <td>Tuyến A</td>
                <td>81AH-9999</td>
                <td>
                  <button className="edit-btn">Sửa</button>
                  <button className="delete-btn">Xóa</button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

export default DriverListForAdmin;
