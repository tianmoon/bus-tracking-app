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
import { Plus, Edit, Trash2, Search } from "lucide-react";
import { Badge } from "../../ui/badge";

const mockStudents = [
  {
    id: 1,
    name: "Emily Johnson",
    grade: "Grade 5",
    route: "Route A",
    pickupPoint: "Main Street & 1st Ave",
    status: "Active",
  },
  {
    id: 2,
    name: "Michael Chen",
    grade: "Grade 7",
    route: "Route B",
    pickupPoint: "Oak Park",
    status: "Active",
  },
  {
    id: 3,
    name: "Sarah Williams",
    grade: "Grade 6",
    route: "Route A",
    pickupPoint: "Downtown Station",
    status: "Active",
  },
  {
    id: 4,
    name: "James Brown",
    grade: "Grade 8",
    route: "Route C",
    pickupPoint: "Elm Street",
    status: "Active",
  },
  {
    id: 5,
    name: "Olivia Davis",
    grade: "Grade 4",
    route: "Route B",
    pickupPoint: "City Hall",
    status: "Inactive",
  },
  {
    id: 6,
    name: "Noah Martinez",
    grade: "Grade 5",
    route: "Route D",
    pickupPoint: "Riverside Park",
    status: "Active",
  },
  {
    id: 7,
    name: "Sophia Garcia",
    grade: "Grade 7",
    route: "Route A",
    pickupPoint: "Main Street & 1st Ave",
    status: "Active",
  },
  {
    id: 8,
    name: "Liam Rodriguez",
    grade: "Grade 6",
    route: "Route C",
    pickupPoint: "Central Square",
    status: "Active",
  },
];

export function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = mockStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.route.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Students Management</h1>
          <p className="text-gray-600">Manage all registered students</p>
        </div>
        <Button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900">
          <Plus className="w-4 h-4 mr-2" />
          Add Student
        </Button>
      </div>

      {/* Students Table */}
      <Card className="border-gray-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Students ({mockStudents.length})</CardTitle>
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
                <TableHead>Name</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Assigned Route</TableHead>
                <TableHead>Pickup Point</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.grade}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200">
                      {student.route}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {student.pickupPoint}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={student.status === "Active" ? "default" : "secondary"}
                      className={
                        student.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }
                    >
                      {student.status}
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
