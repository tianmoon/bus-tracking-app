import React, { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Sidebar from "../components/Sidebar/Sidebar";
import { Bell, CircleUserRound, X, Navigation, MapPin } from "lucide-react";
import { toast } from "react-toastify";
import Header from "../components/Header";

// Fix Leaflet default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom bus icon
const busIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/3448/3448339.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
});

const socket = io('http://localhost:5000');

function BusTrackingAdmin() {
    const [trips, setTrips] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTrip, setSelectedTrip] = useState(null);
    const [busLocation, setBusLocation] = useState(null);
    const [locationHistory, setLocationHistory] = useState([]);

    const handleStatus = (status) => {
        const statusMap = {
            completed: "Hoàn thành",
            ongoing: "Đang diễn ra",
            cancelled: "Chưa hoàn thành"
        }
        return statusMap[status] || "Không xác định";
    }

    const fetchTrips = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/trips");
            setTrips(response.data.data);
        } catch (error) {
            console.error("Error fetching trips:", error);
            toast.error("Lỗi khi tải danh sách chuyến đi.");
        }
    };

    // Lắng nghe vị trí bus realtime
    useEffect(() => {
        socket.on('location-update', (data) => {
            if (selectedTrip && data.trip_id === selectedTrip.trip_id) {
                setBusLocation({
                    lat: data.latitude,
                    lng: data.longitude,
                    speed: data.speed,
                    heading: data.heading
                });
                
                // Lưu lịch sử di chuyển
                setLocationHistory(prev => [...prev, [data.latitude, data.longitude]]);
            }
        });

        return () => {
            socket.off('location-update');
        };
    }, [selectedTrip]);

    useEffect(() => {
        fetchTrips();
    }, []);

    const handleTrack = (trip) => {
        setSelectedTrip(trip);
        setIsOpen(true);
        setLocationHistory([]);
        
        // Request vị trí hiện tại của bus
        socket.emit('request-location', trip.bus_id);
    };

    const closeModal = () => {
        setIsOpen(false);
        setSelectedTrip(null);
        setBusLocation(null);
        setLocationHistory([]);
    };

    return (
        <>
            <div className="flex min-h-screen bg-gray-50">
                {/* Sidebar */}
                <Sidebar userRole='admin' />

                {/* Main Content */}
                <div className="flex-1">
                    {/* Top Navigation */}
                    <Header />

                    {/* Trip List */}
                    <div className="p-6">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="bg-white border-b px-6 py-4 flex justify-between items-center">
                                <h2 className="text-xl font-semibold">Danh sách Chuyến đi</h2>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full table-fixed">
                                    <thead className="bg-indigo-600 text-white">
                                        <tr>
                                            <th className="px-6 py-4 text-left font-semibolds">Id</th>
                                            <th className="px-6 py-4 text-left font-semibold">Biển số</th>
                                            <th className="px-6 py-4 text-left font-semibold">Trạng thái</th>
                                            <th className="px-6 py-4 text-left font-semibold">Tài xế</th>
                                            <th className="px-6 py-4 text-left font-semibold">Tuyến đường</th>
                                            <th className="px-6 py-4 text-left font-semibold">Thao tác</th>
                                        </tr>
                                    </thead>
                                </table>
                                <div className="overflow-y-auto max-h-165">
                                    <table className="w-full table-fixed">
                                        <tbody>
                                            {trips.length > 0 ? (trips.map((trip) => (
                                                <tr key={trip.trip_id} className="border-b hover:bg-gray-50">
                                                    <td className="px-6 py-4 ">{trip.trip_id}</td>
                                                    <td className="px-6 py-4 font-medium">{trip.plate_number}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={handleStatus(trip.status) === "Hoàn thành" ?
                                                            "bg-green-500 text-green-800 rounded-[15px] px-2 py-1 font-medium whitespace-nowrap" :
                                                            handleStatus(trip.status) === "Đang diễn ra" ?
                                                                "bg-blue-500 text-blue-800 rounded-[15px] px-2 py-1 font-medium whitespace-nowrap" :
                                                                "bg-yellow-200 text-yellow-800 rounded-[15px] px-2 py-1 font-medium whitespace-nowrap"
                                                        }>
                                                            {handleStatus(trip.status)}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 font-medium">{trip.driver_name}</td>
                                                    <td className="px-6 py-4 font-medium">{trip.route_name}</td>
                                                    <td className="px-6 py-4">
                                                        <button 
                                                            onClick={() => handleTrack(trip)}
                                                            className={handleStatus(trip.status) === "Đang diễn ra" ? "bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600 transition-colors" : "bg-gray-400 text-white px-4 py-2 rounded mr-2 cursor-not-allowed"} 
                                                            disabled={handleStatus(trip.status) !== "Đang diễn ra"}
                                                        >
                                                            Theo dõi
                                                        </button>
                                                    </td>
                                                </tr>))) : (
                                                <tr>
                                                    <td colSpan="6" className="text-center py-4 text-gray-500">
                                                        Chưa có thông tin chuyến đi
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Live Tracking Modal */}
            {isOpen && selectedTrip && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-2xl max-w-5xl w-full max-h-[135vh] overflow-hidden">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold flex items-center gap-2">
                                    <Navigation size={28} />
                                    Live Tracking - {selectedTrip.plate_number}
                                </h2>
                                <p className="text-indigo-100 text-sm mt-1">
                                    Tuyến: {selectedTrip.route_name} | Tài xế: {selectedTrip.driver_name}
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
                                    Thông tin chuyến đi
                                </h3>
                                
                                <div className="space-y-4">
                                    <div className="bg-white p-4 rounded-lg shadow-sm">
                                        <p className="text-gray-500 text-sm">Trạng thái</p>
                                        <p className="font-semibold text-green-600 mt-1">
                                            {handleStatus(selectedTrip.status)}
                                        </p>
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
                                                    <p className="font-bold">{selectedTrip.plate_number}</p>
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

        </>
    )
}

export default BusTrackingAdmin;