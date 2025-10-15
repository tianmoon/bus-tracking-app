import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Clock, MapPin, Users, CheckCircle, Circle } from "lucide-react";
import { Badge } from "../../ui/badge";

const todaySchedule = [
  {
    id: 1,
    tripName: "Morning Route A",
    startTime: "7:00 AM",
    endTime: "7:45 AM",
    route: "Route A",
    stops: 8,
    students: 32,
    status: "in-progress",
  },
  {
    id: 2,
    tripName: "School Arrival",
    startTime: "7:45 AM",
    endTime: "8:00 AM",
    route: "Route A",
    stops: 1,
    students: 32,
    status: "upcoming",
  },
  {
    id: 3,
    tripName: "Break",
    startTime: "8:00 AM",
    endTime: "2:30 PM",
    route: null,
    stops: 0,
    students: 0,
    status: "upcoming",
  },
  {
    id: 4,
    tripName: "Afternoon Route A",
    startTime: "2:30 PM",
    endTime: "3:15 PM",
    route: "Route A",
    stops: 8,
    students: 32,
    status: "upcoming",
  },
  {
    id: 5,
    tripName: "Return to Depot",
    startTime: "3:15 PM",
    endTime: "3:30 PM",
    route: null,
    stops: 1,
    students: 0,
    status: "upcoming",
  },
];

export function DriverSchedulePage() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-gray-100 text-gray-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Completed
          </Badge>
        );
      case "in-progress":
        return (
          <Badge className="bg-green-100 text-green-800">
            <Circle className="w-3 h-3 mr-1 fill-green-600" />
            In Progress
          </Badge>
        );
      case "upcoming":
        return <Badge variant="outline">Upcoming</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-gray-900">Daily Schedule</h1>
        <p className="text-gray-600">Today's trip schedule - Tuesday, October 14, 2025</p>
      </div>

      {/* Schedule Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600 mb-1">Total Trips</p>
            <h3 className="text-gray-900">5 trips</h3>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600 mb-1">Working Hours</p>
            <h3 className="text-gray-900">8.5 hours</h3>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600 mb-1">Total Students</p>
            <h3 className="text-gray-900">32 students</h3>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600 mb-1">Current Status</p>
            <h3 className="text-green-600">On Time</h3>
          </CardContent>
        </Card>
      </div>

      {/* Timeline */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>Today's Timeline</CardTitle>
          <p className="text-sm text-gray-500">All scheduled trips and activities</p>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>

            {/* Timeline Items */}
            <div className="space-y-6">
              {todaySchedule.map((trip, index) => (
                <div key={trip.id} className="relative pl-20">
                  {/* Time Marker */}
                  <div className="absolute left-0 top-0 flex items-center gap-3">
                    <div
                      className={`w-16 text-sm ${
                        trip.status === "in-progress"
                          ? "text-green-600"
                          : trip.status === "completed"
                          ? "text-gray-400"
                          : "text-gray-600"
                      }`}
                    >
                      {trip.startTime}
                    </div>
                    <div
                      className={`w-4 h-4 rounded-full border-2 ${
                        trip.status === "in-progress"
                          ? "bg-green-500 border-green-500"
                          : trip.status === "completed"
                          ? "bg-gray-400 border-gray-400"
                          : "bg-white border-gray-300"
                      }`}
                    ></div>
                  </div>

                  {/* Trip Card */}
                  <Card
                    className={`border-2 ${
                      trip.status === "in-progress"
                        ? "border-green-300 bg-green-50"
                        : "border-gray-200"
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-gray-900 mb-1">{trip.tripName}</h4>
                          <p className="text-sm text-gray-600">
                            {trip.startTime} - {trip.endTime}
                          </p>
                        </div>
                        {getStatusBadge(trip.status)}
                      </div>

                      {trip.route && (
                        <div className="grid grid-cols-3 gap-4 pt-3 border-t border-gray-200">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span>{trip.stops} stops</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Users className="w-4 h-4" />
                            <span>{trip.students} students</span>
                          </div>
                          <div>
                            <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200">
                              {trip.route}
                            </Badge>
                          </div>
                        </div>
                      )}

                      {!trip.route && (
                        <p className="text-sm text-gray-500 pt-3 border-t border-gray-200">
                          No active route
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="border-gray-200 bg-gradient-to-r from-green-50 to-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-900 mb-2">Need to make changes?</h3>
              <p className="text-sm text-gray-600">
                Contact admin if you need to report delays or schedule modifications
              </p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                View Full Schedule
              </button>
              <button className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition-colors">
                Contact Admin
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
