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
import { Plus, Edit, Trash2, Search, Phone } from "lucide-react";
import { Badge } from "../../ui/badge";
import { Avatar, AvatarFallback } from "../../ui/avatar";

const mockDrivers = [
  {
    id: 1,
    name: "John Smith",
    phone: "(555) 123-4567",
    assignedBus: "Bus #12",
    status: "Active",
    currentRoute: "Route A",
  },
  {
    id: 2,
    name: "Maria Garcia",
    phone: "(555) 234-5678",
    assignedBus: "Bus #7",
    status: "Active",
    currentRoute: "Route B",
  },
  {
    id: 3,
    name: "David Lee",
    phone: "(555) 345-6789",
    assignedBus: "Bus #15",
    status: "Off Duty",
    currentRoute: null,
  },
  {
    id: 4,
    name: "Jennifer Taylor",
    phone: "(555) 456-7890",
    assignedBus: "Bus #23",
    status: "Active",
    currentRoute: "Route C",
  },
  {
    id: 5,
    name: "Robert Wilson",
    phone: "(555) 567-8901",
    assignedBus: "Bus #18",
    status: "Active",
    currentRoute: "Route D",
  },
  {
    id: 6,
    name: "Lisa Anderson",
    phone: "(555) 678-9012",
    assignedBus: "Bus #31",
    status: "Off Duty",
    currentRoute: null,
  },
  {
    id: 7,
    name: "Michael Brown",
    phone: "(555) 789-0123",
    assignedBus: "Bus #5",
    status: "Active",
    currentRoute: "Route A",
  },
  {
    id: 8,
    name: "Sarah Johnson",
    phone: "(555) 890-1234",
    assignedBus: "Bus #42",
    status: "Active",
    currentRoute: "Route E",
  },
];

export function DriversPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDrivers = mockDrivers.filter(
    (driver) =>
      driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.assignedBus.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Drivers Management</h1>
          <p className="text-gray-600">Manage all bus drivers</p>
        </div>
        <Button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900">
          <Plus className="w-4 h-4 mr-2" />
          Add Driver
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Total Drivers</p>
            <h3 className="text-gray-900">{mockDrivers.length}</h3>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">On Duty</p>
            <h3 className="text-gray-900">
              {mockDrivers.filter((d) => d.status === "Active").length}
            </h3>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Off Duty</p>
            <h3 className="text-gray-900">
              {mockDrivers.filter((d) => d.status === "Off Duty").length}
            </h3>
          </CardContent>
        </Card>
      </div>

      {/* Drivers Table */}
      <Card className="border-gray-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Drivers</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search drivers..."
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
                <TableHead>Driver</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Assigned Bus</TableHead>
                <TableHead>Current Route</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDrivers.map((driver) => (
                <TableRow key={driver.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-yellow-200 text-yellow-900">
                          {driver.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span>{driver.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4" />
                      {driver.phone}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                      {driver.assignedBus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {driver.currentRoute ? (
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200">
                        {driver.currentRoute}
                      </Badge>
                    ) : (
                      <span className="text-sm text-gray-400">Not assigned</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={driver.status === "Active" ? "default" : "secondary"}
                      className={
                        driver.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }
                    >
                      {driver.status}
                    </Badge>
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
