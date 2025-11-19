import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MapPin, Bus, AlertTriangle, CalendarX } from "lucide-react";

// 1. IMPORT CÁC COMPONENT
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header";

function DriverRoute() {
  const navigate = useNavigate();

  // 2. STATE
  const [loading, setLoading] = useState(true);
  const [tripData, setTripData] = useState(null);
  const [driverInfo, setDriverInfo] = useState({ name: "Tài xế", role: "Đang tải..." });

  // 3. LOGIC API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy User ID an toàn
        const getUserId = () => {
            const direct = localStorage.getItem('user_id');
            if (direct) return direct;
            try {
                const userObj = JSON.parse(localStorage.getItem('user'));
                return userObj?.user_id || userObj?.id;
            } catch(e) { return null; }
        };

        const userId = getUserId();
        
        if (!userId) {
          // Chưa login thì không load data, nhưng khoan hãy redirect để tránh giật màn hình
          // navigate('/login'); 
          return;
        }

        const config = { headers: { 'x-user-id': userId } };

        // A. Lấy Profile (Luôn chạy để Header có tên)
        try {
          const profileRes = await axios.get('http://localhost:3000/api/driver-app/profile/me', config);
          setDriverInfo({ 
            name: profileRes.data.data.name, 
            role: "Tài xế xe buýt" 
          });
        } catch (e) { console.error("Lỗi profile", e); }

        // B. Lấy Lịch trình
        try {
            const scheduleRes = await axios.get('http://localhost:3000/api/driver-app/trips/today', config);
            const trips = scheduleRes.data.data;

            if (trips && trips.length > 0) {
                const currentTripId = trips[0].trip_id; 
                const detailRes = await axios.get(`http://localhost:3000/api/driver-app/trip/details/${currentTripId}`, config);
                setTripData(detailRes.data.data);
            } else {
                setTripData(null);
            }
        } catch (e) {
            setTripData(null);
        }

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const todayStr = useMemo(() => {
    return new Date().toLocaleDateString("vi-VN", { weekday: "long", day: "2-digit", month: "long", year: "numeric" });
  }, []);


  // 4. HÀM QUYẾT ĐỊNH VẼ GÌ Ở GIỮA (CONTENT)
  const renderMainContent = () => {
      // A. Đang tải
      if (loading) {
          return (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mb-4"></div>
                  <p>Đang tải dữ liệu...</p>
              </div>
          );
      }

      // B. Không có dữ liệu (HIỆN CÁI NÀY NHƯNG VẪN GIỮ SIDEBAR/HEADER)
      if (!tripData) {
          return (
              <div className="flex flex-col items-center justify-center h-full p-10 text-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-gray-400">
                      <CalendarX size={40} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Chưa có lịch trình hôm nay</h3>
                  <p className="text-gray-500 mt-2 max-w-md">
                      Bạn chưa được phân công chuyến xe nào. <br/>
                      Bạn có thể kiểm tra lại sau hoặc sử dụng menu bên trái để xem các mục khác.
                  </p>
                  <button 
                      onClick={() => window.location.reload()} 
                      className="mt-6 px-6 py-2.5 bg-indigo-50 text-indigo-600 font-medium rounded-lg hover:bg-indigo-100 transition"
                  >
                      Tải lại trang
                  </button>
              </div>
          );
      }

      // C. Có dữ liệu -> Vẽ giao diện Dashboard đầy đủ
      const { info, stops } = tripData;
      const routeStats = [
          { label: "Trạng thái", value: info.status === 'ongoing' ? "Đang chạy" : "Chờ khởi hành" },
          { label: "Trạm kế", value: stops[0]?.name || "Đích" },
          { label: "Dự kiến đến", value: info.arrival_time ? new Date(info.arrival_time).toLocaleTimeString('vi-VN', {hour:'2-digit', minute:'2-digit'}) : "--:--" },
          { label: "Tốc độ TB", value: "45 km/h" }
      ];
      
      const routeDetails = [
        { k: "Mã chuyến", v: `TRIP-${info.trip_id}` },
        { k: "Biển số xe", v: info.plate_number || "..." },
        { k: "Giờ xuất bến", v: new Date(info.departure_time).toLocaleTimeString('vi-VN', {hour:'2-digit', minute:'2-digit'}) },
        { k: "Số điểm dừng", v: stops.length },
      ];

      return (
        <div className="p-6 space-y-6">
            {/* Thanh điều hướng */}
            <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border">
                <div>
                    <h2 className="text-lg font-bold text-gray-800">Điều khiển lộ trình</h2>
                    <p className="text-sm text-gray-500">Chuyến: {info.route_name}</p>
                </div>
                <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg hover:bg-indigo-700 transition font-medium shadow-sm flex items-center gap-2">
                    <Bus size={18} />
                    {info.status === 'ongoing' ? 'Tiếp tục lộ trình' : 'Bắt đầu chuyến đi'}
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {routeStats.map((s, idx) => (
                    <div key={idx} className="bg-white rounded-xl shadow-sm border p-4">
                        <p className="text-xs font-medium uppercase text-gray-500 mb-1">{s.label}</p>
                        <p className="text-lg font-bold text-gray-900">{s.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2 bg-white rounded-xl border shadow-sm p-1 overflow-hidden">
                    <div className="bg-gray-100 w-full aspect-video rounded-lg flex flex-col items-center justify-center text-gray-500 relative">
                        <MapPin size={32} className="mb-2 text-indigo-500" />
                        <span className="font-medium">Bản đồ trực tuyến</span>
                    </div>
                </div>
                
                <div className="space-y-6">
                    <div className="bg-white rounded-xl border shadow-sm">
                        <div className="px-5 py-3 border-b bg-gray-50 rounded-t-xl">
                            <h4 className="font-semibold text-gray-800">Thông tin chi tiết</h4>
                        </div>
                        <div className="p-5">
                            <dl className="grid grid-cols-2 gap-y-4 gap-x-4">
                                {routeDetails.map((r, i) => (
                                    <div key={i}>
                                        <dt className="text-xs text-gray-500 uppercase">{r.k}</dt>
                                        <dd className="text-sm font-medium text-gray-900 mt-0.5">{r.v}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-xl border shadow-sm flex flex-col h-80">
                        <div className="px-5 py-3 border-b flex items-center gap-2 bg-gray-50 rounded-t-xl">
                            <AlertTriangle size={16} className="text-orange-500" />
                            <h4 className="font-semibold text-gray-800">Lộ trình dừng</h4>
                        </div>
                        <div className="p-0 overflow-y-auto flex-1 custom-scrollbar">
                            {stops.map((s, i) => (
                                <div key={i} className="flex items-center justify-between px-5 py-3 border-b last:border-0 hover:bg-gray-50 transition">
                                    <span className="text-sm font-medium text-gray-800">{s.name}</span>
                                    <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-600 font-medium">Chờ đến</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      );
  };

  // 5. RETURN CHÍNH (QUAN TRỌNG NHẤT)
  // Sidebar và Header nằm NGOÀI hàm renderMainContent -> Luôn luôn hiển thị
  return (
    <div className="flex min-h-screen bg-gray-50">
      
      {/* A. Sidebar (Luôn hiện) */}
      <Sidebar userRole="driver" />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* B. Header (Luôn hiện) */}
        <Header 
            title="Bản đồ tuyến đường" 
            subtitle={todayStr}
            userName={driverInfo.name} 
            userRole={driverInfo.role} 
        />

        {/* C. Content thay đổi (Loading / NoData / Data) */}
        <div className="flex-1 overflow-y-auto">
            {renderMainContent()}
        </div>

      </div> 
    </div>
  );
}

export default DriverRoute;