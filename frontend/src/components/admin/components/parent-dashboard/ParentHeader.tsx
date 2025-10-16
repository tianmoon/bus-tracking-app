import { Bell, User } from "lucide-react";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";

export function ParentHeader() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Welcome Message */}
        <div>
          <h3 className="text-gray-900">Good Morning, Sarah</h3>
          <p className="text-sm text-gray-500">Tuesday, October 14, 2025</p>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
              3
            </Badge>
          </button>

          {/* Profile */}
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="text-right">
              <p className="text-sm text-gray-900">Sarah Johnson</p>
              <p className="text-xs text-gray-500">Parent</p>
            </div>
            <Avatar>
              <AvatarFallback className="bg-purple-200 text-purple-900">
                <User className="w-5 h-5" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}
