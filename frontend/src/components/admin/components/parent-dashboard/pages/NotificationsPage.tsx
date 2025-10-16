import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import {
  Bell,
  CheckCircle,
  Clock,
  AlertCircle,
  Info,
  Trash2,
  Settings,
} from "lucide-react";
import { Badge } from "../../ui/badge";
import { Switch } from "../../ui/switch";
import { Label } from "../../ui/label";

const notifications = [
  {
    id: 1,
    type: "arrival",
    title: "Bus Arriving Soon",
    message: "Bus #12 will arrive at your stop in 5 minutes",
    time: "Just now",
    read: false,
    icon: Bell,
    color: "yellow",
  },
  {
    id: 2,
    type: "info",
    title: "Trip Started",
    message: "Morning route has started. Driver John Smith is on duty.",
    time: "5 mins ago",
    read: false,
    icon: Info,
    color: "blue",
  },
  {
    id: 3,
    type: "success",
    title: "Child Picked Up",
    message: "Emily was picked up at Main Street & 1st Ave",
    time: "Yesterday 7:16 AM",
    read: true,
    icon: CheckCircle,
    color: "green",
  },
  {
    id: 4,
    type: "success",
    title: "Child Dropped Off",
    message: "Emily was safely dropped off at home",
    time: "Yesterday 3:15 PM",
    read: true,
    icon: CheckCircle,
    color: "green",
  },
  {
    id: 5,
    type: "delay",
    title: "Bus Delayed",
    message: "Bus #12 is running 10 minutes late due to traffic",
    time: "2 days ago",
    read: true,
    icon: Clock,
    color: "orange",
  },
  {
    id: 6,
    type: "alert",
    title: "Route Change Notice",
    message: "Temporary route modification for Oct 15 due to road work",
    time: "3 days ago",
    read: true,
    icon: AlertCircle,
    color: "red",
  },
  {
    id: 7,
    type: "success",
    title: "Child Picked Up",
    message: "Emily was picked up at Main Street & 1st Ave",
    time: "3 days ago",
    read: true,
    icon: CheckCircle,
    color: "green",
  },
  {
    id: 8,
    type: "info",
    title: "Schedule Updated",
    message: "Your child's bus schedule has been updated",
    time: "1 week ago",
    read: true,
    icon: Info,
    color: "blue",
  },
];

const colorClasses = {
  yellow: {
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    icon: "text-yellow-600",
  },
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    icon: "text-blue-600",
  },
  green: {
    bg: "bg-green-50",
    border: "border-green-200",
    icon: "text-green-600",
  },
  orange: {
    bg: "bg-orange-50",
    border: "border-orange-200",
    icon: "text-orange-600",
  },
  red: {
    bg: "bg-red-50",
    border: "border-red-200",
    icon: "text-red-600",
  },
};

export function NotificationsPage() {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Notifications</h1>
          <p className="text-gray-600">
            System alerts and updates ({unreadCount} unread)
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button variant="outline">Mark All as Read</Button>
        </div>
      </div>

      {/* Notification Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600 mb-1">Total Notifications</p>
            <h3 className="text-gray-900">{notifications.length}</h3>
          </CardContent>
        </Card>
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600 mb-1">Unread</p>
            <h3 className="text-yellow-900">{unreadCount}</h3>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600 mb-1">This Week</p>
            <h3 className="text-gray-900">12</h3>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600 mb-1">This Month</p>
            <h3 className="text-gray-900">45</h3>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notifications List */}
        <Card className="lg:col-span-2 border-gray-200">
          <CardHeader>
            <CardTitle>All Notifications</CardTitle>
            <p className="text-sm text-gray-500">Recent system alerts and updates</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {notifications.map((notification) => {
                const Icon = notification.icon;
                const colors = colorClasses[notification.color as keyof typeof colorClasses];

                return (
                  <div
                    key={notification.id}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      notification.read
                        ? "border-gray-200 bg-white"
                        : `${colors.border} ${colors.bg}`
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          notification.read ? "bg-gray-100" : colors.bg
                        }`}
                      >
                        <Icon
                          className={`w-5 h-5 ${
                            notification.read ? "text-gray-400" : colors.icon
                          }`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <h4
                            className={`${
                              notification.read ? "text-gray-600" : "text-gray-900"
                            }`}
                          >
                            {notification.title}
                          </h4>
                          {!notification.read && (
                            <Badge className="bg-red-500 text-white text-xs ml-2">
                              New
                            </Badge>
                          )}
                        </div>
                        <p
                          className={`text-sm mb-2 ${
                            notification.read ? "text-gray-500" : "text-gray-700"
                          }`}
                        >
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-gray-500">{notification.time}</p>
                          <div className="flex gap-2">
                            {!notification.read && (
                              <Button variant="ghost" size="sm" className="h-7 text-xs">
                                Mark as Read
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <div className="space-y-6">
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <p className="text-sm text-gray-500">Manage what alerts you receive</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="bus-arrival" className="flex-1">
                    <p className="text-sm text-gray-900">Bus Arrival Alerts</p>
                    <p className="text-xs text-gray-500">
                      Notify when bus is approaching
                    </p>
                  </Label>
                  <Switch id="bus-arrival" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="pickup-confirm" className="flex-1">
                    <p className="text-sm text-gray-900">Pickup Confirmations</p>
                    <p className="text-xs text-gray-500">
                      When child boards the bus
                    </p>
                  </Label>
                  <Switch id="pickup-confirm" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="dropoff-confirm" className="flex-1">
                    <p className="text-sm text-gray-900">Drop-off Confirmations</p>
                    <p className="text-xs text-gray-500">
                      When child is dropped off
                    </p>
                  </Label>
                  <Switch id="dropoff-confirm" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="delay-alerts" className="flex-1">
                    <p className="text-sm text-gray-900">Delay Alerts</p>
                    <p className="text-xs text-gray-500">
                      When bus is running late
                    </p>
                  </Label>
                  <Switch id="delay-alerts" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="route-changes" className="flex-1">
                    <p className="text-sm text-gray-900">Route Changes</p>
                    <p className="text-xs text-gray-500">
                      Schedule or route updates
                    </p>
                  </Label>
                  <Switch id="route-changes" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="emergency" className="flex-1">
                    <p className="text-sm text-gray-900">Emergency Alerts</p>
                    <p className="text-xs text-gray-500">Critical notifications</p>
                  </Label>
                  <Switch id="emergency" defaultChecked disabled />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle>Notification Methods</CardTitle>
              <p className="text-sm text-gray-500">How you receive alerts</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="push" className="flex-1">
                    <p className="text-sm text-gray-900">Push Notifications</p>
                    <p className="text-xs text-gray-500">In-app alerts</p>
                  </Label>
                  <Switch id="push" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="email" className="flex-1">
                    <p className="text-sm text-gray-900">Email</p>
                    <p className="text-xs text-gray-500">sarah.j@email.com</p>
                  </Label>
                  <Switch id="email" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="sms" className="flex-1">
                    <p className="text-sm text-gray-900">SMS</p>
                    <p className="text-xs text-gray-500">(555) 123-4567</p>
                  </Label>
                  <Switch id="sms" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm text-gray-900 mb-1">Quick Tip</h4>
                  <p className="text-xs text-gray-700">
                    Enable all notification types to stay fully informed about your
                    child's journey. You can always adjust these settings later.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
