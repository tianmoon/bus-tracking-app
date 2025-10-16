import {
  Home,
  Calendar,
  Users,
  AlertTriangle,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Bus,
} from "lucide-react";
import { DriverPageType } from "../DriverDashboard";

interface DriverSidebarProps {
  currentPage: DriverPageType;
  onPageChange: (page: DriverPageType) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const menuItems = [
  { id: "dashboard" as DriverPageType, label: "Dashboard", icon: Home },
  { id: "schedule" as DriverPageType, label: "Daily Schedule", icon: Calendar },
  { id: "students" as DriverPageType, label: "Student List", icon: Users },
  { id: "incident" as DriverPageType, label: "Incident Report", icon: AlertTriangle },
  { id: "messages" as DriverPageType, label: "Messages", icon: MessageSquare },
];

export function DriverSidebar({
  currentPage,
  onPageChange,
  collapsed,
  onToggleCollapse,
}: DriverSidebarProps) {
  return (
    <div
      className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      } z-40`}
    >
      {/* Logo/Title */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 bg-gradient-to-r from-green-100 to-green-200">
        {!collapsed && (
          <div>
            <h2 className="text-gray-900">SSB 1.0</h2>
            <p className="text-xs text-gray-600">Driver Dashboard</p>
          </div>
        )}
        {collapsed && (
          <div className="w-full flex justify-center">
            <Bus className="w-6 h-6 text-green-600" />
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
                  ? "bg-green-100 text-green-900"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="text-sm">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Driver Status */}
      {!collapsed && (
        <div className="absolute bottom-6 left-4 right-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm text-green-900">On Duty</span>
            </div>
            <p className="text-xs text-gray-600">Bus #12 • Route A</p>
          </div>
        </div>
      )}
    </div>
  );
}
