import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import {
  MapPin,
  Clock,
  Navigation,
  Users,
  CheckCircle,
  PlayCircle,
  StopCircle,
} from "lucide-react";
import { Badge } from "../../ui/badge";
import { Progress } from "../../ui/progress";

const upcomingStops = [
  {
    id: 1,
    location: "Main Street & 1st Ave",
    time: "7:15 AM",
    students: 3,
    status: "next",
  },
  {
    id: 2,
    location: "Oak Park",
    time: "7:22 AM",
    students: 2,
    status: "upcoming",
  },
  {
    id: 3,
    location: "Downtown Station",
    time: "7:30 AM",
    students: 4,
    status: "upcoming",
  },
  {
    id: 4,
    location: "City Hall",
    time: "7:38 AM",
    students: 2,
    status: "upcoming",
  },
  {
    id: 5,
    location: "School Gate",
    time: "7:45 AM",
    students: 0,
    status: "upcoming",
  },
];

export function DriverDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Today's route overview</p>
      </div>

      {/* Trip Control */}
      <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-gray-900 mb-2">Route A - Morning Trip</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Stops</p>
                    <p className="text-gray-900">8 stops</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Students</p>
                    <p className="text-gray-900">11 / 32</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Est. Completion</p>
                    <p className="text-gray-900">7:45 AM</p>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Trip Progress</span>
                  <span className="text-sm text-gray-900">3 of 8 stops</span>
                </div>
                <Progress value={37.5} className="h-2" />
              </div>
            </div>

            <div className="flex flex-col gap-3 ml-6">
              <Button className="bg-green-500 hover:bg-green-600 text-white">
                <PlayCircle className="w-5 h-5 mr-2" />
                Start Trip
              </Button>
              <Button variant="outline" className="border-red-500 text-red-600 hover:bg-red-50">
                <StopCircle className="w-5 h-5 mr-2" />
                End Trip
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Stop and Map */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Next Stop */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Navigation className="w-5 h-5 text-green-600" />
              Next Stop
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6 mb-4">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-gray-900 mb-2">Main Street & 1st Ave</h3>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">Expected: 7:15 AM</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">3 students waiting</span>
                  </div>
                </div>
                <Badge className="bg-green-500 text-white">
                  ETA: 5 min
                </Badge>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-gray-700 mb-3">Students at this stop:</p>
                <div className="space-y-2">
                  {["Emily Johnson", "Michael Chen", "Sarah Williams"].map((name, index) => (
                    <div key={index} className="flex items-center justify-between bg-white rounded p-2">
                      <span className="text-sm text-gray-900">{name}</span>
                      <Badge variant="outline" className="text-xs">Grade 5</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button className="flex-1 bg-green-500 hover:bg-green-600 text-white">
                <CheckCircle className="w-4 h-4 mr-2" />
                Mark Arrived
              </Button>
              <Button variant="outline" className="flex-1">
                Skip Stop
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Map Preview */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle>Route Map</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 rounded-lg h-[400px] relative overflow-hidden">
              {/* Mock Map */}
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

                {/* Route Line */}
                <svg className="absolute inset-0 w-full h-full">
                  <path
                    d="M 50 50 Q 150 100, 250 150 T 450 300"
                    stroke="#22c55e"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray="8,8"
                  />
                </svg>

                {/* Current Position */}
                <div className="absolute top-[15%] left-[15%] transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    <Navigation className="w-6 h-6 text-white" />
                  </div>
                  <p className="absolute top-full mt-2 text-xs bg-white px-2 py-1 rounded shadow whitespace-nowrap">
                    Your Location
                  </p>
                </div>

                {/* Stops */}
                {[
                  { top: "25%", left: "35%", completed: true },
                  { top: "40%", left: "55%", completed: true },
                  { top: "55%", left: "65%", completed: false },
                  { top: "70%", left: "75%", completed: false },
                ].map((stop, index) => (
                  <div
                    key={index}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{ top: stop.top, left: stop.left }}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md ${
                        stop.completed ? "bg-gray-400" : "bg-yellow-500"
                      }`}
                    >
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Stops */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>Upcoming Stops</CardTitle>
          <p className="text-sm text-gray-500">Remaining stops on today's route</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingStops.map((stop, index) => (
              <div
                key={stop.id}
                className={`p-4 border-2 rounded-lg flex items-center justify-between ${
                  stop.status === "next"
                    ? "border-green-300 bg-green-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      stop.status === "next"
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="text-gray-900">{stop.location}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {stop.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {stop.students} students
                      </span>
                    </div>
                  </div>
                </div>
                {stop.status === "next" && (
                  <Badge className="bg-green-500 text-white">Next Stop</Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
