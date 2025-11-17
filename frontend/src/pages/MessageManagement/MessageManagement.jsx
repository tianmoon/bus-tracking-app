import React, { useState, useEffect, useContext } from 'react';
import { Bell, Send, CircleUserRound } from 'lucide-react';
import Sidebar from '../../components/Sidebar/Sidebar.jsx';
import io from 'socket.io-client';
import { toast } from 'react-toastify';
import axios from 'axios';
import Header from '../../components/Header.jsx';
import { AppContext } from '../../context/AppContext.jsx';
const socket = io('http://localhost:5000');

function MessageManagement() {
  const [messageInput, setMessageInput] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('parent');
  const [messages, setMessages] = useState({
    parent: [],
    driver: []
  });
  const { user } = useContext(AppContext);

  const fetchMessages = async (room) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/messages/${room}`);
      setMessages(prev => ({
        ...prev,
        [room]: response.data.data
      }));
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      toast.error(`Lỗi khi tải tin nhắn cho ${room === 'parent' ? 'phụ huynh' : 'tài xế'}.`);
    }
  };

  useEffect(() => {
    fetchMessages(selectedGroup);
  }, [selectedGroup]);

  useEffect(() => {
    // Kết nối socket
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    // Lắng nghe tin nhắn đã gửi
    socket.on('receive-message', (data) => {
      const { message, sender, timestamp } = data;
      // Thêm tin nhắn vào danh sách (có thể cần logic phân biệt room)
      console.log('Message received:', data);
    });

    // Cleanup khi unmount
    return () => {
      socket.off('connect');
      socket.off('receive-message');
    };
  }, []);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const newMessage = {
        msg_id: Date.now(),
        content: messageInput,
        time_sent: new Date(),
        room: selectedGroup
      };

      // Thêm tin nhắn vào state local
      setMessages(prev => ({
        ...prev,
        [selectedGroup]: [...prev[selectedGroup], newMessage]
      }));

      // Gửi tin nhắn qua socket
      socket.emit('send-message', {
        room: selectedGroup,
        content: messageInput,
        sender_id: user.user_id,
        sender: "Người quản lý"
      });
      
      toast.success(`Đã gửi tin nhắn đến ${selectedGroup === 'parent' ? 'phụ huynh' : 'tài xế'}`);
      setMessageInput('');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar userRole='admin'/>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <Header/>

        {/* Message Content */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Tin Nhắn</h2>

          {/* Group Selection */}
          <div className="flex gap-4 mb-6">
            <button 
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                selectedGroup === 'parent' 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => setSelectedGroup('parent')}
            >
              Tất cả phụ huynh
            </button>
            <button 
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                selectedGroup === 'driver' 
                  ? 'bg-green-600 text-white shadow-lg' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => setSelectedGroup('driver')}
            >
              Tất cả tài xế
            </button>
          </div>

          {/* Chat Area */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Recipient Section */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
              <div className="flex gap-3">
                <div className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg">
                  { selectedGroup === 'parent' ? 'Tất cả phụ huynh' : 'Tất cả tài xế' }
                </div>
              </div>
            </div>

            {/* Messages List */}
            <div className="p-6 bg-gray-50 max-h-125 overflow-y-auto">
              {messages[selectedGroup].length > 0 ? (
                <div className="space-y-3">
                  {messages[selectedGroup].map((msg) => (
                    console.log(msg.msg_id),
                    <div key={msg.msg_id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-semibold text-indigo-600">{"Tôi"}</span>
                        <span className="text-xs text-gray-500">
                          {new Date(msg.time_sent).toLocaleString('vi-VN', {
                            hour: '2-digit',
                            minute: '2-digit',
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      <p className="text-gray-700">{msg.content}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-400">
                  <p>Chưa có tin nhắn nào</p>
                  <p className="text-sm mt-2">Gửi tin nhắn đầu tiên cho {selectedGroup === 'parent' ? 'phụ huynh' : 'tài xế'}</p>
                </div>
              )}
            </div>

            {/* Message Input Section */}
            <div className="p-6 border-t">
              <div className="flex items-center gap-3">
                <input 
                  type="text"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Soạn tin nhắn..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button 
                  className="bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  onClick={handleSendMessage}
                  disabled={!messageInput.trim()}
                >
                  <Send size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageManagement;
