import React, { useState, useEffect, useContext } from "react";
// Giả sử file CSS cũ của em không cần nữa vì dùng Tailwind
// import "./DashboardTaixe.css"; 
import { FaBus, FaRegClock, FaRoute, FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // ⬅️ Dùng để chuyển trang
import Sidebar from "../../components/Sidebar/Sidebar"; // ⬅️ Dùng Sidebar
import Header from "../../components/Header";   // ⬅️ Dùng Header
import { AppContext } from "../../context/AppContext"; // ⬅️ Dùng để lấy user
import axios from "axios"; // ⬅️ Dùng để gọi API
import { toast } from "react-toastify"; // ⬅️ Dùng để thông báo

// Hàm helper để format giờ (ví dụ: 06:00)
const formatTime = (dateTimeString) => {
  if (!dateTimeString) return "N/A";
  const date = new Date(dateTimeString);
  return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
};

// Hàm helper để lấy ngày hôm nay
const getTodayDate = () => {
  return new Date().toLocaleDateString('vi-VN', { 
    weekday: 'long', 
    day: '2-digit', 
    month: 'long', 
    year: 'numeric' 
  });
};

function DashboardTaixe() {
  // === 1. TẠO CÁC STATE ĐỂ LƯU DỮ LIỆU ===
  const [trips, setTrips] = useState([]); // Lưu danh sách chuyến (Chuyến sáng, chiều)
  const [loading, setLoading] = useState(true); // Trạng thái "Đang tải..."
  const [error, setError] = useState(null); // Báo lỗi nếu API hỏng

  const { user } = useContext(AppContext); // Lấy user đã đăng nhập
  const navigate = useNavigate(); // Dùng để chuyển trang

  // === 2. GỌI API KHI TRANG ĐƯỢC MỞ ===
  useEffect(() => {
    // Nếu chưa đăng nhập (chưa có user_id), không làm gì cả
    if (!user || !user.user_id) {
      setLoading(false);
      setError("Vui lòng đăng nhập để xem lịch trình.");
      // Em có thể thêm: navigate('/'); để đá về trang login
      return;
    }

    const fetchTrips = async () => {
      setLoading(true);
      setError(null);
      
      // Tạo "thẻ tên" (header) để xác thực theo cách của em
      const config = {
        headers: { 'x-user-id': user.user_id }
      };

      try {
        // Gọi API mà chúng ta đã test bằng Postman
        const tripsRes = await axios.get('http://localhost:5000/api/driver/trips/today', config);

        // Lưu dữ liệu lấy được từ "Nhà bếp" vào state
        setTrips(tripsRes.data.data);

      } catch (err) {
        console.error("Lỗi khi tải lịch trình:", err);
        setError("Không thể tải được lịch trình. Vui lòng thử lại.");
        toast.error("Không thể tải được lịch trình.");
      } finally {
        setLoading(false); // Dừng loading, dù thành công hay thất bại
      }
    };

    fetchTrips();
  }, [user]); // Chạy lại hàm này khi 'user' thay đổi (tức là sau khi login)

  // === 3. HÀM XỬ LÝ KHI BẤM VÀO 1 CHUYẾN ===
  const handleTripClick = (tripId) => {
    // Chuyển trang sang trang "Chi Tiết Tuyến" của em
    // và mang theo "trip_id" trên URL
    // (Lưu ý: Em phải sửa App.js thành /driver/route/:id)
    navigate(`/driver/route/${tripId}`); 
  };

  // === 4. HÀM ĐỂ "VẼ" NỘI DUNG CHÍNH ===
  const renderContent = () => {
    // Trạng thái đang tải...
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <FaSpinner className="animate-spin text-indigo-600" size={40} />
          <span className="ml-3 text-lg text-gray-700">Đang tải lịch làm việc...</span>
        </div>
      );
    }

    // Trạng thái lỗi
    if (error) {
      return (
        <div className="flex justify-center items-center h-64">
          <span className="text-lg text-red-600">{error}</span>
        </div>
      );
    }

    // Trạng thái không có chuyến (Admin chưa phân công)
    if (trips.length === 0) {
      return (
        <div className="text-center text-gray-500 py-20">
          <FaBus size={60} className="mx-auto text-gray-300" />
          <h3 className="mt-4 text-xl font-semibold">Hôm nay không có lịch</h3>
          <p className="mt-2">Bạn không có chuyến đi nào được phân công cho hôm nay.</p>
        </div>
      );
    }

    // Trạng thái CÓ CHUYẾN (Dùng .map để vẽ)
    return (
      <div className="space-y-6">
        {trips.map((trip) => (
          // Đây là 1 "Thẻ Chuyến Đi"
          <div 
            key={trip.trip_id}
            onClick={() => handleTripClick(trip.trip_id)} // ⬅️ Bấm vào là chuyển trang
            className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-indigo-500 transition-all duration-200 cursor-pointer"
          >
            {/* Tiêu đề Thẻ (Tên tuyến và Trạng thái) */}
            <div className={`px-6 py-4 border-b rounded-t-xl ${
              trip.status === 'ongoing' ? 'bg-yellow-50' : 'bg-gray-50'
            }`}>
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-indigo-700">
                  {trip.route_name || 'Chuyến đi'}
                </h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  trip.status === 'ongoing' ? 'bg-yellow-200 text-yellow-800' : 
                  trip.status === 'completed' ? 'bg-green-200 text-green-800' :
                  trip.status === 'cancelled' ? 'bg-red-200 text-red-800' :
                  'bg-gray-200 text-gray-800'
                }`}>
                  {/* Chuyển tên tiếng Anh sang tiếng Việt */}
                  {trip.status === 'ongoing' ? 'Đang diễn ra' : 
                   trip.status === 'completed' ? 'Đã hoàn thành' :
                   trip.status === 'cancelled' ? 'Đã hủy' :
                   'Chưa bắt đầu'}
                </span>
              </div>
            </div>
            
            {/* Thông tin chi tiết Thẻ */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Cột 1: Giờ */}
              <div className="flex items-center gap-3">
                <FaRegClock className="text-blue-500" size={20} />
                <div>
                  <p className="text-sm text-gray-500">Giờ khởi hành</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {formatTime(trip.departure_time)}
                  </p>
                </div>
              </div>
              {/* Cột 2: Tuyến */}
              <div className="flex items-center gap-3">
                <FaRoute className="text-green-500" size={20} />
                <div>
                  <p className="text-sm text-gray-500">Tuyến đường</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {trip.route_name}
                  </p>
                </div>
              </div>
              {/* Cột 3: Xe */}
              <div className="flex items-center gap-3">
                <FaBus className="text-orange-500" size={20} />
                <div>
                  <p className="text-sm text-gray-500">Biển số xe</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {trip.plate_number || 'Chưa gán xe'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // === 5. JSX CHÍNH (LAYOUT) ===
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* 1. Sidebar (Đồng bộ) */}
      <Sidebar userRole="driver" />

      {/* 2. Main Content */}
      <div className="flex-1">
        {/* Header (Đồng bộ) */}
        {/* Giả sử Header của em tự lấy thông tin user từ Context */}
        <Header />

        {/* 3. Nội dung trang */}
        <div className="p-6">
          {/* Tiêu đề trang */}
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Lịch Làm Việc Của Tôi</h1>
            <p className="text-sm text-gray-500">
              {getTodayDate()}
            </p>
          </div>

          {/* Phần hiển thị Lịch trình (đã gọi API) */}
          <div className="mt-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardTaixe;