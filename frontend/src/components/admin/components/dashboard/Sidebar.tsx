import {
  Home,
  GraduationCap,
  UserCircle,
  Bus,
  Map,
  Calendar,
  MapPin,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { PageType } from "../AdminDashboard";

interface SidebarProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const menuItems = [
  { id: "dashboard" as PageType, label: "Dashboard", icon: Home },
  { id: "students" as PageType, label: "Students", icon: GraduationCap },
  { id: "drivers" as PageType, label: "Drivers", icon: UserCircle },
  { id: "buses" as PageType, label: "Buses", icon: Bus },
  { id: "routes" as PageType, label: "Routes", icon: Map },
  { id: "schedule" as PageType, label: "Schedule", icon: Calendar },
  { id: "gps" as PageType, label: "GPS Tracking", icon: MapPin },
  { id: "alerts" as PageType, label: "Alerts & Messages", icon: MessageSquare },
];

export function Sidebar({
  currentPage,
  onPageChange,
  collapsed,
  onToggleCollapse,
}: SidebarProps) {
  return (
    <div
      className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      } z-40`}
    >
      {/* Logo/Title */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 bg-gradient-to-r from-yellow-100 to-yellow-200">
        {!collapsed && (
          <div>
            <h2 className="text-gray-900">SSB 1.0</h2>
            <p className="text-xs text-gray-600">Admin Dashboard</p>
          </div>
        )}
        {collapsed && (
          <div className="w-full flex justify-center">
            <Bus className="w-6 h-6 text-yellow-600" />
          </div>
        )}
      </div>

      {/* Toggle Button */}
      <button
        onClick={onToggleCollapse}
        className="absolute -right-3 top-20 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4 text-gray-600" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        )}
      </button>

      {/* Navigation Items */}
      <nav className="mt-4 px-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-all ${
                isActive
                  ? "bg-yellow-100 text-yellow-900"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="text-sm">{item.label}</span>}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
