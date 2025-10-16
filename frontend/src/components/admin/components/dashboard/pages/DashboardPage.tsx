import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Bus, Users, UserCircle, Route } from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const activityData = [
  { time: "06:00", buses: 5, alerts: 0 },
  { time: "07:00", buses: 25, alerts: 2 },
  { time: "08:00", buses: 42, alerts: 1 },
  { time: "09:00", buses: 38, alerts: 0 },
  { time: "10:00", buses: 15, alerts: 1 },
  { time: "11:00", buses: 12, alerts: 0 },
  { time: "12:00", buses: 20, alerts: 3 },
  { time: "13:00", buses: 35, alerts: 1 },
  { time: "14:00", buses: 40, alerts: 2 },
  { time: "15:00", buses: 45, alerts: 1 },
];

const statsCards = [
  {
    title: "Total Buses",
    value: "45",
    icon: Bus,
    color: "bg-blue-500",
    change: "+3 this month",
  },
  {
    title: "Active Drivers",
    value: "42",
    icon: UserCircle,
    color: "bg-green-500",
    change: "40 on duty now",
  },
  {
    title: "Total Students",
    value: "1,248",
    icon: Users,
    color: "bg-purple-500",
    change: "+15 new students",
  },
  {
    title: "Active Routes",
    value: "28",
    icon: Route,
    color: "bg-yellow-500",
    change: "All routes covered",
  },
];

export function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome to SSB 1.0 Admin Panel</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <h2 className="text-gray-900 mb-2">{stat.value}</h2>
                    <p className="text-xs text-gray-500">{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Real-time Activity Chart */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle>System Activity (Today)</CardTitle>
            <p className="text-sm text-gray-500">Real-time bus activity and alerts</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="time" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="buses"
                  stroke="#F8E473"
                  fill="#FEF9C3"
                  name="Active Buses"
                />
                <Area
                  type="monotone"
                  dataKey="alerts"
                  stroke="#ef4444"
                  fill="#fee2e2"
                  name="Alerts"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <p className="text-sm text-gray-500">Latest system events</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  time: "2 mins ago",
                  event: "Bus #12 completed Route A",
                  type: "success",
                },
                {
                  time: "5 mins ago",
                  event: "Driver John Smith started shift",
                  type: "info",
                },
                {
                  time: "12 mins ago",
                  event: "Alert: Bus #7 delayed 10 minutes",
                  type: "warning",
                },
                {
                  time: "15 mins ago",
                  event: "New student enrolled: Sarah Johnson",
                  type: "info",
                },
                {
                  time: "28 mins ago",
                  event: "Bus #15 completed Route C",
                  type: "success",
                },
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      activity.type === "success"
                        ? "bg-green-500"
                        : activity.type === "warning"
                        ? "bg-orange-500"
                        : "bg-blue-500"
                    }`}
                  ></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.event}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
