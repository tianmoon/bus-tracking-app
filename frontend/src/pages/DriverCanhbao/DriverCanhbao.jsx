import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import Header from "../../components/Header.jsx";
import { AlertTriangle, Wrench, Clock, ShieldAlert, MapPin, Navigation } from "lucide-react"; // Dùng lucide-react cho đồng bộ với Header
import axios from "axios";
import { toast } from "react-toastify";

const DriverCanhbao = () => {
  const [loading, setLoading] = useState(false);
  
  // State quản lý form
  const [formData, setFormData] = useState({
    uiType: '',       // Loại hiển thị trên UI (chậm trễ, kỹ thuật...)
    severity: 'Bình thường',
    location: '',
    description: '',
    delayTime: 0
  });

  // 1. Tự động lấy vị trí GPS khi vào trang
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = `${position.coords.latitude}, ${position.coords.longitude}`;
          setFormData(prev => ({ ...prev, location: coords }));
          toast.success("Đã cập nhật vị trí hiện tại!");
        },
        (error) => {
          console.error("Lỗi GPS:", error);
          toast.warn("Không thể lấy vị trí tự động. Hãy nhập tay.");
        }
      );
    }
  }, []);

  // Xử lý chọn loại sự cố nhanh
  const handleTypeSelect = (type) => {
    setFormData(prev => ({ ...prev, uiType: type }));
  };

  // Xử lý nhập liệu form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 2. GỬI CẢNH BÁO (Kết nối API & DB)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.uiType) return toast.warning("Vui lòng chọn loại sự cố!");

    // --- LOGIC MAPPING QUAN TRỌNG ---
    // DB chỉ chấp nhận: 'delayed', 'arrival', 'breakdown'
    // UI của em có: 'chậm trễ', 'kỹ thuật', 'an toàn', 'khẩn cấp'
    let dbType = 'breakdown'; // Mặc định là sự cố
    
    if (formData.uiType === 'chậm trễ') dbType = 'delayed';
    // Các trường hợp 'kỹ thuật', 'an toàn', 'khẩn cấp' đều quy về 'breakdown' 
    // để Admin biết đây là sự cố xe/vận hành.
    
    try {
      setLoading(true);
      
      // Giả định TripID (Em có thể lấy từ LocalStorage hoặc Context nếu đã lưu lúc đăng nhập)
      const tripId = 1; 

      // Nội dung chi tiết gửi lên
      const contentString = `[${formData.uiType.toUpperCase()}] - Mức độ: ${formData.severity}. ${formData.description}. Dự kiến trễ: ${formData.delayTime}p. Tại: ${formData.location}`;

      // Gọi API tạo Notification (API này sẽ tự bắn Socket cho Admin như thầy đã chỉ ở bước trước)
      const response = await axios.post('http://localhost:5000/api/notifications', {
        tripId: tripId,
        type: dbType,    // delayed hoặc breakdown
        content: contentString
      });

      if (response.data.status === 'success') {
        toast.success("Đã gửi báo cáo sự cố thành công!");
        // Reset form nhưng giữ lại vị trí
        setFormData({
          uiType: '',
          severity: 'Bình thường',
          location: formData.location,
          description: '',
          delayTime: 0
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Lỗi kết nối đến máy chủ!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar đồng bộ */}
      <Sidebar userRole="driver" />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header đồng bộ */}
        <Header title="Báo cáo sự cố" userRole="Tài xế" />

        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-4xl mx-auto">
            
            {/* Banner cảnh báo */}
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg">
              <div className="flex items-center gap-3">
                <div className="bg-red-100 p-2 rounded-full text-red-600">
                    <AlertTriangle size={24} />
                </div>
                <div>
                    <h3 className="text-red-800 font-bold text-lg uppercase">Hệ thống cảnh báo khẩn cấp</h3>
                    <p className="text-red-600 text-sm">Báo cáo này sẽ được gửi trực tiếp đến Admin và Phụ huynh liên quan.</p>
                </div>
              </div>
            </div>

            {/* Buttons Group - Chọn nhanh loại sự cố */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <IncidentButton 
                icon={<Clock size={24} />} 
                label="chậm trễ" 
                active={formData.uiType === 'chậm trễ'} 
                onClick={() => handleTypeSelect('chậm trễ')}
                color="text-orange-600 bg-orange-50 border-orange-200"
              />
              <IncidentButton 
                icon={<Wrench size={24} />} 
                label="kỹ thuật" 
                active={formData.uiType === 'kỹ thuật'} 
                onClick={() => handleTypeSelect('kỹ thuật')}
                color="text-gray-600 bg-gray-50 border-gray-200"
              />
              <IncidentButton 
                icon={<ShieldAlert size={24} />} 
                label="an toàn" 
                active={formData.uiType === 'an toàn'} 
                onClick={() => handleTypeSelect('an toàn')}
                color="text-blue-600 bg-blue-50 border-blue-200"
              />
              <IncidentButton 
                icon={<AlertTriangle size={24} />} 
                label="khẩn cấp" 
                active={formData.uiType === 'khẩn cấp'} 
                onClick={() => handleTypeSelect('khẩn cấp')}
                color="text-red-600 bg-red-50 border-red-200"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Form Section - Chiếm 2 phần */}
              <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="font-bold text-gray-800 mb-5 border-b pb-3 flex items-center gap-2">
                    <Navigation size={20} className="text-indigo-600"/> 
                    Chi tiết sự cố mới
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Loại sự cố</label>
                        <input 
                            type="text" 
                            value={formData.uiType ? formData.uiType.toUpperCase() : "CHƯA CHỌN"} 
                            readOnly 
                            className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 font-bold text-indigo-600 text-sm" 
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Mức nghiêm trọng</label>
                        <select 
                            name="severity" 
                            value={formData.severity}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                        >
                            <option>Bình thường</option>
                            <option>Cao</option>
                            <option className="text-red-600 font-bold">Nguy hiểm</option>
                        </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Vị trí hiện tại</label>
                    <div className="relative">
                        <input 
                            type="text" 
                            name="location" 
                            value={formData.location} 
                            onChange={handleChange} 
                            className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none text-sm" 
                            placeholder="Đang lấy tọa độ..." 
                        />
                        <MapPin size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Mô tả chi tiết</label>
                    <textarea 
                        name="description" 
                        value={formData.description} 
                        onChange={handleChange} 
                        rows="3" 
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none text-sm" 
                        placeholder="Mô tả chuyện gì đang xảy ra..."
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Dự kiến trễ (phút)</label>
                    <input 
                        type="number" 
                        name="delayTime" 
                        value={formData.delayTime} 
                        onChange={handleChange} 
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none text-sm" 
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button 
                        type="submit" 
                        disabled={loading} 
                        className="flex-1 bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-lg active:scale-95 disabled:bg-gray-400"
                    >
                        {loading ? 'ĐANG GỬI...' : 'GỬI BÁO CÁO'}
                    </button>
                    <button 
                        type="button" 
                        onClick={() => setFormData(prev => ({...prev, description: '', uiType: ''}))}
                        className="px-6 bg-gray-100 text-gray-600 font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        HỦY
                    </button>
                  </div>
                </form>
              </div>

              {/* Contact Section - Chiếm 1 phần */}
              <div className="md:col-span-1 space-y-4">
                <div className="bg-red-50 p-5 rounded-xl border border-red-100 h-full">
                    <h4 className="font-bold text-red-800 mb-4 flex items-center gap-2">
                        <AlertTriangle size={20}/> Liên hệ khẩn cấp
                    </h4>
                    <div className="space-y-3">
                        <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-pink-500">
                            <p className="text-xs text-gray-500 uppercase font-bold">Hotline hỗ trợ</p>
                            <p className="font-bold text-xl text-red-600 tracking-wider">1900 8888</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-indigo-500">
                            <p className="text-xs text-gray-500 uppercase font-bold">Quản lý tuyến</p>
                            <p className="font-bold text-gray-800">Nguyễn Văn A</p>
                            <p className="text-sm text-indigo-600 font-semibold">0987 654 321</p>
                        </div>
                    </div>
                    <button className="w-full mt-6 bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 shadow-md animate-pulse">
                        GỌI NGAY
                    </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

// Component con hiển thị nút bấm
const IncidentButton = ({ icon, label, active, onClick, color }) => (
    <button 
        type="button" 
        onClick={onClick} 
        className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 shadow-sm hover:shadow-md
            ${active 
                ? `ring-2 ring-offset-2 ring-indigo-500 ${color} border-transparent bg-opacity-100` 
                : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50'
            }`}
    >
        <div className={`p-2 rounded-full ${active ? 'bg-white bg-opacity-20' : 'bg-gray-100'}`}>
            {icon}
        </div>
        <span className="font-bold uppercase text-xs tracking-wide">{label}</span>
    </button>
);

export default DriverCanhbao;