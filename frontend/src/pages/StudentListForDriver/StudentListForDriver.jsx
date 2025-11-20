import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';

// Import các component chung
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header";

function StudentListForDriver() {
    const { tripId } = useParams();
    const navigate = useNavigate();

    // State lưu thông tin
    const [driverInfo, setDriverInfo] = useState({ name: "Tài xế", role: "Đang tải..." });
    const [tripInfo, setTripInfo] = useState(null);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    // 1. LẤY DỮ LIỆU TỪ API KHI VÀO TRANG
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Lấy thông tin tài xế từ LocalStorage
                const storedUser = localStorage.getItem('user');
                if (!storedUser) return;
                const currentUser = JSON.parse(storedUser);

                setDriverInfo({ name: currentUser.name || "Tài xế", role: "Tài xế xe buýt" });

                // Gọi API lấy danh sách học sinh theo Trip ID
                // (Backend cần trả về JSON: { data: { trip: {...}, students: [...] } })
                const res = await axios.get(`http://localhost:5000/api/trips/${tripId}/students`);
                
                if (res.data.status === 'success') {
                    setStudents(res.data.data.students);
                    setTripInfo(res.data.data.trip);
                }
            } catch (error) {
                console.error("Lỗi tải dữ liệu:", error);
                toast.error("Không thể tải danh sách học sinh.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [tripId]);

    // 2. HÀM XỬ LÝ NÚT BẤM TRẠNG THÁI (ĐƠN GIẢN HÓA)
    // Logic: Chưa đón -> Đã đón -> Đã trả
    const handleStatusChange = async (studentId, currentStatus) => {
        let newStatus = 'picked_up'; // Mặc định bấm vào là "Đã đón"
        
        if (currentStatus === 'picked_up') {
            newStatus = 'dropped_off'; // Nếu đang là "Đã đón" thì bấm tiếp thành "Đã trả"
        } else if (currentStatus === 'dropped_off') {
             return; // Đã trả rồi thì thôi (hoặc bạn muốn cho phép quay lại thì sửa ở đây)
        }

        try {
            // Gọi API cập nhật
            await axios.post(`http://localhost:5000/api/reports/update-status`, {
                trip_id: tripId,
                student_id: studentId,
                status: newStatus
            });

            // Cập nhật giao diện ngay lập tức (không cần load lại trang)
            setStudents(prev => prev.map(s => 
                s.id === studentId ? { ...s, status: newStatus } : s
            ));
            
            if (newStatus === 'picked_up') toast.success("Đã đón học sinh lên xe");
            if (newStatus === 'dropped_off') toast.success("Đã trả học sinh xuống xe");

        } catch (error) {
            console.error("Lỗi cập nhật:", error);
            toast.error("Lỗi kết nối server");
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50 font-sans">
            {/* Sidebar dùng chung */}
            <Sidebar userRole='driver' />

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Header dùng chung */}
                <Header 
                    title="Danh sách học sinh trong ngày" 
                    subtitle={new Date().toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                    userName={driverInfo.name}
                    userRole={driverInfo.role}
                />

                <div className="flex-1 overflow-y-auto">
                    
                    {/* Thanh tiêu đề điểm đón (Giống ảnh mẫu màu xanh) */}
                    <div className="bg-indigo-600 text-white px-6 py-4 flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-3">
                            <button onClick={() => navigate(-1)} className="hover:bg-indigo-700 p-1 rounded-full transition" title="Quay lại">
                                <ArrowLeft size={24} />
                            </button>
                            <h2 className="text-xl font-bold">
                                {tripInfo ? `Điểm đón: ${tripInfo.start_point || '...'}` : "Đang tải thông tin..."}
                            </h2>
                        </div>
                        {tripInfo && (
                            <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                                Xe: {tripInfo.plate_number}
                            </span>
                        )}
                    </div>

                    {/* Tiêu đề bảng (Màu xám nhạt giống ảnh) */}
                    <div className="bg-gray-200 px-6 py-3 border-b border-gray-300">
                        <h3 className="font-bold text-gray-700">Danh sách học sinh</h3>
                    </div>

                    {/* Bảng danh sách */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                {/* Header bảng màu xanh đậm giống ảnh */}
                                <tr className="bg-indigo-600 text-white">
                                    <th className="px-6 py-4 text-left font-bold w-20">Id</th>
                                    <th className="px-6 py-4 text-left font-bold">Tên</th>
                                    <th className="px-6 py-4 text-left font-bold w-32">Lớp</th>
                                    <th className="px-6 py-4 text-right font-bold w-48">Tình trạng</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {loading ? (
                                    <tr><td colSpan="4" className="px-6 py-8 text-center text-gray-500">Đang tải danh sách...</td></tr>
                                ) : students.length === 0 ? (
                                    <tr><td colSpan="4" className="px-6 py-8 text-center text-gray-500">Chưa có dữ liệu học sinh.</td></tr>
                                ) : (
                                    students.map((student) => (
                                        <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-gray-900">{student.id}</td>
                                            <td className="px-6 py-4 font-bold text-gray-800">{student.name}</td>
                                            <td className="px-6 py-4 font-medium text-gray-600">{student.class}</td>
                                            
                                            {/* Cột Tình Trạng (Chứa nút bấm) */}
                                            <td className="px-6 py-4 text-right">
                                                <StatusButton 
                                                    status={student.status} 
                                                    onClick={() => handleStatusChange(student.id, student.status)} 
                                                />
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Component Nút Trạng Thái (Thay đổi màu sắc và chữ dựa trên status)
const StatusButton = ({ status, onClick }) => {
    let bgClass = "bg-gray-200 hover:bg-gray-300 text-gray-600"; // Mặc định (Chưa đón)
    let text = "Chưa đón";

    if (status === 'picked_up') {
        bgClass = "bg-green-500 hover:bg-green-600 text-white shadow-md"; // Màu xanh lá (Đã đón)
        text = "Đã đón";
    } else if (status === 'dropped_off') {
        bgClass = "bg-indigo-500 hover:bg-indigo-600 text-white shadow-md"; // Màu xanh dương (Đã trả)
        text = "Đã trả";
    }

    return (
        <button 
            onClick={onClick}
            className={`px-4 py-2 rounded font-bold text-sm transition-all active:scale-95 ${bgClass}`}
            style={{ minWidth: '100px', textAlign: 'center' }}
        >
            {text}
        </button>
    );
};

export default StudentListForDriver;