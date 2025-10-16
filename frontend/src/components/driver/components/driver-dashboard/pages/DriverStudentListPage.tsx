import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Input } from "../../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Search, MapPin, Phone, CheckCircle, XCircle } from "lucide-react";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Avatar, AvatarFallback } from "../../ui/avatar";

const mockStudents = [
  {
    id: 1,
    name: "Emily Johnson",
    grade: "Grade 5",
    pickupLocation: "Main Street & 1st Ave",
    pickupTime: "7:15 AM",
    dropLocation: "School Gate",
    parentPhone: "(555) 123-4567",
    status: "picked-up",
    stopNumber: 1,
  },
  {
    id: 2,
    name: "Michael Chen",
    grade: "Grade 7",
    pickupLocation: "Main Street & 1st Ave",
    pickupTime: "7:15 AM",
    dropLocation: "School Gate",
    parentPhone: "(555) 234-5678",
    status: "picked-up",
    stopNumber: 1,
  },
  {
    id: 3,
    name: "Sarah Williams",
    grade: "Grade 6",
    pickupLocation: "Main Street & 1st Ave",
    pickupTime: "7:15 AM",
    dropLocation: "School Gate",
    parentPhone: "(555) 345-6789",
    status: "picked-up",
    stopNumber: 1,
  },
  {
    id: 4,
    name: "James Brown",
    grade: "Grade 8",
    pickupLocation: "Oak Park",
    pickupTime: "7:22 AM",
    dropLocation: "School Gate",
    parentPhone: "(555) 456-7890",
    status: "waiting",
    stopNumber: 2,
  },
  {
    id: 5,
    name: "Olivia Davis",
    grade: "Grade 4",
    pickupLocation: "Oak Park",
    pickupTime: "7:22 AM",
    dropLocation: "School Gate",
    parentPhone: "(555) 567-8901",
    status: "waiting",
    stopNumber: 2,
  },
  {
    id: 6,
    name: "Noah Martinez",
    grade: "Grade 5",
    pickupLocation: "Downtown Station",
    pickupTime: "7:30 AM",
    dropLocation: "School Gate",
    parentPhone: "(555) 678-9012",
    status: "waiting",
    stopNumber: 3,
  },
  {
    id: 7,
    name: "Sophia Garcia",
    grade: "Grade 7",
    pickupLocation: "Downtown Station",
    pickupTime: "7:30 AM",
    dropLocation: "School Gate",
    parentPhone: "(555) 789-0123",
    status: "waiting",
    stopNumber: 3,
  },
  {
    id: 8,
    name: "Liam Rodriguez",
    grade: "Grade 6",
    pickupLocation: "Downtown Station",
    pickupTime: "7:30 AM",
    dropLocation: "School Gate",
    parentPhone: "(555) 890-1234",
    status: "waiting",
    stopNumber: 3,
  },
];

export function DriverStudentListPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = mockStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.pickupLocation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pickedUpCount = mockStudents.filter((s) => s.status === "picked-up").length;
  const waitingCount = mockStudents.filter((s) => s.status === "waiting").length;

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Student List</h1>
          <p className="text-gray-600">Route A - Morning Trip</p>
        </div>
        <Button className="bg-green-500 hover:bg-green-600 text-white">
          Emergency Contact List
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600 mb-1">Total Students</p>
            <h3 className="text-gray-900">{mockStudents.length}</h3>
          </CardContent>
        </Card>
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600 mb-1">Picked Up</p>
            <h3 className="text-green-600">{pickedUpCount}</h3>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600 mb-1">Waiting</p>
            <h3 className="text-gray-900">{waitingCount}</h3>
          </CardContent>
        </Card>
      </div>

      {/* Students Table */}
      <Card className="border-gray-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Students on Route</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search students..."
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
                <TableHead>Stop</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Pickup Location</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Parent Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="w-8 h-8 rounded-full bg-yellow-100 text-yellow-900 flex items-center justify-center">
                      {student.stopNumber}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-green-200 text-green-900 text-xs">
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span>{student.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {student.grade}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      {student.pickupLocation}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {student.pickupTime}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4" />
                      {student.parentPhone}
                    </div>
                  </TableCell>
                  <TableCell>
                    {student.status === "picked-up" ? (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Picked Up
                      </Badge>
                    ) : (
                      <Badge variant="outline">Waiting</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {student.status === "waiting" ? (
                      <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                        Mark Picked Up
                      </Button>
                    ) : (
                      <Button size="sm" variant="ghost" className="text-gray-400">
                        <CheckCircle className="w-4 h-4" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick Reference */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>Pickup Stops Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { stop: 1, location: "Main Street & 1st Ave", students: 3, time: "7:15 AM" },
              { stop: 2, location: "Oak Park", students: 2, time: "7:22 AM" },
              { stop: 3, location: "Downtown Station", students: 4, time: "7:30 AM" },
            ].map((stop) => (
              <div
                key={stop.stop}
                className="p-4 border-2 border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="w-10 h-10 rounded-full bg-yellow-500 text-white flex items-center justify-center">
                    {stop.stop}
                  </div>
                  <Badge variant="outline">{stop.students} students</Badge>
                </div>
                <h4 className="text-gray-900 mb-1">{stop.location}</h4>
                <p className="text-sm text-gray-600">{stop.time}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
