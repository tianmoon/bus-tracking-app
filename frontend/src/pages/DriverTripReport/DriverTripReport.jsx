import React, { useState, useEffect, useContext } from "react";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import Header from "../../components/Header.jsx"; // Nhớ import Header
import { CheckCircle, Bus, AlertTriangle } from "lucide-react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../../context/AppContext';

// --- COMPONENT CON: THẺ BÁO CÁO ---
const TripReportCard = ({ trip, onComplete }) => {
    const [summary, setSummary] = useState(null);

    // Load số liệu thống kê cho từng chuyến
    useEffect(() => {
        axios.get(`http://localhost:5000/api/trips/${trip.trip_id}/report`)
            .then(res => {
                 if(res.data.status === 'success') setSummary(res.data.data);
            })
            .catch(err => console.error(err));
    }, [trip.trip_id]);

    if (!summary) return <div className="animate-pulse h-32 bg-gray-200 rounded-xl"></div>;

    const { stats, incidents } = summary;

    return (
        <div className="bg-white rounded-xl shadow-sm border p-5 relative">
            {/* Badge Trạng thái */}
            <div className="absolute top-5 right-5">
                 <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                    trip.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                 }`}>
                    {trip.status === 'completed' ? 'Đã xong' : 'Đang chạy'}
                 </span>
            </div>

            <h3 className="text-lg font-bold text-gray-800 mb-1">{trip.route_name}</h3>
            <p className="text-sm text-gray-500 mb-4">
                Giờ chạy: {new Date(trip.departure_time).toLocaleTimeString('vi-VN', {hour: '2-digit', minute:'2-digit'})}
            </p>

            {/* Thống kê nhanh */}
            <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="bg-indigo-50 p-2 rounded text-center">
                    <p className="text-xs text-gray-500">Tổng HS</p>
                    <p className="font-bold text-indigo-700">{stats?.total_students || 0}</p>
                </div>
                <div className="bg-green-50 p-2 rounded text-center">
                    <p className="text-xs text-gray-500">Đã đón/trả</p>
                    <p className="font-bold text-green-700">
                        {stats?.picked_up_count || 0}/{stats?.dropped_off_count || 0}
                    </p>
                </div>
                <div className="bg-red-50 p-2 rounded text-center">
                    <p className="text-xs text-gray-500">Sự cố</p>
                    <p className="font-bold text-red-700">{incidents?.length || 0}</p>
                </div>
            </div>

            {/* Nút Hành động */}
            {trip.status !== 'completed' ? (
                <button 
                    onClick={() => onComplete(trip.trip_id)}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-bold text-sm flex items-center justify-center gap-2"
                >
                    <CheckCircle size={16} /> Hoàn thành & Gửi báo cáo
                </button>
            ) : (
                <div className="w-full bg-gray-100 text-gray-500 py-2 rounded-lg font-bold text-sm text-center flex items-center justify-center gap-2">
                    <CheckCircle size={16} /> Báo cáo đã gửi
                </div>
            )}
        </div>
    );
};

// --- COMPONENT CHÍNH ---
function DriverTripReport() {
    const { user } = useContext(AppContext);
    const [trips, setTrips] = useState([]);

    // 1. Lấy danh sách chuyến hôm nay
    useEffect(() => {
        if (user) {
            axios.get('http://localhost:5000/api/trips/driver/today', { headers: { 'x-user-id': user.user_id } })
                .then(res => setTrips(res.data.data))
                .catch(err => console.error(err));
        }
    }, [user]);

    // 2. Xử lý Hoàn thành
    const handleComplete = async (tripId) => {
        if (!window.confirm("Xác nhận kết thúc chuyến đi này?")) return;
        try {
            await axios.put('http://localhost:5000/api/trips/status', { tripId, status: 'completed' });
            toast.success("Đã hoàn thành chuyến đi!");
            // Cập nhật UI
            setTrips(prev => prev.map(t => t.trip_id === tripId ? { ...t, status: 'completed' } : t));
        } catch (error) {
            toast.error("Lỗi hệ thống.");
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar userRole="driver" />
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <Header title="Báo cáo trong ngày" userRole="Tài xế" />
                
                <div className="flex-1 overflow-y-auto p-6">
                     <h2 className="text-xl font-bold text-gray-800 mb-4">Tổng hợp báo cáo hôm nay</h2>
                     
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
                        {trips.map(trip => (
                            <TripReportCard key={trip.trip_id} trip={trip} onComplete={handleComplete} />
                        ))}
                     </div>

                     {trips.length === 0 && (
                        <div className="text-center text-gray-500 mt-10">Chưa có dữ liệu chuyến đi hôm nay.</div>
                     )}
                </div>
            </div>
        </div>
    );
}

export default DriverTripReport;