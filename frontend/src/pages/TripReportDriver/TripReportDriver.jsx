import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import Sidebar from '../../components/Sidebar/Sidebar.jsx';

function TripReportDriver() {
  const [tripData] = useState({
    title: 'Báo cáo chuyến đi',
    date: 'Thứ Hai, 11 tháng 10, 2024',
    status: 'Đang hoạt động',
    driver: {
      name: 'Nguyễn Văn A',
      role: 'Tài xế xe buýt'
    },
    stops: [
      {
        id: 1,
        name: 'Điểm 1: 123 Lê Lợi, Quận 1',
        address: 'Trường tiểu học ABC',
        time: '8:00',
        arrivalTime: '8:30',
        distance: '8.0km',
        students: 30,
        studentsReceived: 30,
        issue: 'Kẹt xe dẫn đến trễ 5 phút.',
        status: 'completed'
      }
    ]
  });

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

        .trip-report-container {
          display: flex;
          min-height: 100vh;
          background-color: #f8f9fa;
        }

        /* Sidebar */
        .trip-sidebar {
          width: 220px;
          background-color: #ffffff;
          padding: 20px;
          box-shadow: 2px 0 10px rgba(0,0,0,0.05);
          position: fixed;
          height: 100vh;
          overflow-y: auto;
        }

        .trip-sidebar-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 1px solid #e9ecef;
        }

        .trip-logo-icon {
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

        .trip-logo-text h3 {
          font-size: 14px;
          font-weight: 600;
          color: #2c3e50;
          margin: 0;
        }

        .trip-logo-text p {
          font-size: 11px;
          color: #95a5a6;
          margin: 0;
        }

        .trip-sidebar-menu {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .trip-menu-item {
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

        .trip-menu-item:hover {
          background-color: #f1f3f5;
          color: #495057;
        }

        .trip-menu-item.active {
          background-color: #5f3dc4;
          color: white;
          font-weight: 500;
        }

        /* Main Content */
        .trip-main {
          flex: 1;
          margin-left: 220px;
          padding: 30px;
        }

        /* Header */
        .trip-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          background: white;
          padding: 20px 25px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        .trip-header-left h1 {
          font-size: 24px;
          font-weight: 600;
          color: #2c3e50;
          margin: 0 0 5px 0;
        }

        .trip-header-left p {
          font-size: 14px;
          color: #95a5a6;
          margin: 0;
        }

        .trip-header-right {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .trip-status {
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

        .trip-user {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .trip-user img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
        }

        .trip-user-info {
          display: flex;
          flex-direction: column;
        }

        .trip-user-name {
          font-size: 14px;
          font-weight: 500;
          color: #2c3e50;
        }

        .trip-user-role {
          font-size: 12px;
          color: #95a5a6;
        }

        /* Content */
        .trip-content {
          background: white;
          border-radius: 12px;
          padding: 30px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        .trip-stop-card {
          background: #f8f9fa;
          border-radius: 12px;
          padding: 25px;
          margin-bottom: 20px;
        }

        .trip-stop-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
          padding-bottom: 20px;
          border-bottom: 2px solid #e9ecef;
        }

        .trip-stop-title {
          flex: 1;
        }

        .trip-stop-name {
          font-size: 18px;
          font-weight: 600;
          color: #2c3e50;
          margin: 0 0 10px 0;
          background: #28a745;
          color: white;
          padding: 10px 20px;
          border-radius: 8px;
          display: inline-block;
        }

        .trip-stop-address {
          font-size: 14px;
          color: #6c757d;
          margin: 10px 0 0 0;
        }

        .trip-complete-btn {
          background: #28a745;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: background 0.2s;
        }

        .trip-complete-btn:hover {
          background: #218838;
        }

        .trip-info-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-bottom: 20px;
        }

        .trip-info-item {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .trip-info-label {
          font-size: 13px;
          color: #6c757d;
          font-weight: 500;
        }

        .trip-info-value {
          font-size: 15px;
          color: #2c3e50;
          font-weight: 600;
        }

        .trip-issue-box {
          background: white;
          border-left: 4px solid #ffc107;
          padding: 15px 20px;
          border-radius: 8px;
          margin-top: 20px;
        }

        .trip-issue-label {
          font-size: 13px;
          color: #6c757d;
          font-weight: 500;
          margin-bottom: 8px;
        }

        .trip-issue-text {
          font-size: 14px;
          color: #2c3e50;
          line-height: 1.6;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .trip-sidebar {
            transform: translateX(-100%);
          }

          .trip-main {
            margin-left: 0;
            padding: 15px;
          }

          .trip-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }

          .trip-info-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="trip-report-container">
        {/* Sidebar */}
        <Sidebar userRole='driver'/>

        {/* Main Content */}
        <main className="trip-main">
          {/* Header */}
          <header className="trip-header">
            <div className="trip-header-left">
              <h1>{tripData.title}</h1>
              <p>{tripData.date}</p>
            </div>
            <div className="trip-header-right">
              <div className="trip-status">
                <span style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#28a745'
                }}></span>
                {tripData.status}
              </div>
              <div className="trip-user">
                <img src="https://via.placeholder.com/40" alt={tripData.driver.name} />
                <div className="trip-user-info">
                  <span className="trip-user-name">{tripData.driver.name}</span>
                  <span className="trip-user-role">{tripData.driver.role}</span>
                </div>
              </div>
            </div>
          </header>

          {/* Trip Content */}
          <div className="trip-content">
            {tripData.stops.map((stop) => (
              <div key={stop.id} className="trip-stop-card">
                <div className="trip-stop-header">
                  <div className="trip-stop-title">
                    <h2 className="trip-stop-name">{stop.name}</h2>
                    <p className="trip-stop-address">
                      <strong>Điểm đến:</strong> {stop.address}
                    </p>
                  </div>
                  <button className="trip-complete-btn">
                    <CheckCircle size={18} />
                    Đã hoàn thành
                  </button>
                </div>

                <div className="trip-info-grid">
                  <div className="trip-info-item">
                    <span className="trip-info-label">Thời gian khởi hành:</span>
                    <span className="trip-info-value">{stop.time}</span>
                  </div>
                  <div className="trip-info-item">
                    <span className="trip-info-label">Số lượng học sinh:</span>
                    <span className="trip-info-value">{stop.students}</span>
                  </div>
                  <div className="trip-info-item">
                    <span className="trip-info-label">Thời gian đến:</span>
                    <span className="trip-info-value">{stop.arrivalTime}</span>
                  </div>
                  <div className="trip-info-item">
                    <span className="trip-info-label">Số học sinh được trả:</span>
                    <span className="trip-info-value">{stop.studentsReceived}</span>
                  </div>
                  <div className="trip-info-item">
                    <span className="trip-info-label">Khoảng cách:</span>
                    <span className="trip-info-value">{stop.distance}</span>
                  </div>
                  <div className="trip-info-item">
                    <span className="trip-info-label">Sự cố:</span>
                    <span className="trip-info-value">{stop.issue}</span>
                  </div>
                </div>

                <div className="trip-issue-box">
                  <div className="trip-issue-label">Sự cố:</div>
                  <div className="trip-issue-text">{stop.issue}</div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}

export default TripReportDriver;
