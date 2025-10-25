import React, { useState } from 'react';
import { Bell, BarChart3, Users, User, Bus, Route, Calendar, MessageSquare, AlertTriangle, Map } from 'lucide-react';

function RouteMapDriver() {
  const [routeData] = useState({
    title: 'bản đồ tuyến đường',
    date: 'Thứ Hai, 11 tháng 10, 2024',
    status: 'Đang hoạt động',
    driver: {
      name: 'Nguyễn Văn A',
      role: 'Tài xế xe buýt'
    },
    routeInfo: {
      location: 'vị trí hiện tại: Đường Nguyễn Huệ',
      station: 'trạm tiếp theo: Trạm B',
      time: 'thời gian dự kiến: 10 phút',
      speed: 'tốc độ hiện tại: 50km/h'
    },
    liveInfo: {
      route: 'R01',
      distance: '12km',
      duration: '30p',
      stops: 4
    },
    stops: [
      { id: 1, name: 'trạm 1', status: 'đã đến' },
      { id: 2, name: 'trạm 2', status: 'đang đến' },
      { id: 3, name: 'trạm 3', status: 'chưa đến' },
      { id: 4, name: 'trạm 4', status: 'chưa đến' }
    ]
  });

  const menuItems = [
    { icon: BarChart3, label: 'Lịch làm việc', active: false },
    { icon: Users, label: 'Danh sách học sinh', active: false },
    { icon: Route, label: 'Báo cáo chuyến đi', active: false },
    { icon: AlertTriangle, label: 'Cảnh báo sự cố', active: false },
    { icon: Map, label: 'Bản đồ tuyến đường', active: true },
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

        .route-map-container {
          display: flex;
          min-height: 100vh;
          background-color: #f8f9fa;
        }

        /* Sidebar */
        .route-sidebar {
          width: 220px;
          background-color: #ffffff;
          padding: 20px;
          box-shadow: 2px 0 10px rgba(0,0,0,0.05);
          position: fixed;
          height: 100vh;
          overflow-y: auto;
        }

        .route-sidebar-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 1px solid #e9ecef;
        }

        .route-logo-icon {
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

        .route-logo-text h3 {
          font-size: 14px;
          font-weight: 600;
          color: #2c3e50;
          margin: 0;
        }

        .route-logo-text p {
          font-size: 11px;
          color: #95a5a6;
          margin: 0;
        }

        .route-sidebar-menu {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .route-menu-item {
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

        .route-menu-item:hover {
          background-color: #f1f3f5;
          color: #495057;
        }

        .route-menu-item.active {
          background-color: #5f3dc4;
          color: white;
          font-weight: 500;
        }

        /* Main Content */
        .route-main {
          flex: 1;
          margin-left: 220px;
          padding: 30px;
        }

        /* Header */
        .route-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          background: white;
          padding: 20px 25px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        .route-header-left h1 {
          font-size: 24px;
          font-weight: 600;
          color: #2c3e50;
          margin: 0 0 5px 0;
        }

        .route-header-left p {
          font-size: 14px;
          color: #95a5a6;
          margin: 0;
        }

        .route-header-right {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .route-status {
          display: flex;
          align-items: center;
          gap: 8px;
          background-color: #d4edda;
          color: #155724;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 500;
        }

        .route-user {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .route-user img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
        }

        .route-user-info {
          display: flex;
          flex-direction: column;
        }

        .route-user-name {
          font-size: 14px;
          font-weight: 500;
          color: #2c3e50;
        }

        .route-user-role {
          font-size: 12px;
          color: #95a5a6;
        }

        /* Content */
        .route-content {
          display: flex;
          gap: 20px;
        }

        .route-info-cards {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 15px;
          margin-bottom: 20px;
        }

        .route-info-card {
          background: #8b6f5d;
          color: white;
          padding: 15px;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .route-info-label {
          font-size: 13px;
          margin-bottom: 8px;
          opacity: 0.9;
        }

        .route-info-value {
          font-size: 16px;
          font-weight: 600;
        }

        /* Map Area */
        .route-map-section {
          flex: 1;
        }

        .route-map-box {
          background: #d3d3d3;
          border-radius: 12px;
          height: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          color: #6c757d;
          position: relative;
        }

        /* Sidebar Info */
        .route-sidebar-info {
          width: 300px;
        }

        .route-info-section {
          background: white;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 20px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        .route-info-title {
          font-size: 16px;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 15px;
          text-transform: lowercase;
        }

        .route-info-item-box {
          background: #8b6f5d;
          color: white;
          padding: 12px 15px;
          border-radius: 8px;
          margin-bottom: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .route-info-item-label {
          font-size: 14px;
        }

        .route-info-item-value {
          font-size: 14px;
          font-weight: 600;
        }

        .route-stops-section {
          background: white;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        .route-stop-item {
          background: #8b6f5d;
          color: white;
          padding: 12px 15px;
          border-radius: 8px;
          margin-bottom: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .route-stop-name {
          font-size: 14px;
        }

        .route-stop-status {
          font-size: 13px;
          font-weight: 500;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .route-content {
            flex-direction: column;
          }

          .route-sidebar-info {
            width: 100%;
          }

          .route-info-cards {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .route-sidebar {
            transform: translateX(-100%);
          }

          .route-main {
            margin-left: 0;
            padding: 15px;
          }

          .route-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }

          .route-info-cards {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="route-map-container">
        {/* Sidebar */}
        <aside className="route-sidebar">
          <div className="route-sidebar-logo">
            <div className="route-logo-icon">
              <Bus size={24} />
            </div>
            <div className="route-logo-text">
              <h3>SchoolBus</h3>
              <p>Tài xế</p>
            </div>
          </div>

          <nav className="route-sidebar-menu">
            {menuItems.map((item, index) => (
              <div 
                key={index}
                className={`route-menu-item ${item.active ? 'active' : ''}`}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="route-main">
          {/* Header */}
          <header className="route-header">
            <div className="route-header-left">
              <h1>{routeData.title}</h1>
              <p>{routeData.date}</p>
            </div>
            <div className="route-header-right">
              <div className="route-status">
                <span style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#28a745'
                }}></span>
                {routeData.status}
              </div>
              <div className="route-user">
                <img src="https://via.placeholder.com/40" alt={routeData.driver.name} />
                <div className="route-user-info">
                  <span className="route-user-name">{routeData.driver.name}</span>
                  <span className="route-user-role">{routeData.driver.role}</span>
                </div>
              </div>
            </div>
          </header>

          {/* Info Cards */}
          <div className="route-info-cards">
            <div className="route-info-card">
              <div className="route-info-label">vị trí hiện tại</div>
              <div className="route-info-value">Đường Nguyễn Huệ</div>
            </div>
            <div className="route-info-card">
              <div className="route-info-label">trạm tiếp theo</div>
              <div className="route-info-value">Trạm B</div>
            </div>
            <div className="route-info-card">
              <div className="route-info-label">thời gian dự kiến</div>
              <div className="route-info-value">10 phút</div>
            </div>
            <div className="route-info-card">
              <div className="route-info-label">tốc độ hiện tại</div>
              <div className="route-info-value">50km/h</div>
            </div>
          </div>

          {/* Map and Info Content */}
          <div className="route-content">
            {/* Map Section */}
            <div className="route-map-section">
              <div className="route-map-box">
                bản đồ trực tiếp
              </div>
            </div>

            {/* Right Sidebar Info */}
            <div className="route-sidebar-info">
              {/* Route Info */}
              <div className="route-info-section">
                <h3 className="route-info-title">thông tin tuyến đường</h3>
                <div className="route-info-item-box">
                  <span className="route-info-item-label">mã tuyến</span>
                  <span className="route-info-item-value">{routeData.liveInfo.route}</span>
                </div>
                <div className="route-info-item-box">
                  <span className="route-info-item-label">quãng đường</span>
                  <span className="route-info-item-value">{routeData.liveInfo.distance}</span>
                </div>
                <div className="route-info-item-box">
                  <span className="route-info-item-label">thời gian dự kiến</span>
                  <span className="route-info-item-value">{routeData.liveInfo.duration}</span>
                </div>
                <div className="route-info-item-box">
                  <span className="route-info-item-label">tổng trạm dừng</span>
                  <span className="route-info-item-value">{routeData.liveInfo.stops}</span>
                </div>
              </div>

              {/* Stops List */}
              <div className="route-stops-section">
                <h3 className="route-info-title">các điểm dừng</h3>
                {routeData.stops.map((stop) => (
                  <div key={stop.id} className="route-stop-item">
                    <span className="route-stop-name">{stop.name}</span>
                    <span className="route-stop-status">{stop.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default RouteMapDriver;
