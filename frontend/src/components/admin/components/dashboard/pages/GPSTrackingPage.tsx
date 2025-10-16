import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { MapPin, Navigation, Clock, AlertCircle } from "lucide-react";
import { Badge } from "../../ui/badge";

const mockBusLocations = [
  {
    id: 1,
    busId: "Bus #12",
    route: "Route A",
    driver: "John Smith",
    status: "On Time",
    position: { top: "20%", left: "30%" },
    currentStop: "Main Street",
    nextStop: "Oak Park",
    eta: "5 mins",
    students: 32,
  },
  {
    id: 2,
    busId: "Bus #7",
    route: "Route B",
    driver: "Maria Garcia",
    status: "On Time",
    position: { top: "50%", left: "60%" },
    currentStop: "Downtown",
    nextStop: "City Hall",
    eta: "3 mins",
    students: 28,
  },
  {
    id: 3,
    busId: "Bus #23",
    route: "Route C",
    driver: "Jennifer Taylor",
    status: "Delayed",
    position: { top: "70%", left: "40%" },
    currentStop: "Elm Street",
    nextStop: "Central Square",
    eta: "8 mins",
    students: 40,
  },
  {
    id: 4,
    busId: "Bus #18",
    route: "Route D",
    driver: "Robert Wilson",
    status: "On Time",
    position: { top: "35%", left: "75%" },
    currentStop: "Riverside",
    nextStop: "Park Avenue",
    eta: "4 mins",
    students: 30,
  },
  {
    id: 5,
    busId: "Bus #42",
    route: "Route E",
    driver: "Sarah Johnson",
    status: "On Time",
    position: { top: "60%", left: "20%" },
    currentStop: "Highway 101",
    nextStop: "School Gate",
    eta: "6 mins",
    students: 35,
  },
];

export function GPSTrackingPage() {
  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-gray-900">Live GPS Tracking</h1>
        <p className="text-gray-600">Real-time bus location monitoring</p>
      </div>

      {/* Tracking Map and List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <Card className="lg:col-span-2 border-gray-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Live Map</CardTitle>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm text-gray-600">On Time</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-sm text-gray-600">Delayed</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 rounded-lg h-[600px] relative overflow-hidden">
              {/* Mock Map Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-green-50 to-yellow-50">
                {/* Map Grid */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)",
                    backgroundSize: "30px 30px",
                  }}
                ></div>

                {/* Streets */}
                <div className="absolute top-1/4 left-0 right-0 h-1 bg-gray-300"></div>
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300"></div>
                <div className="absolute top-3/4 left-0 right-0 h-1 bg-gray-300"></div>
                <div className="absolute left-1/4 top-0 bottom-0 w-1 bg-gray-300"></div>
                <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-300"></div>
                <div className="absolute left-3/4 top-0 bottom-0 w-1 bg-gray-300"></div>

                {/* Buses */}
                {mockBusLocations.map((bus) => (
                  <div
                    key={bus.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                    style={bus.position}
                  >
                    {/* Bus Icon */}
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
                        bus.status === "On Time"
                          ? "bg-green-500 animate-pulse"
                          : "bg-red-500 animate-pulse"
                      }`}
                    >
                      <Navigation className="w-6 h-6 text-white" />
                    </div>

                    {/* Bus Info Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                      <div className="bg-white rounded-lg shadow-xl p-3 w-48 border-2 border-gray-200">
                        <h4 className="text-gray-900 mb-1">{bus.busId}</h4>
                        <p className="text-xs text-gray-600 mb-2">{bus.route}</p>
                        <div className="space-y-1 text-xs">
                          <p className="text-gray-700">Driver: {bus.driver}</p>
                          <p className="text-gray-700">Current: {bus.currentStop}</p>
                          <p className="text-gray-700">
                            Next: {bus.nextStop} ({bus.eta})
                          </p>
                          <Badge
                            className={
                              bus.status === "On Time"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }
                          >
                            {bus.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bus Status List */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle>Active Buses</CardTitle>
            <p className="text-sm text-gray-500">{mockBusLocations.length} buses tracked</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockBusLocations.map((bus) => (
                <div
                  key={bus.id}
                  className="p-4 border-2 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-gray-900">{bus.busId}</h4>
                      <p className="text-sm text-gray-600">{bus.route}</p>
                    </div>
                    <Badge
                      className={
                        bus.status === "On Time"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }
                    >
                      {bus.status}
                    </Badge>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{bus.currentStop}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Navigation className="w-4 h-4" />
                      <span>Next: {bus.nextStop}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>ETA: {bus.eta}</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-500">
                      {bus.students} students • {bus.driver}
                    </p>
                  </div>

                  {bus.status === "Delayed" && (
                    <div className="mt-2 flex items-center gap-2 text-orange-600 bg-orange-50 p-2 rounded">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-xs">Traffic delay reported</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
