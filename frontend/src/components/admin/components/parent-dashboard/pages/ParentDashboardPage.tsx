import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import {
  Bus,
  Clock,
  MapPin,
  Phone,
  User,
  Navigation,
  CheckCircle,
  AlertCircle,
  Bell,
} from "lucide-react";
import { Badge } from "../../ui/badge";
import { Avatar, AvatarFallback } from "../../ui/avatar";

export function ParentDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Track your child's school bus in real-time</p>
      </div>

      {/* Bus Status Card */}
      <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-white">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                <Bus className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-gray-900 mb-1">Bus #12 - Route A</h2>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-500 text-white">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    On Time
                  </Badge>
                  <span className="text-sm text-gray-600">Morning Trip</span>
                </div>
              </div>
            </div>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
              <Navigation className="w-4 h-4 mr-2" />
              Track Live
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Pickup Time</p>
                  <p className="text-gray-900">7:15 AM</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Navigation className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">ETA to Stop</p>
                  <p className="text-gray-900">5 minutes</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Current Location</p>
                  <p className="text-gray-900">Oak Park</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Route */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle>Today's Route</CardTitle>
            <p className="text-sm text-gray-500">Morning pickup details</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Pickup Stop */}
              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-white">
                      1
                    </div>
                    <div>
                      <h4 className="text-gray-900">Your Pickup Stop</h4>
                      <p className="text-sm text-gray-600">Main Street & 1st Ave</p>
                    </div>
                  </div>
                  <Badge className="bg-yellow-500 text-white">Next Stop</Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    7:15 AM
                  </span>
                  <span className="flex items-center gap-1">
                    <Navigation className="w-4 h-4" />
                    ETA: 5 min
                  </span>
                </div>
              </div>

              {/* Other Stops */}
              {[
                { stop: 2, location: "Oak Park", time: "7:22 AM", students: 2 },
                { stop: 3, location: "Downtown Station", time: "7:30 AM", students: 4 },
                { stop: 4, location: "City Hall", time: "7:38 AM", students: 2 },
                { stop: 5, location: "School Gate", time: "7:45 AM", students: 0 },
              ].map((stop) => (
                <div
                  key={stop.stop}
                  className="bg-white border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600">
                        {stop.stop}
                      </div>
                      <div>
                        <h4 className="text-gray-900">{stop.location}</h4>
                        <p className="text-sm text-gray-600">{stop.time}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Driver Info & Recent Notifications */}
        <div className="space-y-6">
          {/* Driver Contact */}
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle>Driver Information</CardTitle>
              <p className="text-sm text-gray-500">Contact details for today's trip</p>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="w-16 h-16">
                  <AvatarFallback className="bg-blue-200 text-blue-900 text-xl">
                    JS
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-gray-900 mb-1">John Smith</h3>
                  <p className="text-sm text-gray-600">Driver #1245</p>
                  <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200 mt-1">
                    On Duty
                  </Badge>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="text-gray-900">(555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Bus className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Bus Number</p>
                    <p className="text-gray-900">Bus #12</p>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full mt-4">
                Send Message
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <p className="text-sm text-gray-500">Latest updates</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    time: "2 mins ago",
                    event: "Bus started morning route",
                    type: "info",
                  },
                  {
                    time: "5 mins ago",
                    event: "Driver John Smith checked in",
                    type: "success",
                  },
                  {
                    time: "Yesterday 3:15 PM",
                    event: "Emily dropped off at home",
                    type: "success",
                  },
                  {
                    time: "Yesterday 3:10 PM",
                    event: "Bus arrived at your stop",
                    type: "info",
                  },
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0"
                  >
                    <div
                      className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                        activity.type === "success"
                          ? "bg-green-500"
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

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-blue-200 bg-blue-50 cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <Navigation className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-gray-900">Track Bus</h3>
                <p className="text-sm text-gray-600">View live location</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50 cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-gray-900">Notifications</h3>
                <p className="text-sm text-gray-600">3 new alerts</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50 cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-gray-900">My Child</h3>
                <p className="text-sm text-gray-600">View profile</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
