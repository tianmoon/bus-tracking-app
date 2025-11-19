import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Bell, CheckCircle, Bus, CalendarX, AlertTriangle } from "lucide-react";

// 1. IMPORT CÁC COMPONENT
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header"; // Đảm bảo đường dẫn đúng

function DriverTripReport() {
  const navigate = useNavigate();

  // 2. STATE
  const [loading, setLoading] = useState(true);
  const [reportData, setReportData] = useState(null);
  const [driverInfo, setDriverInfo] = useState({ name: "Tài xế", role: "Đang tải..." });

  // 3. LOGIC API (Giống hệt trang Route)
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
            // navigate('/login'); 
            return;
        }

        const config = { headers: { 'x-user-id': userId } };

        // A. Lấy Profile
        try {
            const profileRes = await axios.get('http://localhost:3000/api/driver-app/profile/me', config);
            setDriverInfo({ 
                name: profileRes.data.data.name, 
                role: "Tài xế xe buýt" 
            });
        } catch (e) { console.error("Lỗi profile", e); }

        // B. Lấy Báo cáo chuyến đi (Dựa vào chuyến hôm nay)
        try {
            const scheduleRes = await axios.get('http://localhost:3000/api/driver-app/trips/today', config);
            const trips = scheduleRes.data.data;

            if (trips && trips.length > 0) {
                // Lấy trip_id mới nhất
                const currentTripId = trips[0].trip_id; 
                
                // Gọi API chi tiết (Vì API này trả về cả summary và students)
                const detailRes = await axios.get(`http://localhost:3000/api/driver-app/trip/details/${currentTripId}`, config);
                setReportData(detailRes.data.data);
            } else {
                setReportData(null);
            }
        } catch (e) {
            setReportData(null);
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
    try {
      return new Date().toLocaleDateString("vi-VN", {
        weekday: "long", day: "2-digit", month: "long", year: "numeric",
      });
    } catch { return "Hôm nay"; }
  }, []);

  // 4. HÀM RENDER NỘI DUNG CHÍNH
  const renderMainContent = () => {
    // A. Đang tải
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mb-4"></div>
                <p>Đang tải báo cáo...</p>
            </div>
        );
    }

    // B. Không có dữ liệu
    if (!reportData) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-10 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-gray-400">
                    <CalendarX size={40} />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Chưa có dữ liệu báo cáo</h3>
                <p className="text-gray-500 mt-2 max-w-md">
                    Bạn chưa thực hiện chuyến xe nào hôm nay để tạo báo cáo.
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

    // C. Có dữ liệu -> Hiển thị Báo cáo
    const { summary, stops } = reportData;

    return (
        <div className="p-6 space-y-6">
            {/* Thẻ tóm tắt nhanh (Dashboard Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 flex flex-col items-center justify-center shadow-sm">
                    <p className="text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">Tổng học sinh</p>
                    <p className="text-4xl font-extrabold text-blue-800">{summary.total}</p>
                </div>
                <div className="bg-green-50 p-5 rounded-xl border border-green-100 flex flex-col items-center justify-center shadow-sm">
                    <p className="text-green-600 text-xs font-bold uppercase tracking-wider mb-1">Đã đón</p>
                    <p className="text-4xl font-extrabold text-green-800">{summary.picked_up}</p>
                </div>
                <div className="bg-red-50 p-5 rounded-xl border border-red-100 flex flex-col items-center justify-center shadow-sm">
                    <p className="text-red-600 text-xs font-bold uppercase tracking-wider mb-1">Vắng mặt</p>
                    <p className="text-4xl font-extrabold text-red-800">{summary.absent}</p>
                </div>
            </div>

            {/* Danh sách trạm dừng đã qua */}
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <div className="px-6 py-4 border-b bg-gray-50 flex items-center gap-2">
                    <CheckCircle size={18} className="text-green-600" />
                    <h2 className="text-lg font-bold text-gray-800">Tiến độ các điểm dừng</h2>
                </div>
                
                <div className="p-0">
                    {stops.map((stop, index) => (
                        <div key={index} className="p-5 border-b last:border-0 hover:bg-gray-50 transition">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">
                                        {stop.order_index}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800 text-lg">{stop.name}</h4>
                                        <p className="text-sm text-gray-500 flex items-center gap-1">
                                            <MapPin size={14} /> {stop.address || "Không có địa chỉ"}
                                        </p>
                                    </div>
                                </div>
                                
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wide w-fit">
                                    <CheckCircle size={14} />
                                    Đã hoàn thành
                                </span>
                            </div>

                            {/* Grid thông tin con */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-gray-50 rounded-lg p-3 mt-2">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase">Thời gian đến</p>
                                    <p className="text-sm font-semibold text-gray-900">07:00</p> {/* Mock data hoặc lấy từ API nếu có */}
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase">Trạng thái</p>
                                    <p className="text-sm font-semibold text-green-600">Đúng giờ</p>
                                </div>
                                {/* Có thể thêm các thông tin khác nếu API trả về */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
  };

  // 5. RETURN LAYOUT (Sidebar + Header cố định)
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* A. Sidebar */}
      <Sidebar userRole="driver" />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* B. Header */}
        <Header 
            title="Báo cáo chuyến đi" 
            subtitle={todayStr}
            userName={driverInfo.name} 
            userRole={driverInfo.role} 
        />

        {/* C. Nội dung */}
        <div className="flex-1 overflow-y-auto">
            {renderMainContent()}
        </div>
      </div>
    </div>
  );
}

export default DriverTripReport;