import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { MapPin, Users, Clock, Plus } from "lucide-react";
import { Badge } from "../../ui/badge";

const mockRoutes = [
  {
    id: 1,
    name: "Route A",
    stops: 8,
    students: 32,
    duration: "45 min",
    assignedBus: "Bus #12",
    assignedDriver: "John Smith",
    status: "Active",
    color: "#3b82f6",
  },
  {
    id: 2,
    name: "Route B",
    stops: 6,
    students: 28,
    duration: "38 min",
    assignedBus: "Bus #7",
    assignedDriver: "Maria Garcia",
    status: "Active",
    color: "#10b981",
  },
  {
    id: 3,
    name: "Route C",
    stops: 10,
    students: 40,
    duration: "52 min",
    assignedBus: "Bus #23",
    assignedDriver: "Jennifer Taylor",
    status: "Active",
    color: "#f59e0b",
  },
  {
    id: 4,
    name: "Route D",
    stops: 7,
    students: 30,
    duration: "42 min",
    assignedBus: "Bus #18",
    assignedDriver: "Robert Wilson",
    status: "Active",
    color: "#8b5cf6",
  },
  {
    id: 5,
    name: "Route E",
    stops: 9,
    students: 35,
    duration: "48 min",
    assignedBus: "Bus #42",
    assignedDriver: "Sarah Johnson",
    status: "Active",
    color: "#ec4899",
  },
];

export function RoutesPage() {
  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Routes Management</h1>
          <p className="text-gray-600">Manage bus routes and stops</p>
        </div>
        <Button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900">
          <Plus className="w-4 h-4 mr-2" />
          Create Route
        </Button>
      </div>

      {/* Map and Routes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <Card className="lg:col-span-2 border-gray-200">
          <CardHeader>
            <CardTitle>Routes Map</CardTitle>
            <p className="text-sm text-gray-500">Visual representation of all routes</p>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 rounded-lg h-[500px] flex items-center justify-center relative overflow-hidden">
              {/* Mock Map */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
                {/* Map Grid */}
                <div className="absolute inset-0" style={{
                  backgroundImage: "linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)",
                  backgroundSize: "40px 40px"
                }}></div>
                
                {/* Route Lines */}
                {mockRoutes.map((route, index) => (
                  <div
                    key={route.id}
                    className="absolute rounded-full"
                    style={{
                      width: `${200 + index * 30}px`,
                      height: `${200 + index * 30}px`,
                      border: `3px solid ${route.color}`,
                      top: `${150 + index * 40}px`,
                      left: `${100 + index * 60}px`,
                      opacity: 0.6,
                    }}
                  ></div>
                ))}

                {/* Route Markers */}
                {mockRoutes.map((route, index) => (
                  <div
                    key={`marker-${route.id}`}
                    className="absolute flex items-center gap-2"
                    style={{
                      top: `${180 + index * 60}px`,
                      left: `${150 + index * 80}px`,
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white shadow-lg"
                      style={{ backgroundColor: route.color }}
                    >
                      <MapPin className="w-4 h-4" />
                    </div>
                    <span className="text-xs bg-white px-2 py-1 rounded shadow">
                      {route.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Routes List */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle>All Routes</CardTitle>
            <p className="text-sm text-gray-500">{mockRoutes.length} active routes</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockRoutes.map((route) => (
                <div
                  key={route.id}
                  className="p-4 border-2 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                  style={{ borderColor: route.color }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-gray-900">{route.name}</h4>
                    <Badge className="bg-green-100 text-green-800">
                      {route.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{route.stops} stops</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{route.students} students</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{route.duration}</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-500 mb-1">Assigned:</p>
                    <p className="text-sm text-gray-700">{route.assignedBus}</p>
                    <p className="text-sm text-gray-700">{route.assignedDriver}</p>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-3"
                  >
                    Reassign Driver/Bus
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
