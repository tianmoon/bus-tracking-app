import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import Sidebar from '../../components/Sidebar/Sidebar.jsx';


function AlertManagement() {
  const [selectedAlert, setSelectedAlert] = useState(null);


  const alertTypes = [
    {
      id: 1,
      type: 'driver',
      icon: '⚠',
      title: 'cảnh báo từ tài xế',
      bgColor: '#8B7D7D',
      textColor: '#FFFFFF'
    },
    {
      id: 2,
      type: 'parent',
      icon: '⏰',
      title: 'cảnh báo từ phụ huynh',
      bgColor: '#FFE0E0',
      textColor: '#000000'
    },
    {
      id: 3,
      type: 'route',
      icon: '⚠',
      title: 'cảnh báo tuyến đường',
      bgColor: '#D4E6D4',
      textColor: '#000000'
    }
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

        .alert-dashboard-container {
          display: flex;
          min-height: 100vh;
          background-color: #f8f9fa;
        }

        /* Sidebar */
        .alert-sidebar {
          width: 220px;
          background-color: #ffffff;
          padding: 20px;
          box-shadow: 2px 0 10px rgba(0,0,0,0.05);
          position: fixed;
          height: 100vh;
          overflow-y: auto;
        }

        .alert-sidebar-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 1px solid #e9ecef;
        }

        .alert-logo-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 20px;
        }

        .alert-logo-text h3 {
          font-size: 16px;
          font-weight: 600;
          color: #2c3e50;
          margin: 0;
        }

        .alert-logo-text p {
          font-size: 11px;
          color: #95a5a6;
          margin: 0;
        }

        .alert-sidebar-menu {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .alert-menu-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 15px;
          border-radius: 8px;
          color: #6c757d;
          text-decoration: none;
          font-size: 14px;
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .alert-menu-item:hover {
          background-color: #f1f3f5;
          color: #495057;
        }

        .alert-menu-item.active {
          background-color: #5f3dc4;
          color: white;
          font-weight: 500;
        }

        /* Main Content */
        .alert-main {
          flex: 1;
          margin-left: 220px;
          padding: 30px;
        }

        /* Header */
        .alert-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          background: white;
          padding: 20px 25px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        .alert-header-left h1 {
          font-size: 24px;
          font-weight: 600;
          color: #2c3e50;
          margin: 0 0 5px 0;
        }

        .alert-header-left p {
          font-size: 14px;
          color: #95a5a6;
          margin: 0;
        }

        .alert-header-right {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .alert-notification {
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

        .alert-notification:hover {
          background-color: #e9ecef;
        }

        .alert-notification-badge {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 8px;
          height: 8px;
          background-color: #e74c3c;
          border-radius: 50%;
          border: 2px solid white;
        }

        .alert-user {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .alert-user img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
        }

        .alert-user span {
          font-size: 14px;
          font-weight: 500;
          color: #2c3e50;
        }

        /* Content Area */
        .alert-content-box {
          background: #e5e5e5;
          border-radius: 16px;
          padding: 40px;
          min-height: 500px;
        }

        .alert-content-title {
          font-size: 28px;
          font-weight: 600;
          color: #2c3e50;
          margin: 0 0 30px 0;
        }

        .alert-cards-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
          max-width: 900px;
        }

        .alert-card {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 25px 30px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }

        .alert-card:hover {
          transform: translateX(8px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.12);
        }

        .alert-card-icon {
          font-size: 32px;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .alert-card-title {
          flex: 1;
          font-size: 18px;
          font-weight: 500;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .alert-sidebar {
            transform: translateX(-100%);
          }

          .alert-main {
            margin-left: 0;
            padding: 15px;
          }

          .alert-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }

          .alert-content-box {
            padding: 20px;
          }
        }
      `}</style>

      <div className="alert-dashboard-container">
        {/* Sidebar */}
        <Sidebar userRole='admin'/>

        {/* Main Content */}
        <main className="alert-main">
          {/* Header */}
          <header className="alert-header">
            <div className="alert-header-left">
              <h1>Dashboard Quản lý</h1>
              <p>Tổng quản hệ thống xe buýt trường học</p>
            </div>
            <div className="alert-header-right">
              <div className="alert-notification">
                <Bell size={20} />
                <span className="alert-notification-badge"></span>
              </div>
              <div className="alert-user">
                <img src="https://via.placeholder.com/40" alt="Admin" />
                <span>Admin</span>
              </div>
            </div>
          </header>

          {/* Alert Content */}
          <div className="alert-content-box">
            <h2 className="alert-content-title">Cảnh báo</h2>
            
            <div className="alert-cards-list">
              {alertTypes.map(alert => (
                <div 
                  key={alert.id}
                  className="alert-card"
                  style={{ 
                    backgroundColor: alert.bgColor,
                    color: alert.textColor
                  }}
                  onClick={() => setSelectedAlert(alert.id)}
                >
                  <span className="alert-card-icon">{alert.icon}</span>
                  <span className="alert-card-title">{alert.title}</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default AlertManagement;
