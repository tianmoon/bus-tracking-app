import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import {
  AlertTriangle,
  Clock,
  Wrench,
  AlertOctagon,
  CheckCircle,
  Info,
} from "lucide-react";
import { Badge } from "../../ui/badge";

const recentIncidents = [
  {
    id: 1,
    type: "Delay",
    title: "Traffic Delay on Main Street",
    description: "Heavy traffic causing 10-minute delay",
    time: "2 hours ago",
    status: "Resolved",
  },
  {
    id: 2,
    type: "Mechanical",
    title: "Low Tire Pressure Warning",
    description: "Front right tire pressure low",
    time: "Yesterday",
    status: "Under Review",
  },
];

export function IncidentReportPage() {
  const [incidentType, setIncidentType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({ incidentType, title, description, location });
  };

  const getIncidentIcon = (type: string) => {
    switch (type) {
      case "Delay":
        return <Clock className="w-5 h-5 text-orange-600" />;
      case "Mechanical":
        return <Wrench className="w-5 h-5 text-blue-600" />;
      case "Emergency":
        return <AlertOctagon className="w-5 h-5 text-red-600" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolved":
        return "bg-green-100 text-green-800";
      case "Under Review":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-gray-900">Incident Report</h1>
        <p className="text-gray-600">Report delays, issues, or emergencies</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-orange-200 bg-orange-50 cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-gray-900">Report Delay</h3>
                <p className="text-sm text-gray-600">Traffic or schedule delay</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50 cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <Wrench className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-gray-900">Mechanical Issue</h3>
                <p className="text-sm text-gray-600">Bus maintenance needed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50 cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                <AlertOctagon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-gray-900">Emergency SOS</h3>
                <p className="text-sm text-gray-600">Immediate assistance</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle>Submit Incident Report</CardTitle>
            <p className="text-sm text-gray-500">Fill out the form below to report an incident</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Incident Type */}
              <div className="space-y-2">
                <Label htmlFor="incident-type">Incident Type *</Label>
                <Select value={incidentType} onValueChange={setIncidentType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select incident type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="delay">Traffic Delay</SelectItem>
                    <SelectItem value="mechanical">Mechanical Issue</SelectItem>
                    <SelectItem value="weather">Weather Condition</SelectItem>
                    <SelectItem value="accident">Road Accident</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Incident Title *</Label>
                <Input
                  id="title"
                  placeholder="Brief description of the incident"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  placeholder="Current location or stop"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Detailed Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Provide detailed information about the incident..."
                  rows={6}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* Estimated Delay (if applicable) */}
              <div className="space-y-2">
                <Label htmlFor="delay">Estimated Delay (minutes)</Label>
                <Input
                  id="delay"
                  type="number"
                  placeholder="0"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                >
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Submit Report
                </Button>
                <Button type="button" variant="outline" className="flex-1">
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Recent Reports & Guidelines */}
        <div className="space-y-6">
          {/* Recent Reports */}
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
              <p className="text-sm text-gray-500">Your previous incident reports</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentIncidents.map((incident) => (
                  <div
                    key={incident.id}
                    className="p-4 border-2 border-gray-200 rounded-lg"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getIncidentIcon(incident.type)}
                        <h4 className="text-gray-900">{incident.title}</h4>
                      </div>
                      <Badge className={getStatusColor(incident.status)}>
                        {incident.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {incident.description}
                    </p>
                    <p className="text-xs text-gray-500">{incident.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Guidelines */}
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-600" />
                Reporting Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Be Specific:</strong> Provide clear details about the incident
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Report Immediately:</strong> Submit reports as soon as possible
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Include Location:</strong> Always mention your current location
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Emergency First:</strong> For emergencies, call admin immediately
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Student Safety:</strong> Priority is always student safety
                  </span>
                </li>
              </ul>

              <div className="mt-4 pt-4 border-t border-blue-200">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Emergency Contact:</strong>
                </p>
                <p className="text-sm text-gray-700">
                  Admin Hotline: <strong>(555) 911-0000</strong>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
