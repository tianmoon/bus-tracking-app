import { createContext, useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import { AppContext } from './AppContext';
import { toast } from 'react-toastify';
import { BellRing } from 'lucide-react'; // (Tuỳ chọn) Icon cho toast nếu muốn

export const NotificationContext = createContext();

// Kết nối Socket
const socket = io('http://localhost:5000');

export const NotificationProvider = ({ children }) => {
  const { user, isAuthenticated } = useContext(AppContext);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (isAuthenticated && user) {
      console.log("Socket connecting for user:", user.name);

      // 1. LOGIC JOIN ROOM (Giữ nguyên logic cũ của em + Thêm Admin)
      const room = user.role === 'parent' ? 'parent' 
                 : user.role === 'driver' ? 'driver' 
                 : user.role === 'admin' ? 'admin' // <--- Thêm dòng này cho Admin
                 : null;
      
      if (room) {
        socket.emit('join-room', room);
        console.log(`Joined room: ${room}`);
      }

      // 2. LẮNG NGHE TIN NHẮN CHAT (Giữ nguyên code cũ của em)
      const handleReceiveMessage = (data) => {
        const { content, sender, timestamp } = data;
        const newNotif = {
          id: Date.now(),
          message: content,
          sender: sender || "Tin nhắn mới",
          timestamp: timestamp || new Date(),
          read: false,
          type: 'message' // Đánh dấu đây là tin nhắn
        };
        
        addNotification(newNotif);
        toast.info(`💬 ${sender}: ${content}`);
      };

      // 3. LẮNG NGHE CẢNH BÁO TỪ DRIVER (Code mới thêm vào)
      const handleNewAlert = (data) => {
        // data: { id, content, type, trip_id, timestamp, sender }
        const newAlert = {
          id: data.id || Date.now(),
          message: data.content,
          sender: data.sender || "HỆ THỐNG CẢNH BÁO",
          timestamp: data.timestamp || new Date(),
          read: false,
          type: 'alert', // Đánh dấu đây là cảnh báo khẩn cấp
          trip_id: data.trip_id
        };

        addNotification(newAlert);
        // Hiện Toast màu đỏ hoặc cảnh báo đặc biệt
        toast.error(`🚨 CẢNH BÁO: ${data.content}`, {
            autoClose: 8000, // Hiện lâu hơn chút
        });
      };

      // Đăng ký sự kiện socket
      socket.on('receive-message', handleReceiveMessage); // Nghe tin nhắn
      socket.on('new-notification', handleNewAlert);      // Nghe cảnh báo (QUAN TRỌNG)

      // Cleanup function khi unmount
      return () => {
        socket.off('receive-message', handleReceiveMessage);
        socket.off('new-notification', handleNewAlert);
      };
    }
  }, [isAuthenticated, user]);

  // Hàm phụ trợ để thêm thông báo và tăng số đếm (Dùng chung cho cả 2 loại)
  const addNotification = (newItem) => {
    setNotifications(prev => [newItem, ...prev]);
    setUnreadCount(prev => prev + 1);
  };

  // --- CÁC HÀM XỬ LÝ ĐỌC/XOÁ (Giữ nguyên) ---
  const markAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
    setUnreadCount(0);
  };

  const clearNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  const value = {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearNotifications
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};