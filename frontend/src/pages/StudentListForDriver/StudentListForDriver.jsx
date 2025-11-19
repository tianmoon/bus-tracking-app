import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Dùng để chuyển trang nếu chưa đăng nhập
import { Bell, Bus, User, CheckCircle } from 'lucide-react';
import axios from 'axios';

// ⚠️ IMPORT HEADER COMPONENT CỦA EM Ở ĐÂY
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header"; 

function StudentListForDriver() {
    const navigate = useNavigate();

    // --- STATE ---
    const [loading, setLoading] = useState(true);
    const [students, setStudents] = useState([]);
    const [driverInfo, setDriverInfo] = useState({ name: "Tài xế", role: "Đang tải..." });
    const [currentTripId, setCurrentTripId] = useState(null); // Lưu Trip ID tìm được

    // --- LOGIC API ---
    useEffect(() => {
        const fetchAllData = async () => {
            try {
                // 1. LẤY USER ID AN TOÀN (Giống trang Route)
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
                    navigate('/login');
                    return;
                }
                const config = { headers: { 'x-user-id': userId } };

                // A. LẤY PROFILE (Để hiện tên lên Header)
                try {
                    const profileRes = await axios.get('http://localhost:3000/api/driver-app/profile/me', config);
                    setDriverInfo({ 
                        name: profileRes.data.data.name, 
                        role: "Tài xế xe buýt" 
                    });
                } catch (e) { console.error("Lỗi profile", e); }

                // B. TÌM CHUYẾN ĐI HÔM NAY
                const scheduleRes = await axios.get('http://localhost:3000/api/driver-app/trips/today', config);
                const trips = scheduleRes.data.data;

                if (trips && trips.length > 0) {
                    const tripId = trips[0].trip_id; 
                    setCurrentTripId(tripId); // Lưu Trip ID

                    // C. LẤY DANH SÁCH HỌC SINH
                    const detailRes = await axios.get(`http://localhost:3000/api/driver-app/trip/details/${tripId}`, config);
                    setStudents(detailRes.data.data.students);
                } else {
                    setStudents([]);
                }

            } catch (err) {
                console.error("Lỗi tải dữ liệu:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchAllData();
    }, [navigate]);

    // 2. Xử lý điểm danh
    const handlePickup = async (studentId) => {
        if (!currentTripId) return; // Không có chuyến thì không điểm danh

        try {
            await axios.post('http://localhost:3000/api/driver-app/report/status', {
                trip_id: currentTripId, // Dùng Trip ID vừa tìm được
                student_id: studentId,
                status: 'picked_up'
            }, {
                headers: { 'x-user-id': localStorage.getItem('user_id') }
            });

            // Cập nhật giao diện ngay lập tức
            setStudents(prev => prev.map(s => 
                s.student_id === studentId ? { ...s, current_status: 'picked_up' } : s
            ));
        } catch (error) {
            alert("Lỗi cập nhật: " + (error.response?.data?.message || error.message));
        }
    };

    // --- RENDER CONTENT ---
    const renderTableContent = () => {
        if (loading) return <p className="p-6 text-center text-gray-500">Đang tải danh sách học sinh...</p>;
        
        if (students.length === 0) {
            return (
                <div className="text-center py-12 text-gray-500">
                    <User size={32} className="mx-auto mb-3" />
                    <p>{currentTripId ? "Không có học sinh nào trên chuyến này." : "Bạn chưa có chuyến đi hôm nay."}</p>
                    <button onClick={() => window.location.reload()} className="mt-3 text-indigo-600 hover:underline">Tải lại</button>
                </div>
            );
        }

        return (
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-indigo-600 text-white">
                        <tr>
                            <th className="px-6 py-4 text-left font-semibold">Id</th>
                            <th className="px-6 py-4 text-left font-semibold">Tên</th>
                            <th className="px-6 py-4 text-left font-semibold">Lớp</th>
                            <th className="px-6 py-4 text-left font-semibold">Trạng thái</th>
                            <th className="px-6 py-4 text-left font-semibold">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student.student_id} className="border-b hover:bg-gray-50">
                                <td className="px-6 py-4">{student.student_id}</td>
                                <td className="px-6 py-4 font-medium">{student.name}</td>
                                <td className="px-6 py-4">{student.grade}</td>
                                <td className="px-6 py-4">
                                    {student.current_status === 'picked_up' ? (
                                        <span className="text-green-600 font-bold">Đã lên xe</span>
                                    ) : (
                                        <span className="text-gray-400 italic">Chưa đón</span>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    {student.current_status !== 'picked_up' ? (
                                        <button 
                                            onClick={() => handlePickup(student.student_id)}
                                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
                                            Xác nhận đón
                                        </button>
                                    ) : (
                                        <span className="text-green-600 flex items-center gap-1">
                                            <CheckCircle size={16} /> Hoàn tất
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* A. Sidebar */}
            <Sidebar userRole='driver'/>

            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* B. Header (Tái sử dụng Component) */}
                <Header 
                    title="Học sinh" 
                    subtitle="Tổng quan danh sách học sinh"
                    userName={driverInfo.name} 
                    userRole={driverInfo.role} 
                />

                <div className="flex-1 overflow-y-auto p-6">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="bg-white border-b px-6 py-4">
                            <h2 className="text-xl font-semibold">Danh sách học sinh trên xe</h2>
                        </div>
                        {/* C. Nội dung bảng (Đã fix) */}
                        {renderTableContent()}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default StudentListForDriver;