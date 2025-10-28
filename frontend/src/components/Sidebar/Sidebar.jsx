import { Settings, Bell, BarChart3, Users, User, Bus, Route, Calendar, MessageSquare, AlertTriangle, Map } from 'lucide-react';
import { NavLink } from 'react-router-dom';
function Sidebar(props) {

  const menuItems = {
    admin: [
      { icon: BarChart3, label: 'Tổng quan', path: '/admin/dashboard' },
      { icon: Users, label: 'Học sinh', path: '/admin/students' },
      { icon: User, label: 'Tài xế', path: '/admin/drivers' },
      { icon: Bus, label: 'Xe buýt', path: '/admin/buses' },
      { icon: Route, label: 'Tuyến đường', path: '/admin/routes' },
      { icon: Calendar, label: 'Lịch trình', path: '/admin/schedules' },
      { icon: MessageSquare, label: 'Tin nhắn', path: '/admin/messages' },
      { icon: AlertTriangle, label: 'Cảnh báo', path: '/admin/alerts' },
      { icon: Map, label: 'Bản đồ theo dõi', path: '/admin/tracking' },
    ],

    parent: [
      { icon: Calendar, label: 'Lịch trình con', path: '/parent/child-info' },
      { icon: Map, label: 'Vị trí xe', path: '/parent/map' },
      { icon: MessageSquare, label: 'Tin nhắn', path: '/parent/messages' },
      { icon: AlertTriangle, label: 'Cảnh báo', path: '/parent/alerts' },
      { icon: Settings, label: 'Cài đặt', path: '/parent/settings' },
    ],

    driver: [
      { icon: Route, label: 'Tuyến của tôi', path: '/driver/routes' },
      { icon: Calendar, label: 'Ca làm việc', path: '/driver/schedule' },
      { icon: MessageSquare, label: 'Báo cáo', path: '/driver/reports' },
      { icon: AlertTriangle, label: 'Sự cố', path: '/driver/issues' },
      { icon: Users, label: 'Học sinh', path: '/driver/students' },
    ],
  };

  // Lấy menu tương ứng với role
  const currentMenu = menuItems[props.userRole] || menuItems.admin;

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-4 border-b">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center mr-3">
            <Bus className="text-white" size={24} />
          </div>
          <div>
            <div className="font-bold text-lg">SchoolBus Pro</div>
            <div className="text-xs text-gray-500">Hệ thống quản lý</div>
          </div>
        </div>
      </div>

      <nav className="p-3">
        {currentMenu.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `w-full flex items-center px-4 py-3 mb-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <item.icon size={20} className="mr-3" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;
