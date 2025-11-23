import React, { useContext, useState, useEffect } from "react";
import { FaChild } from "react-icons/fa";
import { CircleUserRound, Navigation, MapPin, X } from "lucide-react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header.jsx";
import { AppContext } from "../../context/AppContext.jsx";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const socket = io('http://localhost:5000');

// Fix Leaflet default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom bus icon
const busIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export function StudentInfoPH() {
  const [childs, setChilds] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [busLocation, setBusLocation] = useState(null);
  const [locationHistory, setLocationHistory] = useState([]);
  const { user } = useContext(AppContext);

  const fetchChilds = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/parents/childs/${user.parent_id}`);
      const data = await response.json();
      setChilds(data.data);
    } catch (error) {
      console.error('Error fetching childs:', error.data?.message || error.message);
      toast.error('Lỗi khi tải thông tin con em.');
    }
  };

  // Setup socket connection
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
    });

    const handleLocationUpdate = (data) => {
      console.log('Received location-update:', data);
      
      if (data.latitude && data.longitude) {
        setBusLocation({
          lat: data.latitude,
          lng: data.longitude,
          speed: data.speed || 0,
          heading: data.heading || 0
        });
        
        setLocationHistory(prev => [...prev, [data.latitude, data.longitude]]);
      }
    };

    const handleBusArrival = (data) => {
      console.log('Bus arrival notification:', data);
      
      // Hiển thị thông báo khi xe đến trạm
      toast.info(
        `Xe ${data.plate_number} đã đến ${data.stop_name} (Trạm ${data.stop_index}/${data.total_stops})`,
        {
          autoClose: 3000,
          position: "top-right"
        }
      );
    };

    socket.on('location-update', handleLocationUpdate);
    socket.on('bus-arrival', handleBusArrival);

    return () => {
      socket.off('connect');
      socket.off('location-update', handleLocationUpdate);
      socket.off('bus-arrival', handleBusArrival);
    };
  }, []);

  useEffect(() => {
    fetchChilds();
  }, []);

  const handleTrackStudent = (child) => {
    setSelectedChild(child);
    setIsModalOpen(true);
    setBusLocation(null);
    setLocationHistory([]);
    toast.info(`Đang theo dõi xe ${child.plate_number}`);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedChild(null);
    setBusLocation(null);
    setLocationHistory([]);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar userRole='parent' />

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <Header />

        {/* Student Card */}
        <div className="p-6">
          {childs.length > 0 ? (
            <div className="flex flex-wrap gap-6">
              {childs.map((child) => (
                <div key={child.student_id} className="bg-white rounded-xl shadow-md p-6 w-[450px]">
                  <div className="flex items-start gap-6 mb-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <FaChild className="text-blue-600" /> Thông tin con em
                      </h4>

                      <div className="space-y-1 text-gray-700 text-sm">
                        <p><b>Mã học sinh:</b> {child.student_id}</p>
                        <p><b>Họ tên:</b> {child.name}</p>
                        <p><b>Lớp:</b> {child.grade}</p>
                        <p><b>Trường:</b> Đại học Sài Gòn</p>
                        <p><b>Xe:</b> {child.plate_number}</p>
                      </div>
                    </div>

                    <CircleUserRound className="w-24 h-24 rounded-full object-cover border border-gray-200 text-gray-400" />
                  </div>

                  {/* Tracking Button */}
                  <button
                    onClick={() => handleTrackStudent(child)}
                    className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 font-medium"
                  >
                    <Navigation size={18} />
                    Theo dõi xe buýt
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center mt-10 text-gray-600">
              Không có thông tin học sinh
            </div>
          )}
        </div>
      </div>

      {/* Tracking Modal */}
      {isModalOpen && selectedChild && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-5xl w-full max-h-[130vh] overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Navigation size={28} />
                  Theo dõi xe - {selectedChild.plate_number}
                </h2>
                <p className="text-indigo-100 text-sm mt-1">
                  Học sinh: {selectedChild.name} | Lớp: {selectedChild.grade}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="grid md:grid-cols-3 h-[calc(90vh-120px)]">
              {/* Left Side - Info */}
              <div className="border-r overflow-y-auto p-6 bg-gray-50">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <MapPin className="mr-2 text-indigo-600" size={20} />
                  Thông tin xe buýt
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-gray-500 text-sm">Biển số xe</p>
                    <p className="font-semibold text-gray-800 mt-1">{selectedChild.plate_number}</p>
                  </div>

                  {busLocation && (
                    <>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <p className="text-gray-500 text-sm">Vị trí hiện tại</p>
                        <p className="font-mono text-sm mt-1">
                          {busLocation.lat.toFixed(6)}, {busLocation.lng.toFixed(6)}
                        </p>
                      </div>

                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <p className="text-gray-500 text-sm">Tốc độ</p>
                        <p className="font-semibold text-blue-600 mt-1 text-xl">
                          {busLocation.speed || 0} km/h
                        </p>
                      </div>

                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <p className="text-gray-500 text-sm">Cập nhật lần cuối</p>
                        <p className="font-medium text-gray-700 mt-1">
                          {new Date().toLocaleTimeString('vi-VN')}
                        </p>
                      </div>
                    </>
                  )}

                  {!busLocation && (
                    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                      <p className="text-yellow-800 text-sm">
                        Đang chờ dữ liệu vị trí từ xe...
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Side - Map */}
              <div className="md:col-span-2 bg-gray-100 relative">
                {busLocation ? (
                  <MapContainer
                    center={[busLocation.lat, busLocation.lng]}
                    zoom={15}
                    className="h-full w-full"
                    key={`${busLocation.lat}-${busLocation.lng}`}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    />
                    
                    {/* Bus marker */}
                    <Marker 
                      position={[busLocation.lat, busLocation.lng]}
                      icon={busIcon}
                    >
                      <Popup>
                        <div className="text-center">
                          <p className="font-bold">{selectedChild.plate_number}</p>
                          <p className="text-sm">Tốc độ: {busLocation.speed || 0} km/h</p>
                          <p className="text-xs text-gray-500">
                            {new Date().toLocaleTimeString('vi-VN')}
                          </p>
                        </div>
                      </Popup>
                    </Marker>

                    {/* Path history */}
                    {locationHistory.length > 1 && (
                      <Polyline 
                        positions={locationHistory}
                        color="blue"
                        weight={3}
                        opacity={0.7}
                      />
                    )}
                  </MapContainer>
                ) : (
                  <div className="h-full flex items-center justify-center bg-gray-200">
                    <div className="text-center">
                      <div className="animate-pulse">
                        <Navigation size={64} className="mx-auto text-gray-400 mb-4" />
                      </div>
                      <p className="text-gray-600 font-medium">Đang tải bản đồ...</p>
                      <p className="text-gray-500 text-sm mt-2">Chờ xe gửi vị trí</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t px-6 py-3 bg-gray-50 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">Đang theo dõi realtime</span>
              </div>
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>

  );
}


export default StudentInfoPH;
