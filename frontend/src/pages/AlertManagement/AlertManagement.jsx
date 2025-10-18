import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import './AlertManagement.css';

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
    <div className="dashboard">
      <Sidebar />
      
      <div className="main-content-alert">
        {/* Header */}
        <header className="dashboard-header-alert">
          <div className="header-left-alert">
            <h1>Dashboard Quản lý</h1>
            <p>Tổng quản hệ thống xe buýt trường học</p>
          </div>
          <div className="header-right-alert">
            <div className="notification-icon-alert">
              <span className="bell-icon-alert">🔔</span>
              <span className="notification-dot-alert"></span>
            </div>
            <div className="user-profile-alert">
              <img src="https://via.placeholder.com/40" alt="Admin" />
              <span>Admin</span>
            </div>
          </div>
        </header>

        {/* Alert Content */}
        <div className="alert-content-area">
          <h2 className="alert-main-title">Cảnh báo</h2>
          
          <div className="alert-cards-container">
            {alertTypes.map(alert => (
              <div 
                key={alert.id}
                className="alert-card-item"
                style={{ 
                  backgroundColor: alert.bgColor,
                  color: alert.textColor
                }}
                onClick={() => setSelectedAlert(alert.id)}
              >
                <span className="alert-card-icon">{alert.icon}</span>
                <span className="alert-card-text">{alert.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlertManagement;
