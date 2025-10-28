import React from "react";
import { FaUserCircle } from 'react-icons/fa';
import Sidebar from "../../components/Sidebar/Sidebar";


function DriverListForAdmin() {
  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <Sidebar userRole='admin'/>

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
