import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Textarea } from "../../ui/textarea";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { Badge } from "../../ui/badge";
import { Send, Users } from "lucide-react";

const mockConversations = [
  {
    id: 1,
    name: "Admin Support",
    role: "Admin",
    lastMessage: "Your incident report has been received",
    time: "5 mins ago",
    unread: 1,
  },
  {
    id: 2,
    name: "Parent Group - Route A",
    role: "Parents",
    lastMessage: "Thank you for the update!",
    time: "20 mins ago",
    unread: 0,
  },
  {
    id: 3,
    name: "Maria Garcia (Driver)",
    role: "Driver",
    lastMessage: "See you at the depot!",
    time: "1 hour ago",
    unread: 0,
  },
  {
    id: 4,
    name: "System Notifications",
    role: "System",
    lastMessage: "Your schedule for tomorrow is ready",
    time: "2 hours ago",
    unread: 0,
  },
];

const mockMessages = [
  {
    id: 1,
    from: "John Smith",
    message: "Good morning! I'm about to start my route. All systems check complete.",
    time: "7:00 AM",
    isDriver: true,
  },
  {
    id: 2,
    from: "Admin Support",
    message: "Good morning John! Have a safe trip. Weather looks good today.",
    time: "7:02 AM",
    isDriver: false,
  },
  {
    id: 3,
    from: "John Smith",
    message: "I'm experiencing some traffic on Main Street. Might be 5-10 minutes late to first stop.",
    time: "7:12 AM",
    isDriver: true,
  },
  {
    id: 4,
    from: "Admin Support",
    message: "Thanks for the heads up. I've notified the parents at that stop. Stay safe!",
    time: "7:13 AM",
    isDriver: false,
  },
  {
    id: 5,
    from: "John Smith",
    message: "Traffic cleared up. Back on schedule now.",
    time: "7:18 AM",
    isDriver: true,
  },
  {
    id: 6,
    from: "Admin Support",
    message: "Great to hear! Your incident report has been received and logged.",
    time: "Just now",
    isDriver: false,
  },
];

export function DriverMessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(
    mockConversations[0]
  );
  const [newMessage, setNewMessage] = useState("");

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-gray-900">Messages</h1>
        <p className="text-gray-600">Communications with admin and parents</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600 mb-1">Unread Messages</p>
            <h3 className="text-gray-900">1</h3>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600 mb-1">Active Conversations</p>
            <h3 className="text-gray-900">{mockConversations.length}</h3>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600 mb-1">Admin Response Time</p>
            <h3 className="text-gray-900">~2 mins</h3>
          </CardContent>
        </Card>
      </div>

      {/* Messaging Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversations List */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle>Conversations</CardTitle>
            <p className="text-sm text-gray-500">Your active chats</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mockConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation)}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    selectedConversation.id === conversation.id
                      ? "bg-green-100 border-2 border-green-400"
                      : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Avatar>
                      <AvatarFallback
                        className={
                          conversation.role === "Admin"
                            ? "bg-yellow-200 text-yellow-900"
                            : conversation.role === "Parents"
                            ? "bg-purple-200 text-purple-900"
                            : "bg-green-200 text-green-900"
                        }
                      >
                        {conversation.role === "Parents" ? (
                          <Users className="w-4 h-4" />
                        ) : (
                          conversation.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                        )}
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
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-yellow-200 text-yellow-900">
                    {selectedConversation.role === "Parents" ? (
                      <Users className="w-4 h-4" />
                    ) : (
                      selectedConversation.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                    )}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{selectedConversation.name}</CardTitle>
                  <p className="text-sm text-gray-500">{selectedConversation.role}</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200">
                Active
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {/* Messages */}
            <div className="h-[500px] overflow-y-auto p-6 space-y-4">
              {mockMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isDriver ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.isDriver
                        ? "bg-green-100 text-gray-900"
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
                <Button className="bg-green-500 hover:bg-green-600 text-white">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Messages are monitored by admin for safety purposes
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Messages */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>Quick Messages</CardTitle>
          <p className="text-sm text-gray-500">Pre-written messages for common situations</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button variant="outline" className="justify-start h-auto py-3 px-4">
              <div className="text-left">
                <p className="text-sm text-gray-900">Running on time</p>
                <p className="text-xs text-gray-500">No delays expected</p>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto py-3 px-4">
              <div className="text-left">
                <p className="text-sm text-gray-900">Minor delay (5 min)</p>
                <p className="text-xs text-gray-500">Traffic situation</p>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto py-3 px-4">
              <div className="text-left">
                <p className="text-sm text-gray-900">Trip completed</p>
                <p className="text-xs text-gray-500">All students safe</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
