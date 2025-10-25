import React, { useState } from 'react';
import { Bell, BarChart3, Users, User, Bus, Route, Calendar, MessageSquare, AlertTriangle, Map, Send } from 'lucide-react';

function MessageManagement() {
  const [messageInput, setMessageInput] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('parent');

  const menuItems = [
    { icon: BarChart3, label: 'Tổng quan', active: false },
    { icon: Users, label: 'Học sinh', active: false },
    { icon: User, label: 'Tài xế', active: false },
    { icon: Bus, label: 'Xe buýt', active: false },
    { icon: Route, label: 'Tuyến đường', active: false },
    { icon: Calendar, label: 'Lịch trình', active: false },
    { icon: MessageSquare, label: 'Tin nhắn', active: true },
    { icon: AlertTriangle, label: 'Cảnh báo', active: false },
    { icon: Map, label: 'Bản đồ theo dõi', active: false },
  ];

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      console.log(`Gửi tin nhắn đến ${selectedGroup}: ${messageInput}`);
      setMessageInput('');
    }
  };

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

        .message-dashboard-container {
          display: flex;
          min-height: 100vh;
          background-color: #f8f9fa;
        }

        /* Sidebar */
        .message-sidebar {
          width: 220px;
          background-color: #ffffff;
          padding: 20px;
          box-shadow: 2px 0 10px rgba(0,0,0,0.05);
          position: fixed;
          height: 100vh;
          overflow-y: auto;
        }

        .message-sidebar-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 1px solid #e9ecef;
        }

        .message-logo-icon {
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

        .message-logo-text h3 {
          font-size: 16px;
          font-weight: 600;
          color: #2c3e50;
          margin: 0;
        }

        .message-logo-text p {
          font-size: 11px;
          color: #95a5a6;
          margin: 0;
        }

        .message-sidebar-menu {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .message-menu-item {
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

        .message-menu-item:hover {
          background-color: #f1f3f5;
          color: #495057;
        }

        .message-menu-item.active {
          background-color: #5f3dc4;
          color: white;
          font-weight: 500;
        }

        /* Main Content */
        .message-main {
          flex: 1;
          margin-left: 220px;
          padding: 30px;
        }

        /* Header */
        .message-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          background: white;
          padding: 20px 25px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        .message-header-left h1 {
          font-size: 24px;
          font-weight: 600;
          color: #2c3e50;
          margin: 0 0 5px 0;
        }

        .message-header-left p {
          font-size: 14px;
          color: #95a5a6;
          margin: 0;
        }

        .message-header-right {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .message-notification {
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

        .message-notification:hover {
          background-color: #e9ecef;
        }

        .message-notification-badge {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 8px;
          height: 8px;
          background-color: #e74c3c;
          border-radius: 50%;
          border: 2px solid white;
        }

        .message-user {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .message-user img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
        }

        .message-user span {
          font-size: 14px;
          font-weight: 500;
          color: #2c3e50;
        }

        /* Content Area */
        .message-content {
          background: #e5e5e5;
          border-radius: 16px;
          padding: 40px;
          min-height: calc(100vh - 200px);
        }

        .message-title {
          font-size: 28px;
          font-weight: 600;
          color: #2c3e50;
          margin: 0 0 30px 0;
        }

        /* Group Buttons */
        .message-groups {
          display: flex;
          gap: 15px;
          margin-bottom: 30px;
        }

        .message-group-btn {
          flex: 1;
          padding: 18px 24px;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .message-group-btn.parent {
          background: #8b6f5d;
          color: white;
        }

        .message-group-btn.driver {
          background: #ffcccc;
          color: #2c3e50;
        }

        .message-group-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        /* Message Area */
        .message-chat-area {
          background: white;
          border-radius: 12px;
          padding: 30px;
          min-height: 400px;
          display: flex;
          flex-direction: column;
        }

        .message-recipient-section {
          display: flex;
          gap: 15px;
          margin-bottom: 30px;
        }

        .message-recipient-btn {
          padding: 15px 30px;
          border: none;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .message-recipient-btn.parent-btn {
          background: #8b6f5d;
          color: white;
          flex: 1;
        }

        .message-recipient-btn.driver-btn {
          background: #ffcccc;
          color: #2c3e50;
          flex: 1;
        }

        .message-recipient-btn:hover {
          opacity: 0.9;
        }

        /* Message Input */
        .message-input-section {
          margin-top: auto;
        }

        .message-input-wrapper {
          display: flex;
          gap: 15px;
          align-items: center;
          background: #f8f9fa;
          padding: 15px;
          border-radius: 10px;
        }

        .message-input {
          flex: 1;
          border: none;
          background: white;
          padding: 15px 20px;
          border-radius: 8px;
          font-size: 14px;
          outline: none;
        }

        .message-input::placeholder {
          color: #adb5bd;
        }

        .message-send-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s;
        }

        .message-send-btn:hover {
          transform: scale(1.1);
        }

        .message-send-btn svg {
          color: #2c3e50;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .message-sidebar {
            transform: translateX(-100%);
          }

          .message-main {
            margin-left: 0;
            padding: 15px;
          }

          .message-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }

          .message-content {
            padding: 20px;
          }

          .message-groups {
            flex-direction: column;
          }

          .message-recipient-section {
            flex-direction: column;
          }
        }
      `}</style>

      <div className="message-dashboard-container">
        {/* Sidebar */}
        <aside className="message-sidebar">
          <div className="message-sidebar-logo">
            <div className="message-logo-icon">
              <Bus size={24} />
            </div>
            <div className="message-logo-text">
              <h3>SchoolBus Pro</h3>
              <p>Hệ thống quản lý</p>
            </div>
          </div>

          <nav className="message-sidebar-menu">
            {menuItems.map((item, index) => (
              <div 
                key={index}
                className={`message-menu-item ${item.active ? 'active' : ''}`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="message-main">
          {/* Header */}
          <header className="message-header">
            <div className="message-header-left">
              <h1>Dashboard Quản lý</h1>
              <p>Tổng quản hệ thống xe buýt trường học</p>
            </div>
            <div className="message-header-right">
              <div className="message-notification">
                <Bell size={20} />
                <span className="message-notification-badge"></span>
              </div>
              <div className="message-user">
                <img src="https://via.placeholder.com/40" alt="Admin" />
                <span>Admin</span>
              </div>
            </div>
          </header>

          {/* Message Content */}
          <div className="message-content">
            <h2 className="message-title">Tin Nhắn</h2>

            {/* Group Selection */}
            <div className="message-groups">
              <button 
                className="message-group-btn parent"
                onClick={() => setSelectedGroup('parent')}
              >
                Nhóm phụ huynh
              </button>
              <button 
                className="message-group-btn driver"
                onClick={() => setSelectedGroup('driver')}
              >
                Nhóm tài xế
              </button>
            </div>

            {/* Chat Area */}
            <div className="message-chat-area">
              <div className="message-recipient-section">
                <button className="message-recipient-btn parent-btn">
                  Nhóm tài xế
                </button>
                <button className="message-recipient-btn driver-btn">
                  Nhóm tài xế
                </button>
              </div>

              {/* Message Input */}
              <div className="message-input-section">
                <div className="message-input-wrapper">
                  <input 
                    type="text"
                    className="message-input"
                    placeholder="soạn tin nhắn"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button 
                    className="message-send-btn"
                    onClick={handleSendMessage}
                  >
                    <Send size={24} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default MessageManagement;
