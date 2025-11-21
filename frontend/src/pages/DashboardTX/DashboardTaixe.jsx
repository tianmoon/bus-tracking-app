import React, { useState, useEffect } from "react";
import { useNavigate, BrowserRouter } from "react-router-dom";
import axios from "axios";

// ==========================================================================
// ⚠️ HƯỚNG DẪN COPY VÀO DỰ ÁN THẬT (QUAN TRỌNG)
// ==========================================================================

import { FaClock, FaBus, FaMapMarkerAlt, FaCalendarDay, FaPlay, FaCheckCircle } from "react-icons/fa";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header"; 

function DashboardTaixeContent() {
  const navigate = useNavigate();

  // 2. State
  const [driverInfo, setDriverInfo] = useState({ name: "Tài xế", role: "Đang tải..." });
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  // 3. API Lấy dữ liệu thật
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        
        // Kiểm tra đăng nhập
        if (!storedUser) {
            console.warn("Chưa đăng nhập: Không tìm thấy user trong LocalStorage");
            setLoading(false);
            return;
        }

        const currentUser = JSON.parse(storedUser);
        const userId = currentUser.user_id; 

        if (!userId) {
             console.error("Lỗi dữ liệu user: Thiếu user_id");
             setLoading(false);
             return;
        }

        // Gọi API thật lấy lịch trình hôm nay
        const res = await axios.get('http://localhost:5000/api/drivers/app/dashboard', {
            headers: { 'x-user-id': userId }
        });

        if (res.data.status === 'success') {
            setDriverInfo({
                name: res.data.data.profile?.name || "Tài xế",
                role: "Tài xế xe buýt"
            });
            
            const rawTrips = res.data.data.trips || [];
            
            // Sắp xếp: Chuyến nào "Chuẩn bị" (preparation) đưa lên đầu cho dễ bấm
            const sortedTrips = rawTrips.sort((a, b) => 
                new Date(a.start_time) - new Date(b.start_time)
            );
            setTrips(sortedTrips);
        }
      } catch (error) {
        console.error("Lỗi kết nối API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  // 4. Hàm xử lý bấm nút "Bắt đầu chạy"
  const handleStartTrip = async (tripId) => {
    // 1. Xác nhận hành động để tránh bấm nhầm
    if (!window.confirm("Xác nhận bắt đầu chuyến xe này?")) return;

    try {
        // 2. Gọi API cập nhật trạng thái (SỬA LẠI METHOD VÀ URL)
        // Method: PUT (khớp với driverRoutes.js)
        // URL: /api/drivers/trip/status (bỏ chữ /app thừa)
        const res = await axios.put('http://localhost:5000/api/drivers/trip/status', {
            tripId: tripId,
            status: 'ongoing' // Chuyển trạng thái sang "Đang chạy"
        });

        if (res.data.status === 'success') {
            // 3. Cập nhật giao diện ngay lập tức (Optimistic UI Update)
            // Duyệt qua danh sách chuyến đi cũ, tìm chuyến vừa bấm và đổi status của nó
            setTrips(prevTrips => prevTrips.map(trip => 
                trip.trip_id === tripId ? { ...trip, status: 'ongoing' } : trip
            ));
            
            // (Tùy chọn) Thông báo nhỏ
            // alert("Đã bắt đầu chuyến xe!");
        }
    } catch (error) {
        console.error("Lỗi cập nhật trạng thái:", error);
        alert("Lỗi kết nối Server. Vui lòng kiểm tra lại mạng hoặc Server.");
    }
  };

  // Helper: Format giờ
  const formatTime = (isoString) => {
      if (!isoString) return "--:--";
      return new Date(isoString).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userRole="driver" />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header 
            title="Lịch chạy hôm nay" 
            subtitle={new Date().toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            userName={driverInfo.name}
            userRole={driverInfo.role}
        />

        <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-3xl mx-auto">
                
                {/* Card Thống kê nhỏ trên cùng */}
                <div className="bg-white rounded-t-2xl shadow-sm border border-gray-200 p-6 pb-4 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                            <FaCalendarDay />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">Lộ trình của bạn</h2>
                            <p className="text-sm text-gray-500">
                                Hôm nay có <span className="font-bold text-indigo-600">{trips.length}</span> chuyến xe
                            </p>
                        </div>
                    </div>
                </div>

                {/* Danh sách Lịch trình */}
                {loading ? (
                    <div className="text-center py-10">Đang tải dữ liệu...</div>
                ) : trips.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
                        <FaBus />
                        <h3 className="text-gray-800 font-medium mt-2">Không có lịch chạy</h3>
                        <p className="text-sm text-gray-500">Hôm nay bạn được nghỉ ngơi!</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {trips.map((trip, index) => (
                            <div key={trip.trip_id} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                                
                                {/* === PHẦN 1: THÔNG TIN CHUYẾN ĐI (Click vào để xem chi tiết) === */}
                                <div className="p-5 cursor-pointer" onClick={() => navigate(`/driver/trip/${trip.trip_id}/students`)}>
                                    
                                    {/* Hàng 1: Trạng thái + Giờ chạy */}
                                    <div className="flex justify-between items-center mb-4">
                                        <StatusBadge status={trip.status} />
                                        <div className="flex items-center gap-2 text-sm font-bold text-gray-700 bg-gray-50 px-3 py-1 rounded-lg">
                                            <FaClock />
                                            {formatTime(trip.start_time)} - {formatTime(trip.end_time)}
                                        </div>
                                    </div>

                                    {/* Hàng 2: Tên Tuyến */}
                                    <h3 className="text-xl font-bold text-gray-800 mb-4">{trip.route_name}</h3>

                                    {/* Hàng 3: Lộ trình (Điểm đi - Điểm đến) */}
                                    <div className="space-y-4 relative pl-3 mb-5">
                                        {/* Đường kẻ nối dọc */}
                                        <div className="absolute left-[6px] top-2 bottom-2 w-0.5 border-l-2 border-dashed border-gray-300"></div>

                                        {/* Điểm đi */}
                                        <div className="flex items-start gap-3 relative z-10">
                                            <FaMapMarkerAlt />
                                            <div>
                                                <p className="text-xs text-gray-400 font-bold uppercase">Điểm bắt đầu</p>
                                                <p className="text-base font-medium text-gray-800">{trip.start_point}</p>
                                            </div>
                                        </div>
                                        
                                        {/* Điểm đến */}
                                        <div className="flex items-start gap-3 relative z-10">
                                            <FaMapMarkerAlt />
                                            <div>
                                                <p className="text-xs text-gray-400 font-bold uppercase">Điểm kết thúc</p>
                                                <p className="text-base font-medium text-gray-800">{trip.end_point}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Hàng 4: Biển số xe */}
                                    <div className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded text-sm text-gray-600 font-medium">
                                        <FaBus /> Xe: <span className="text-gray-800 font-bold">{trip.plate_number}</span>
                                    </div>
                                </div>

                                {/* === PHẦN 2: NÚT BẤM (Nằm riêng biệt ở dưới đáy - Footer) === */}
                                <div className="p-4 bg-gray-50 border-t border-gray-200">
                                    {trip.status === 'preparation' ? (
                                        // TRƯỜNG HỢP 1: CHƯA CHẠY -> HIỆN NÚT BẮT ĐẦU
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation(); // Chặn click nhầm vào thẻ cha
                                                handleStartTrip(trip.trip_id);
                                            }}
                                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-bold text-base flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-95"
                                        >
                                            <FaPlay /> BẮT ĐẦU CHẠY
                                        </button>
                                    ) : trip.status === 'ongoing' ? (
                                        // TRƯỜNG HỢP 2: ĐANG CHẠY -> HIỆN TRẠNG THÁI ĐỘNG
                                        <div className="w-full bg-green-100 text-green-700 py-3 rounded-lg font-bold text-base flex items-center justify-center gap-2 cursor-default border border-green-200">
                                            <span className="relative flex h-3 w-3 mr-1">
                                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                            </span>
                                            XE ĐANG CHẠY...
                                        </div>
                                    ) : (
                                        // TRƯỜNG HỢP 3: ĐÃ HOÀN THÀNH
                                        <div className="w-full bg-gray-200 text-gray-500 py-3 rounded-lg font-bold text-base flex items-center justify-center gap-2 cursor-default">
                                            <FaCheckCircle /> ĐÃ HOÀN THÀNH
                                        </div>
                                    )}
                                </div>

                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}

// Component hiển thị Badge trạng thái màu sắc
const StatusBadge = ({ status }) => {
    const config = {
        preparation: { color: "bg-yellow-100 text-yellow-700 border-yellow-200", text: "Chuẩn bị" },
        ongoing: { color: "bg-green-100 text-green-700 border-green-200", text: "Đang chạy" },
        completed: { color: "bg-gray-100 text-gray-600 border-gray-200", text: "Hoàn thành" },
        cancelled: { color: "bg-red-100 text-red-700 border-red-200", text: "Đã hủy" }
    };
    
    const current = config[status] || config.preparation;

    return (
        <span className={`px-3 py-1 rounded text-xs font-bold uppercase border ${current.color}`}>
            {current.text}
        </span>
    );
};

export default DashboardTaixeContent;