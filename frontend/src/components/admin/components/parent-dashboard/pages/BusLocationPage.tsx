import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import {
  Navigation,
  MapPin,
  Clock,
  User,
  Phone,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { Badge } from "../../ui/badge";
import { Avatar, AvatarFallback } from "../../ui/avatar";

const upcomingStops = [
  {
    id: 1,
    location: "Main Street & 1st Ave",
    time: "7:15 AM",
    eta: "5 min",
    status: "next",
    yourStop: true,
  },
  {
    id: 2,
    location: "Oak Park",
    time: "7:22 AM",
    eta: "12 min",
    status: "upcoming",
    yourStop: false,
  },
  {
    id: 3,
    location: "Downtown Station",
    time: "7:30 AM",
    eta: "20 min",
    status: "upcoming",
    yourStop: false,
  },
  {
    id: 4,
    location: "School Gate",
    time: "7:45 AM",
    eta: "35 min",
    status: "upcoming",
    yourStop: false,
  },
];

export function BusLocationPage() {
  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-gray-900">Bus Location</h1>
        <p className="text-gray-600">Track Bus #12 in real-time</p>
      </div>

      {/* Live Status Banner */}
      <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                <Navigation className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-gray-900 mb-1">Bus is on the way!</h2>
                <div className="flex items-center gap-3">
                  <Badge className="bg-green-500 text-white">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    On Time
                  </Badge>
                  <span className="text-sm text-gray-600">
                    ETA to your stop: <strong className="text-green-600">5 minutes</strong>
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 mb-1">Current Location</p>
              <p className="text-gray-900">Approaching Oak Park</p>
              <p className="text-xs text-gray-500">Last updated: Just now</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Map and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Map */}
        <Card className="lg:col-span-2 border-gray-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Live Map Tracking</CardTitle>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">Live</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 rounded-lg h-[600px] relative overflow-hidden">
              {/* Mock Map Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-green-50 to-yellow-50">
                {/* Grid */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)",
                    backgroundSize: "30px 30px",
                  }}
                ></div>

                {/* Route Path */}
                <svg className="absolute inset-0 w-full h-full">
                  <path
                    d="M 100 100 L 200 150 L 300 200 L 400 300 L 500 400"
                    stroke="#3b82f6"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray="8,8"
                  />
                </svg>

                {/* Bus Current Position */}
                <div className="absolute top-[20%] left-[25%] transform -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="relative">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                      <Navigation className="w-8 h-8 text-white" />
                    </div>
                    {/* Pulse Animation */}
                    <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-25"></div>
                    {/* Info Label */}
                    <div className="absolute top-full mt-3 left-1/2 transform -translate-x-1/2 bg-white px-3 py-2 rounded-lg shadow-lg border-2 border-green-500 whitespace-nowrap">
                      <p className="text-sm text-gray-900">Bus #12</p>
                      <p className="text-xs text-gray-600">Speed: 25 mph</p>
                    </div>
                  </div>
                </div>

                {/* Your Stop - Highlighted */}
                <div className="absolute top-[35%] left-[45%] transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center shadow-xl border-4 border-white">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-yellow-100 border-2 border-yellow-500 px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
                      <p className="text-sm text-gray-900">Your Stop</p>
                      <p className="text-xs text-gray-600">Main St & 1st Ave</p>
                    </div>
                  </div>
                </div>

                {/* Other Stops */}
                {[
                  { top: "50%", left: "60%", label: "Oak Park" },
                  { top: "65%", left: "75%", label: "Downtown" },
                  { top: "80%", left: "85%", label: "School" },
                ].map((stop, index) => (
                  <div
                    key={index}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{ top: stop.top, left: stop.left }}
                  >
                    <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center shadow-md">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">Bus Location</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-600">Your Stop</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
                  <span className="text-gray-600">Other Stops</span>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Center Map
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Driver Info */}
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle>Driver</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-4">
                <Avatar>
                  <AvatarFallback className="bg-blue-200 text-blue-900">
                    JS
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-gray-900">John Smith</h4>
                  <p className="text-sm text-gray-600">Driver #1245</p>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                <Phone className="w-4 h-4 mr-2" />
                Call Driver
              </Button>
            </CardContent>
          </Card>

          {/* Next Stop Alert */}
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-gray-900 mb-1">Get Ready!</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Bus will arrive at your stop in approximately 5 minutes.
                  </p>
                  <p className="text-xs text-gray-600">
                    We'll send you a notification when the bus is 2 minutes away.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Stops */}
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle>Upcoming Stops</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingStops.map((stop) => (
                  <div
                    key={stop.id}
                    className={`p-3 border-2 rounded-lg ${
                      stop.yourStop
                        ? "border-yellow-300 bg-yellow-50"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-sm text-gray-900">{stop.location}</h4>
                      {stop.yourStop && (
                        <Badge className="bg-yellow-500 text-white text-xs">
                          Your Stop
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {stop.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Navigation className="w-3 h-3" />
                        ETA: {stop.eta}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Trip Stats */}
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle>Trip Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Distance</span>
                  <span className="text-sm text-gray-900">8.5 miles</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Est. Duration</span>
                  <span className="text-sm text-gray-900">45 minutes</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Students Onboard</span>
                  <span className="text-sm text-gray-900">11 / 32</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Stops Remaining</span>
                  <span className="text-sm text-gray-900">4 stops</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
