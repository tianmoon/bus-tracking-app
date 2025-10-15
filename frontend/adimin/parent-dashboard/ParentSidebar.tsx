import {
  Home,
  Baby,
  MapPin,
  Bell,
  ChevronLeft,
  ChevronRight,
  Bus,
} from "lucide-react";
import { ParentPageType } from "../ParentDashboard";

interface ParentSidebarProps {
  currentPage: ParentPageType;
  onPageChange: (page: ParentPageType) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const menuItems = [
  { id: "dashboard" as ParentPageType, label: "Dashboard", icon: Home },
  { id: "child" as ParentPageType, label: "My Child", icon: Baby },
  { id: "location" as ParentPageType, label: "Bus Location", icon: MapPin },
  { id: "notifications" as ParentPageType, label: "Notifications", icon: Bell },
];

export function ParentSidebar({
  currentPage,
  onPageChange,
  collapsed,
  onToggleCollapse,
}: ParentSidebarProps) {
  return (
    <div
      className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      } z-40`}
    >
      {/* Logo/Title */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 bg-gradient-to-r from-purple-100 to-purple-200">
        {!collapsed && (
          <div>
            <h2 className="text-gray-900">SSB 1.0</h2>
            <p className="text-xs text-gray-600">Parent Dashboard</p>
          </div>
        )}
        {collapsed && (
          <div className="w-full flex justify-center">
            <Bus className="w-6 h-6 text-purple-600" />
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
                  ? "bg-purple-100 text-purple-900"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="text-sm">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Child Info */}
      {!collapsed && (
        <div className="absolute bottom-6 left-4 right-4">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center">
                <Baby className="w-4 h-4 text-purple-900" />
              </div>
              <div>
                <p className="text-sm text-purple-900">Emily Johnson</p>
                <p className="text-xs text-gray-600">Grade 5</p>
              </div>
            </div>
            <div className="pt-2 border-t border-purple-200">
              <p className="text-xs text-gray-600">Route A • Bus #12</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
