import React, { useContext, useState } from 'react';
import { Bell, CircleUserRound, LogOut, X } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import { NotificationContext } from '../context/NotificationContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Header() {
    const { user, logout } = useContext(AppContext);
    const { notifications, unreadCount, markAsRead, markAllAsRead, clearNotifications } = useContext(NotificationContext);
    const navigate = useNavigate();
    const [showNotifications, setShowNotifications] = useState(false);

    const handleLogout = () => {
        logout();
        toast.success('Đăng xuất thành công!');
        navigate('/');
    };

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    return (
        <>
            <div className="bg-white border-b px-6 py-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Dashboard Quản lý</h1>
                        <p className="text-sm text-gray-500">Tổng quan hệ thống xe buýt trường học</p>
                    </div>
                    <div className="flex items-center gap-4">
                        {/* Notification Bell */}
                        <div className="relative">
                            <button 
                                onClick={toggleNotifications}
                                className="relative"
                            >
                                <Bell size={24} className="text-gray-600 cursor-pointer hover:text-gray-800" />
                                {unreadCount > 0 && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                                        {unreadCount > 9 ? '9+' : unreadCount}
                                    </span>
                                )}
                            </button>

                            {/* Notification Dropdown */}
                            {showNotifications && (
                                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-hidden">
                                    {/* Header */}
                                    <div className="bg-indigo-600 text-white px-4 py-3 flex justify-between items-center">
                                        <h3 className="font-semibold">Thông báo</h3>
                                        <button onClick={toggleNotifications}>
                                            <X size={20} />
                                        </button>
                                    </div>

                                    {/* Notifications List */}
                                    <div className="max-h-80 overflow-y-auto">
                                        {notifications.length > 0 ? (
                                            <>
                                                {notifications.map((notif) => (
                                                    <div
                                                        key={notif.id}
                                                        className={`px-4 py-3 border-b hover:bg-gray-50 cursor-pointer ${
                                                            !notif.read ? 'bg-blue-50' : ''
                                                        }`}
                                                        onClick={() => markAsRead(notif.id)}
                                                    >
                                                        <div className="flex justify-between items-start">
                                                            <div className="flex-1">
                                                                <p className="text-sm font-semibold text-gray-800">
                                                                    {notif.sender}
                                                                </p>
                                                                <p className="text-sm text-gray-600 mt-1">
                                                                    {notif.message}
                                                                </p>
                                                                <p className="text-xs text-gray-400 mt-1">
                                                                    {new Date(notif.timestamp).toLocaleString('vi-VN')}
                                                                </p>
                                                            </div>
                                                            {!notif.read && (
                                                                <div className="w-2 h-2 bg-blue-500 rounded-full ml-2 mt-1"></div>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </>
                                        ) : (
                                            <div className="px-4 py-8 text-center text-gray-500">
                                                <Bell size={40} className="mx-auto mb-2 text-gray-300" />
                                                <p>Không có thông báo mới</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Footer Actions */}
                                    {notifications.length > 0 && (
                                        <div className="px-4 py-2 bg-gray-50 border-t flex justify-between">
                                            <button
                                                onClick={markAllAsRead}
                                                className="text-sm text-blue-600 hover:text-blue-800"
                                            >
                                                Đánh dấu đã đọc tất cả
                                            </button>
                                            <button
                                                onClick={clearNotifications}
                                                className="text-sm text-red-600 hover:text-red-800"
                                            >
                                                Xóa tất cả
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        
                        <div className="flex items-center gap-2">
                            <CircleUserRound size={28} className="text-gray-600" />
                            <span className="font-medium">{user?.name || 'Admin'}</span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;