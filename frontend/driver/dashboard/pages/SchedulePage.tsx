import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { Badge } from "../../ui/badge";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const mockSchedule = [
  {
    day: "Mon",
    date: 13,
    routes: [
      { time: "07:00", route: "Route A", driver: "John Smith", bus: "Bus #12" },
      { time: "07:15", route: "Route B", driver: "Maria Garcia", bus: "Bus #7" },
      { time: "07:30", route: "Route C", driver: "Jennifer Taylor", bus: "Bus #23" },
    ],
  },
  {
    day: "Tue",
    date: 14,
    routes: [
      { time: "07:00", route: "Route A", driver: "John Smith", bus: "Bus #12" },
      { time: "07:15", route: "Route B", driver: "Maria Garcia", bus: "Bus #7" },
      { time: "07:30", route: "Route D", driver: "Robert Wilson", bus: "Bus #18" },
    ],
  },
  {
    day: "Wed",
    date: 15,
    routes: [
      { time: "07:00", route: "Route A", driver: "John Smith", bus: "Bus #12" },
      { time: "07:15", route: "Route B", driver: "Maria Garcia", bus: "Bus #7" },
      { time: "07:30", route: "Route E", driver: "Sarah Johnson", bus: "Bus #42" },
    ],
  },
  {
    day: "Thu",
    date: 16,
    routes: [
      { time: "07:00", route: "Route A", driver: "John Smith", bus: "Bus #12" },
      { time: "07:15", route: "Route B", driver: "Maria Garcia", bus: "Bus #7" },
      { time: "07:30", route: "Route C", driver: "Jennifer Taylor", bus: "Bus #23" },
    ],
  },
  {
    day: "Fri",
    date: 17,
    routes: [
      { time: "07:00", route: "Route A", driver: "John Smith", bus: "Bus #12" },
      { time: "07:15", route: "Route B", driver: "Maria Garcia", bus: "Bus #7" },
      { time: "07:30", route: "Route D", driver: "Robert Wilson", bus: "Bus #18" },
    ],
  },
  {
    day: "Sat",
    date: 18,
    routes: [],
  },
  {
    day: "Sun",
    date: 19,
    routes: [],
  },
];

export function SchedulePage() {
  const [view, setView] = useState<"week" | "month">("week");

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Schedule Management</h1>
          <p className="text-gray-600">Manage weekly and monthly schedules</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={view === "week" ? "default" : "outline"}
            onClick={() => setView("week")}
            className={view === "week" ? "bg-yellow-500 hover:bg-yellow-600 text-gray-900" : ""}
          >
            Week
          </Button>
          <Button
            variant={view === "month" ? "default" : "outline"}
            onClick={() => setView("month")}
            className={view === "month" ? "bg-yellow-500 hover:bg-yellow-600 text-gray-900" : ""}
          >
            Month
          </Button>
        </div>
      </div>

      {/* Calendar Controls */}
      <Card className="border-gray-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              October 2025 - Week 2
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                Today
              </Button>
              <Button variant="outline" size="sm">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Week View */}
          <div className="grid grid-cols-7 gap-4">
            {mockSchedule.map((day, index) => (
              <div
                key={index}
                className={`border-2 rounded-lg p-3 ${
                  day.date === 14
                    ? "border-yellow-400 bg-yellow-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                {/* Day Header */}
                <div className="mb-3 pb-2 border-b border-gray-200">
                  <p className="text-sm text-gray-600">{day.day}</p>
                  <h3 className="text-gray-900">{day.date}</h3>
                </div>

                {/* Routes for the day */}
                <div className="space-y-2">
                  {day.routes.length > 0 ? (
                    day.routes.map((route, routeIndex) => (
                      <div
                        key={routeIndex}
                        className="bg-white border border-gray-200 rounded p-2 hover:shadow-md transition-shadow cursor-pointer"
                      >
                        <p className="text-xs text-gray-600 mb-1">{route.time}</p>
                        <Badge
                          variant="outline"
                          className="bg-yellow-50 text-yellow-800 border-yellow-200 text-xs mb-1"
                        >
                          {route.route}
                        </Badge>
                        <p className="text-xs text-gray-700">{route.bus}</p>
                        <p className="text-xs text-gray-600">{route.driver}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gray-400 text-center py-4">No routes</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Schedule Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600 mb-1">This Week</p>
            <h3 className="text-gray-900">105 Trips</h3>
            <p className="text-xs text-green-600 mt-1">All scheduled</p>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600 mb-1">Active Days</p>
            <h3 className="text-gray-900">5 Days</h3>
            <p className="text-xs text-gray-500 mt-1">Mon - Fri</p>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600 mb-1">Drivers Scheduled</p>
            <h3 className="text-gray-900">8 Drivers</h3>
            <p className="text-xs text-gray-500 mt-1">Across all routes</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
