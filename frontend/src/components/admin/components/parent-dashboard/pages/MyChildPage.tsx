import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import {
  Baby,
  GraduationCap,
  MapPin,
  Bus,
  Clock,
  Phone,
  Mail,
  Home,
  Calendar,
} from "lucide-react";
import { Badge } from "../../ui/badge";
import { Avatar, AvatarFallback } from "../../ui/avatar";

export function MyChildPage() {
  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-gray-900">My Child</h1>
        <p className="text-gray-600">Student profile and transportation details</p>
      </div>

      {/* Student Profile Card */}
      <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-white">
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            <Avatar className="w-24 h-24">
              <AvatarFallback className="bg-purple-200 text-purple-900 text-3xl">
                EJ
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-gray-900 mb-2">Emily Johnson</h2>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-purple-500 text-white">
                      <GraduationCap className="w-3 h-3 mr-1" />
                      Grade 5
                    </Badge>
                    <Badge variant="outline">Student ID: 2025-0542</Badge>
                  </div>
                  <p className="text-sm text-gray-600">Greenwood Elementary School</p>
                </div>
                <Button variant="outline">Edit Profile</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Date of Birth</p>
                    <p className="text-gray-900">March 15, 2015</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Home className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Home Address</p>
                    <p className="text-gray-900">123 Main Street</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transportation Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Route & Bus Information */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle>Route & Bus Information</CardTitle>
            <p className="text-sm text-gray-500">Current assignment details</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                    <Bus className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-gray-900">Bus #12</h3>
                    <p className="text-sm text-gray-600">Route A</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-600">Capacity</p>
                    <p className="text-gray-900">45 seats</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Status</p>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-gray-900">Route Details</h4>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Stops</p>
                    <p className="text-gray-900">8 stops</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Average Duration</p>
                    <p className="text-gray-900">45 minutes</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pickup & Drop-off Points */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle>Pickup & Drop-off Points</CardTitle>
            <p className="text-sm text-gray-500">Daily schedule locations</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Morning Pickup */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-gray-900">Morning Pickup</h4>
                      <p className="text-sm text-gray-600">Main Street & 1st Ave</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                    Stop #1
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>Scheduled: 7:15 AM</span>
                </div>
              </div>

              {/* Afternoon Drop-off */}
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <Home className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-gray-900">Afternoon Drop-off</h4>
                      <p className="text-sm text-gray-600">Main Street & 1st Ave</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                    Stop #1
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>Scheduled: 3:10 PM</span>
                </div>
              </div>

              {/* Special Instructions */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="text-gray-900 mb-2">Special Instructions</h4>
                <p className="text-sm text-gray-600">
                  Please ensure Emily is met by a parent or guardian at the drop-off point.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Emergency Contacts */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>Emergency Contacts</CardTitle>
          <p className="text-sm text-gray-500">Authorized contacts for Emily</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Primary Contact */}
            <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-purple-200 text-purple-900">
                      SJ
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-gray-900">Sarah Johnson</h4>
                    <p className="text-sm text-gray-600">Mother (Primary)</p>
                  </div>
                </div>
                <Badge className="bg-purple-500 text-white">Primary</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>(555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>sarah.j@email.com</span>
                </div>
              </div>
            </div>

            {/* Secondary Contact */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-gray-200 text-gray-900">
                      MJ
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-gray-900">Michael Johnson</h4>
                    <p className="text-sm text-gray-600">Father (Secondary)</p>
                  </div>
                </div>
                <Badge variant="outline">Secondary</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>(555) 234-5678</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>michael.j@email.com</span>
                </div>
              </div>
            </div>
          </div>

          <Button variant="outline" className="w-full mt-4">
            Add Emergency Contact
          </Button>
        </CardContent>
      </Card>

      {/* Trip History */}
      <Card className="border-gray-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Trip History</CardTitle>
              <p className="text-sm text-gray-500">Last 7 days</p>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { date: "Oct 14, 2025", morning: "On Time", afternoon: "On Time" },
              { date: "Oct 13, 2025", morning: "On Time", afternoon: "5 min delay" },
              { date: "Oct 12, 2025", morning: "On Time", afternoon: "On Time" },
              { date: "Oct 11, 2025", morning: "3 min delay", afternoon: "On Time" },
              { date: "Oct 10, 2025", morning: "On Time", afternoon: "On Time" },
            ].map((trip, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
              >
                <span className="text-sm text-gray-900">{trip.date}</span>
                <div className="flex items-center gap-4">
                  <div className="text-sm">
                    <span className="text-gray-600">Morning: </span>
                    <span
                      className={
                        trip.morning === "On Time" ? "text-green-600" : "text-orange-600"
                      }
                    >
                      {trip.morning}
                    </span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600">Afternoon: </span>
                    <span
                      className={
                        trip.afternoon === "On Time" ? "text-green-600" : "text-orange-600"
                      }
                    >
                      {trip.afternoon}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
