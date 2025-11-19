import React, { useState, useContext, useEffect } from "react";
import { FaExclamationTriangle, FaTools, FaClock, FaLock } from "react-icons/fa";
import { Phone } from "lucide-react";
import Sidebar from "../../components/Sidebar/Sidebar"; // ⬅️ Dùng Sidebar
import Header from "../../components/Header"; // ⬅️ Dùng Header
import { AppContext } from "../../context/AppContext"; // ⬅️ Dùng Context để lấy user
import { useParams, useNavigate } from "react-router-dom"; // ⬅️ Dùng để lấy trip_id từ URL
import axios from "axios"; // ⬅️ Dùng để gọi API
import { toast } from "react-toastify"; // ⬅️ Dùng để thông báo

// Mảng các nút bấm nhanh
const quickAlerts = [
  { name: "Chậm trễ", type: "delayed", icon: FaClock, color: "text-blue-500" },
  { name: "Kỹ thuật", type: "breakdown", icon: FaTools, color: "text-yellow-500" },
  { name: "An toàn", type: "safety", icon: FaExclamationTriangle, color: "text-orange-500" },
  { name: "Khẩn cấp", type: "emergency", icon: FaLock, color: "text-red-500" },
];

function DriverCanhbao() {
  const { user } = useContext(AppContext); // Lấy thông tin user đã đăng nhập
  const navigate = useNavigate();
  
  // Giả sử em điều hướng đến trang này bằng URL: /driver/issues/:tripId
  // Ví dụ: /driver/issues/4 (Lấy từ trang DriverRoute)
  const { tripId } = useParams(); // Lấy 'tripId' từ URL

  const [formData, setFormData] = useState({
    type: "", // 'delayed', 'breakdown', 'safety', 'emergency'
    priority: "Trung bình", // 'Thấp', 'Trung bình', 'Cao'
    location: "Đang lấy vị trí...",
    description: "",
    delayTime: 0,
  });

  // (Tùy chọn): Tự động lấy vị trí khi trang được tải
  useEffect(() => {
    // Hỏi trình duyệt xin vị trí
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          // Nếu thành công, cập nhật state
          setFormData(prev => ({
            ...prev,
            location: `Vĩ độ: ${pos.coords.latitude.toFixed(4)}, Kinh độ: ${pos.coords.longitude.toFixed(4)}`
          }));
        },
        (err) => {
          // Nếu thất bại
          console.warn("Không thể lấy vị trí:", err.message);
          setFormData(prev => ({ ...prev, location: "Không thể tự động lấy vị trí" }));
        }
      );
    } else {
      console.warn("Trình duyệt không hỗ trợ Geolocation.");
      setFormData(prev => ({ ...prev, location: "Trình duyệt không hỗ trợ" }));
    }
  }, []); // Chạy 1 lần khi mở trang

  // Hàm xử lý khi nhập liệu vào form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Hàm xử lý khi bấm nút "Gửi Báo Cáo"
  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn form tải lại trang
    
    // Kiểm tra đăng nhập (dùng hệ thống loggedInUsers của em)
    if (!user || !user.user_id) {
      toast.error("Bạn phải đăng nhập để gửi cảnh báo!");
      return;
    }
    
    // Kiểm tra dữ liệu
    if (!formData.type || !formData.description) {
      toast.warn("Vui lòng chọn loại sự cố và nhập mô tả.");
      return;
    }

    // Đây là API chúng ta đã thiết kế ở backend
    // POST /api/driver/alert
    try {
      const config = {
        headers: { 'x-user-id': user.user_id } // Header xác thực
      };
      
      const body = {
        trip_id: tripId, // Lấy tripId từ URL
        type: formData.type, // 'delayed', 'breakdown', v.v.
        content: `(Mức độ: ${formData.priority}) ${formData.description}. Trễ dự kiến: ${formData.delayTime} phút.`
      };

      // Gửi API lên backend
      await axios.post('http://localhost:5000/api/driver/alert', body, config);
      
      toast.success("Đã gửi cảnh báo thành công!");
      // Quay về trang bản đồ (hoặc trang lịch trình)
      navigate(tripId ? `/driver/route/${tripId}` : '/driver/schedules'); 
      
    } catch (err) {
      console.error("Lỗi khi gửi cảnh báo:", err);
      toast.error(err.response?.data?.message || "Lỗi khi gửi cảnh báo.");
    }
  };
  
  // Hàm khi bấm vào các nút tắt
  const handleQuickAlertClick = (alertType) => {
    setFormData(prev => ({ ...prev, type: alertType }));
    // Tự động cuộn xuống form
    document.getElementById('report-form').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    // Layout chính
    <div className="flex min-h-screen bg-gray-50">
      {/* 1. Sidebar (Đồng bộ) */}
      <Sidebar userRole="driver" />

      {/* 2. Main Content */}
      <div className="flex-1">
        {/* Header (Đồng bộ) */}
        {/* Giả sử Header của em tự lấy thông tin user từ Context */}
        <Header />

        {/* 3. Nội dung trang (Đã dùng Tailwind) */}
        <div className="p-6 space-y-6">
          
          {/* Tiêu đề trang */}
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Cảnh Báo Sự Cố</h1>
            <p className="text-sm text-gray-500">Báo cáo các sự cố trong lúc vận hành.</p>
          </div>

          {/* Các nút bấm nhanh (Quick Buttons) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickAlerts.map((alert) => (
              <button
                key={alert.type}
                onClick={() => handleQuickAlertClick(alert.name)}
                className={`bg-white rounded-xl shadow-sm border p-6 flex flex-col items-center justify-center text-gray-700 hover:shadow-lg transition-all duration-200 cursor-pointer
                            ${formData.type === alert.name ? 'ring-2 ring-indigo-500 border-indigo-500' : 'hover:bg-gray-50'}`}
              >
                <alert.icon className={`w-8 h-8 ${alert.color}`} />
                <span className="mt-3 font-semibold text-lg">{alert.name}</span>
              </button>
            ))}
          </div>

          {/* Phần nội dung chính (Form và Liên hệ) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Form báo cáo sự cố (Bên trái) */}
            <div id="report-form" className="lg:col-span-2 bg-white rounded-xl shadow-sm border">
              <div className="px-6 py-4 border-b">
                <h3 className="text-lg font-semibold text-gray-800">Báo cáo sự cố mới</h3>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* Hàng 1: Loại sự cố & Mức nghiêm trọng */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                      Loại sự cố
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="">-- Chọn loại sự cố --</option>
                      <option value="delayed">Chậm trễ</option>
                      <option value="breakdown">Kỹ thuật</option>
                      <option value="safety">An toàn</option>
                      <option value="emergency">Khẩn cấp</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                      Mức nghiêm trọng
                    </label>
                    <select
                      id="priority"
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option>Trung bình</option>
                      <option>Thấp</option>
                      <option>Cao</option>
                    </select>
                  </div>
                </div>

                {/* Hàng 2: Vị trí */}
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Vị trí hiện tại
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    readOnly
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-gray-100"
                  />
                </div>

                {/* Hàng 3: Mô tả */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Mô tả chi tiết <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows="3"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Mô tả ngắn gọn về sự cố (ví dụ: Kẹt xe tại ngã tư Hàng Xanh, ...)"
                  ></textarea>
                </div>

                {/* Hàng 4: Thời gian trễ */}
                <div>
                  <label htmlFor="delayTime" className="block text-sm font-medium text-gray-700 mb-1">
                    Dự kiến thời gian chậm trễ (phút)
                  </label>
                  <input
                    type="number"
                    id="delayTime"
                    name="delayTime"
                    value={formData.delayTime}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="0"
                  />
                </div>

                {/* Hàng 5: Nút bấm */}
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => navigate(-1)} // Nút "Hủy" sẽ quay lại trang trước
                    className="bg-white border border-gray-300 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-50 transition"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
                  >
                    Gửi Báo Cáo
                  </button>
                </div>
              </form>
            </div>

            {/* Liên hệ khẩn cấp (Bên phải) */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-xl shadow-sm border">
                <div className="px-6 py-4 border-b">
                  <h3 className="text-lg font-semibold text-gray-800">Liên hệ khẩn cấp</h3>
                </div>
                <div className="p-6 space-y-4">
                  <div className="bg-rose-50 border-l-4 border-rose-500 p-4 rounded">
                    <p className="text-sm font-semibold text-rose-800">Hotline Hỗ Trợ</p>
                    <p className="text-lg font-bold text-rose-700">1900 1234</p>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                    <p className="text-sm font-semibold text-blue-800">Quản lí tuyến (Nguyễn Văn A)</p>
                    <p className="text-lg font-bold text-blue-700">0905 123 456</p>
                  </div>
                  {/* Nút này sẽ mở app gọi điện trên điện thoại */}
                  <a href="tel:19001234" className="w-full flex items-center justify-center gap-2 bg-red-600 text-white px-5 py-3 rounded-lg hover:bg-red-700 transition font-semibold">
                    <Phone size={18} />
                    Gọi Ngay
                  </a>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default DriverCanhbao;