import { createContext, useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import { AppContext } from './AppContext';
import { toast } from 'react-toastify';

export const NotificationContext = createContext();

const socket = io('http://localhost:5000');

export const NotificationProvider = ({ children }) => {
  const { user, isAuthenticated } = useContext(AppContext);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (isAuthenticated && user) {
      // Join room theo role của user
      const room = user.role === 'parent' ? 'parent' : user.role === 'driver' ? 'driver' : null;
      
      if (room) {
        socket.emit('join-room', room);
        console.log(`Joined room: ${room}`);
      }

      // Lắng nghe tin nhắn mới
      socket.on('receive-message', (data) => {
        const { content, sender, timestamp } = data;
        
        // Thêm notification
        const newNotification = {
          id: Date.now(),
          message: content,
          sender,
          timestamp,
          read: false
        };
        
        setNotifications(prev => [newNotification, ...prev]);
        setUnreadCount(prev => prev + 1);
        
        // Hiển thị toast notification
        toast.info(`Tin nhắn mới từ ${sender}: ${content}`, {
          position: 'top-right',
          autoClose: 5000
        });
      });

      return () => {
        socket.off('receive-message');
      };
    }
  }, [isAuthenticated, user]);

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
