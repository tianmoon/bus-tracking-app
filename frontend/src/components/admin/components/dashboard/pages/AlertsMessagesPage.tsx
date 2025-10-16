import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { Badge } from "../../ui/badge";
import { Send, AlertTriangle, Info, CheckCircle } from "lucide-react";

const mockAlerts = [
  {
    id: 1,
    type: "warning",
    title: "Bus #7 Delayed",
    message: "Traffic on Highway 101 causing 10-minute delay",
    time: "5 mins ago",
    from: "System",
  },
  {
    id: 2,
    type: "info",
    title: "New Student Enrolled",
    message: "Sarah Johnson added to Route A",
    time: "15 mins ago",
    from: "System",
  },
  {
    id: 3,
    type: "success",
    title: "Route C Completed",
    message: "All students delivered successfully",
    time: "28 mins ago",
    from: "Jennifer Taylor",
  },
  {
    id: 4,
    type: "warning",
    title: "GPS Signal Weak",
    message: "Bus #31 GPS connection unstable",
    time: "1 hour ago",
    from: "System",
  },
];

const mockConversations = [
  {
    id: 1,
    name: "John Smith",
    role: "Driver",
    lastMessage: "Route completed successfully",
    time: "2 mins ago",
    unread: 0,
  },
  {
    id: 2,
    name: "Maria Garcia",
    role: "Driver",
    lastMessage: "Running 5 minutes late due to traffic",
    time: "10 mins ago",
    unread: 1,
  },
  {
    id: 3,
    name: "Parent Group A",
    role: "Parents",
    lastMessage: "Thank you for the update!",
    time: "25 mins ago",
    unread: 0,
  },
  {
    id: 4,
    name: "Jennifer Taylor",
    role: "Driver",
    lastMessage: "Student pickup confirmed",
    time: "1 hour ago",
    unread: 0,
  },
];

const mockMessages = [
  {
    id: 1,
    from: "Maria Garcia",
    message: "Good morning! Starting my route now.",
    time: "7:00 AM",
    isAdmin: false,
  },
  {
    id: 2,
    from: "Admin",
    message: "Great, have a safe trip!",
    time: "7:02 AM",
    isAdmin: true,
  },
  {
    id: 3,
    from: "Maria Garcia",
    message: "Running 5 minutes late due to traffic on Main Street",
    time: "7:15 AM",
    isAdmin: false,
  },
  {
    id: 4,
    from: "Admin",
    message: "Understood. I'll notify the parents.",
    time: "7:16 AM",
    isAdmin: true,
  },
];

export function AlertsMessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(
    mockConversations[1]
  );
  const [newMessage, setNewMessage] = useState("");

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      case "info":
        return <Info className="w-5 h-5 text-blue-600" />;
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      default:
        return <Info className="w-5 h-5 text-gray-600" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case "warning":
        return "bg-orange-50 border-orange-200";
      case "info":
        return "bg-blue-50 border-blue-200";
      case "success":
        return "bg-green-50 border-green-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-gray-900">Alerts & Messages</h1>
        <p className="text-gray-600">System alerts and communications</p>
      </div>

      {/* Alerts Section */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>Recent Alerts</CardTitle>
          <p className="text-sm text-gray-500">System notifications and warnings</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 border-2 rounded-lg ${getAlertColor(alert.type)}`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">{getAlertIcon(alert.type)}</div>
                  <div className="flex-1">
                    <h4 className="text-gray-900 mb-1">{alert.title}</h4>
                    <p className="text-sm text-gray-700 mb-2">{alert.message}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>{alert.time}</span>
                      <span>•</span>
                      <span>From: {alert.from}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Messaging Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversations List */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle>Conversations</CardTitle>
            <p className="text-sm text-gray-500">Active chats</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mockConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation)}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    selectedConversation.id === conversation.id
                      ? "bg-yellow-100 border-2 border-yellow-400"
                      : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-yellow-200 text-yellow-900">
                        {conversation.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="text-sm text-gray-900 truncate">
                          {conversation.name}
                        </h4>
                        {conversation.unread > 0 && (
                          <Badge className="bg-red-500 text-white text-xs">
                            {conversation.unread}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mb-1">{conversation.role}</p>
                      <p className="text-xs text-gray-500 truncate">
                        {conversation.lastMessage}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">{conversation.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Interface */}
        <Card className="lg:col-span-2 border-gray-200">
          <CardHeader className="border-b border-gray-200">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback className="bg-yellow-200 text-yellow-900">
                  {selectedConversation.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{selectedConversation.name}</CardTitle>
                <p className="text-sm text-gray-500">{selectedConversation.role}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {/* Messages */}
            <div className="h-[400px] overflow-y-auto p-6 space-y-4">
              {mockMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isAdmin ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.isAdmin
                        ? "bg-yellow-100 text-gray-900"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <p className="text-sm mb-1">{message.message}</p>
                    <p className="text-xs text-gray-500">{message.time}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex items-end gap-3">
                <Textarea
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="resize-none"
                  rows={2}
                />
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
