import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Input } from "../../ui/input";
import { Plus, Edit, Trash2, Search, Signal } from "lucide-react";
import { Badge } from "../../ui/badge";

const mockBuses = [
  {
    id: 1,
    busId: "Bus #12",
    capacity: 45,
    route: "Route A",
    gpsStatus: "Online",
    currentLocation: "Main Street",
    driver: "John Smith",
  },
  {
    id: 2,
    busId: "Bus #7",
    capacity: 50,
    route: "Route B",
    gpsStatus: "Online",
    currentLocation: "Oak Park",
    driver: "Maria Garcia",
  },
  {
    id: 3,
    busId: "Bus #15",
    capacity: 42,
    route: null,
    gpsStatus: "Offline",
    currentLocation: "Depot",
    driver: null,
  },
  {
    id: 4,
    busId: "Bus #23",
    capacity: 48,
    route: "Route C",
    gpsStatus: "Online",
    currentLocation: "Downtown",
    driver: "Jennifer Taylor",
  },
  {
    id: 5,
    busId: "Bus #18",
    capacity: 45,
    route: "Route D",
    gpsStatus: "Online",
    currentLocation: "Riverside",
    driver: "Robert Wilson",
  },
  {
    id: 6,
    busId: "Bus #31",
    capacity: 40,
    route: null,
    gpsStatus: "Offline",
    currentLocation: "Depot",
    driver: null,
  },
  {
    id: 7,
    busId: "Bus #5",
    capacity: 52,
    route: "Route A",
    gpsStatus: "Online",
    currentLocation: "Central Park",
    driver: "Michael Brown",
  },
  {
    id: 8,
    busId: "Bus #42",
    capacity: 46,
    route: "Route E",
    gpsStatus: "Warning",
    currentLocation: "Highway 101",
    driver: "Sarah Johnson",
  },
];

export function BusesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBuses = mockBuses.filter(
    (bus) =>
      bus.busId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (bus.route && bus.route.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getGPSStatusColor = (status: string) => {
    switch (status) {
      case "Online":
        return "bg-green-100 text-green-800";
      case "Offline":
        return "bg-gray-100 text-gray-800";
      case "Warning":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Buses Management</h1>
          <p className="text-gray-600">Manage all school buses</p>
        </div>
        <Button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900">
          <Plus className="w-4 h-4 mr-2" />
          Add Bus
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Total Buses</p>
            <h3 className="text-gray-900">{mockBuses.length}</h3>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">GPS Online</p>
            <h3 className="text-gray-900 text-green-600">
              {mockBuses.filter((b) => b.gpsStatus === "Online").length}
            </h3>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">In Service</p>
            <h3 className="text-gray-900">
              {mockBuses.filter((b) => b.route).length}
            </h3>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">At Depot</p>
            <h3 className="text-gray-900">
              {mockBuses.filter((b) => !b.route).length}
            </h3>
          </CardContent>
        </Card>
      </div>

      {/* Buses Table */}
      <Card className="border-gray-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Buses</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search buses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bus ID</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead>Current Location</TableHead>
                <TableHead>GPS Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBuses.map((bus) => (
                <TableRow key={bus.id}>
                  <TableCell>{bus.busId}</TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {bus.capacity} seats
                  </TableCell>
                  <TableCell>
                    {bus.route ? (
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200">
                        {bus.route}
                      </Badge>
                    ) : (
                      <span className="text-sm text-gray-400">Not assigned</span>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {bus.driver || "Not assigned"}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {bus.currentLocation}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Signal
                        className={`w-4 h-4 ${
                          bus.gpsStatus === "Online"
                            ? "text-green-600"
                            : bus.gpsStatus === "Warning"
                            ? "text-orange-600"
                            : "text-gray-400"
                        }`}
                      />
                      <Badge className={getGPSStatusColor(bus.gpsStatus)}>
                        {bus.gpsStatus}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
