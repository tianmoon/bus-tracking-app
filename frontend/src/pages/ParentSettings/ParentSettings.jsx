import React, { useState } from 'react';
import { Bell, User, Calendar, MessageSquare, HelpCircle, Settings } from 'lucide-react';

function ParentSettings() {
  const [userInfo] = useState({
    name: 'Nguyễn Thị Lan',
    email: 'hovaten@gmail.com',
    phone: '0123456789'
  });

  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('vi');

  const menuItems = [
    { icon: Calendar, label: 'Thông tin xe buýt', active: false },
    { icon: User, label: 'Thông báo', active: false },
    { icon: MessageSquare, label: 'Lịch sử chuyến đi', active: false },
    { icon: HelpCircle, label: 'Thông tin con em', active: false },
    { icon: Settings, label: 'Cài đặt', active: true },
  ];

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .parent-settings-container {
          display: flex;
          min-height: 100vh;
          background-color: #f8f9fa;
        }

        /* Sidebar */
        .parent-sidebar {
          width: 220px;
          background-color: #ffffff;
          padding: 20px;
          box-shadow: 2px 0 10px rgba(0,0,0,0.05);
          position: fixed;
          height: 100vh;
          overflow-y: auto;
        }

        .parent-sidebar-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 1px solid #e9ecef;
        }

        .parent-logo-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 16px;
        }

        .parent-logo-text h3 {
          font-size: 14px;
          font-weight: 600;
          color: #2c3e50;
          margin: 0;
        }

        .parent-logo-text p {
          font-size: 11px;
          color: #95a5a6;
          margin: 0;
        }

        .parent-sidebar-menu {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .parent-menu-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 15px;
          border-radius: 8px;
          color: #6c757d;
          text-decoration: none;
          font-size: 13px;
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .parent-menu-item:hover {
          background-color: #f1f3f5;
          color: #495057;
        }

        .parent-menu-item.active {
          background-color: #5f3dc4;
          color: white;
          font-weight: 500;
        }

        /* Main Content */
        .parent-main {
          flex: 1;
          margin-left: 220px;
          padding: 30px;
        }

        /* Header */
        .parent-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          background: white;
          padding: 20px 25px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        .parent-header-left h1 {
          font-size: 24px;
          font-weight: 600;
          color: #2c3e50;
          margin: 0 0 5px 0;
        }

        .parent-header-right {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .parent-notification {
          position: relative;
          width: 40px;
          height: 40px;
          background-color: #f8f9fa;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .parent-notification:hover {
          background-color: #e9ecef;
        }

        .parent-notification-badge {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 8px;
          height: 8px;
          background-color: #e74c3c;
          border-radius: 50%;
          border: 2px solid white;
        }

        .parent-user {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .parent-user img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
        }

        .parent-user span {
          font-size: 14px;
          font-weight: 500;
          color: #2c3e50;
        }

        /* Content */
        .parent-content {
          background: white;
          border-radius: 12px;
          padding: 30px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        .parent-content-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 30px;
        }

        .parent-content-title {
          font-size: 22px;
          font-weight: 600;
          color: #2c3e50;
        }

        .parent-help-icon {
          width: 32px;
          height: 32px;
          background: #3498db;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s;
        }

        .parent-help-icon:hover {
          background: #2980b9;
        }

        /* User Info Section */
        .parent-info-section {
          margin-bottom: 35px;
        }

        .parent-section-title {
          font-size: 16px;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 20px;
        }

        .parent-info-grid {
          display: grid;
          gap: 20px;
        }

        .parent-info-row {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .parent-info-label {
          min-width: 120px;
          font-size: 14px;
          color: #6c757d;
          font-weight: 500;
        }

        .parent-info-value {
          flex: 1;
          font-size: 15px;
          color: #2c3e50;
          font-weight: 600;
        }

        /* Settings Section */
        .parent-settings-section {
          border-top: 2px solid #f1f3f5;
          padding-top: 30px;
        }

        .parent-settings-options {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .parent-setting-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 15px;
          background: #f8f9fa;
          border-radius: 10px;
        }

        .parent-setting-label {
          font-size: 14px;
          color: #2c3e50;
          font-weight: 500;
        }

        .parent-toggle {
          position: relative;
          width: 50px;
          height: 26px;
          background: ${notifications ? '#28a745' : '#dee2e6'};
          border-radius: 13px;
          cursor: pointer;
          transition: background 0.3s;
        }

        .parent-toggle::after {
          content: '';
          position: absolute;
          top: 3px;
          left: ${notifications ? '26px' : '3px'};
          width: 20px;
          height: 20px;
          background: white;
          border-radius: 50%;
          transition: left 0.3s;
        }

        .parent-select {
          padding: 8px 15px;
          border: 1px solid #dee2e6;
          border-radius: 6px;
          font-size: 14px;
          color: #2c3e50;
          background: white;
          cursor: pointer;
          outline: none;
          min-width: 150px;
        }

        .parent-select:focus {
          border-color: #5f3dc4;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .parent-sidebar {
            transform: translateX(-100%);
          }

          .parent-main {
            margin-left: 0;
            padding: 15px;
          }

          .parent-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }

          .parent-content {
            padding: 20px;
          }

          .parent-info-row {
            flex-direction: column;
            align-items: flex-start;
          }

          .parent-info-label {
            min-width: auto;
          }
        }
      `}</style>

      <div className="parent-settings-container">
        {/* Sidebar */}
        <aside className="parent-sidebar">
          <div className="parent-sidebar-logo">
            <div className="parent-logo-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17 8.5L12 3.5L7 8.5V19.5H10V14.5H14V19.5H17V8.5Z"/>
              </svg>
            </div>
            <div className="parent-logo-text">
              <h3>SafeBus Parent</h3>
            </div>
          </div>

          <nav className="parent-sidebar-menu">
            {menuItems.map((item, index) => (
              <div 
                key={index}
                className={`parent-menu-item ${item.active ? 'active' : ''}`}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="parent-main">
          {/* Header */}
          <header className="parent-header">
            <div className="parent-header-left">
              <h1>Cài đặt Phụ huynh</h1>
            </div>
            <div className="parent-header-right">
              <div className="parent-notification">
                <Bell size={20} />
                <span className="parent-notification-badge"></span>
              </div>
              <div className="parent-user">
                <img src="https://via.placeholder.com/40" alt="Nguyễn Thị Lan" />
                <span>Nguyễn Thị Lan</span>
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="parent-content">
            <div className="parent-content-header">
              <h2 className="parent-content-title">Cài đặt</h2>
              <div className="parent-help-icon">
                <HelpCircle size={18} />
              </div>
            </div>

            {/* User Info Section */}
            <div className="parent-info-section">
              <h3 className="parent-section-title">Thông tin tài khoản</h3>
              <div className="parent-info-grid">
                <div className="parent-info-row">
                  <span className="parent-info-label">Họ và tên:</span>
                  <span className="parent-info-value">{userInfo.name}</span>
                </div>
                <div className="parent-info-row">
                  <span className="parent-info-label">Email:</span>
                  <span className="parent-info-value">{userInfo.email}</span>
                </div>
                <div className="parent-info-row">
                  <span className="parent-info-label">SĐT:</span>
                  <span className="parent-info-value">{userInfo.phone}</span>
                </div>
              </div>
            </div>

            {/* Settings Section */}
            <div className="parent-settings-section">
              <h3 className="parent-section-title">Thông báo & ngôn ngữ</h3>
              <div className="parent-settings-options">
                <div className="parent-setting-item">
                  <span className="parent-setting-label">Bật/tắt thông báo</span>
                  <div 
                    className="parent-toggle"
                    onClick={() => setNotifications(!notifications)}
                  ></div>
                </div>
                <div className="parent-setting-item">
                  <span className="parent-setting-label">Ngôn ngữ</span>
                  <select 
                    className="parent-select"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    <option value="vi">Tiếng Việt</option>
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default ParentSettings;
