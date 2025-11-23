import React, { useEffect, useState, useContext } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar.jsx';
import Header from '../../components/Header.jsx';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import { ChevronDown, ChevronUp, Bus, MapPin, CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';

// --- COMPONENT CON: HIỂN THỊ HỌC SINH CỦA 1 CHUYẾN ---
const TripStudentList = ({ tripId }) => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/students/trip/${tripId}`);
                if (res.data.status === 'success') setStudents(res.data.data);
            } catch (err) { console.error(err); } 
            finally { setLoading(false); }
        };
        fetchStudents();
    }, [tripId]);

    const handleStatusUpdate = async (studentId, nextStatus) => {
        try {
            await axios.post('http://localhost:5000/api/students/status', {
                tripId, studentId, status: nextStatus
            });
            setStudents(prev => prev.map(s => s.student_id === studentId ? { ...s, trip_status: nextStatus } : s));
            toast.success("Đã cập nhật trạng thái!");
        } catch (e) { toast.error("Lỗi cập nhật"); }
    };

    if (loading) return <p className="text-sm text-gray-500 p-4">Đang tải danh sách...</p>;
    if (students.length === 0) return <p className="text-sm text-gray-500 p-4">Không có học sinh.</p>;

    return (
        <div className="border-t border-gray-100 bg-gray-50 p-4 space-y-3">
            {students.map(st => (
                <div key={st.student_id} className="flex justify-between items-center bg-white p-3 rounded shadow-sm">
                    <div>
                        <p className="font-bold text-gray-800">{st.name}</p>
                        <p className="text-xs text-gray-500">Lớp: {st.grade}</p>
                    </div>
                    <div className="flex gap-2">
                        {!st.trip_status && (
                            <button onClick={() => handleStatusUpdate(st.student_id, 'picked_up')} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded text-sm font-bold">Đón</button>
                        )}
                        {st.trip_status === 'picked_up' && (
                            <button onClick={() => handleStatusUpdate(st.student_id, 'dropped_off')} className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm font-bold">Trả</button>
                        )}
                        {st.trip_status === 'dropped_off' && (
                            <span className="text-green-600 text-sm font-bold flex items-center gap-1"><CheckCircle size={14}/> Xong</span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

// --- COMPONENT CHÍNH ---
function StudentListForDriver() {
    const { user } = useContext(AppContext);
    const [trips, setTrips] = useState([]);
    const [expandedTripId, setExpandedTripId] = useState(null);

    useEffect(() => {
        if (!user) return;
        // Lấy danh sách chuyến đi hôm nay
        axios.get('http://localhost:5000/api/trips/driver/today', { headers: { 'x-user-id': user.user_id } })
            .then(res => setTrips(res.data.data))
            .catch(err => console.error(err));
    }, [user]);

    const toggleTrip = (id) => {
        setExpandedTripId(expandedTripId === id ? null : id);
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar userRole='driver' />
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <Header title="Danh sách Học sinh" userRole="Tài xế" />
                <div className="flex-1 overflow-y-auto p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Các chuyến đi hôm nay</h2>
                    
                    <div className="space-y-4 max-w-3xl">
                        {trips.map(trip => (
                            <div key={trip.trip_id} className="bg-white rounded-xl shadow-sm border overflow-hidden">
                                {/* Header của Card Trip - Bấm vào để mở rộng */}
                                <div 
                                    onClick={() => toggleTrip(trip.trip_id)}
                                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                                            <Bus size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-800">{trip.route_name}</h3>
                                            <p className="text-xs text-gray-500">
                                                {new Date(trip.departure_time).toLocaleTimeString('vi-VN', {hour: '2-digit', minute:'2-digit'})}
                                            </p>
                                        </div>
                                    </div>
                                    {expandedTripId === trip.trip_id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                </div>

                                {/* Phần nội dung danh sách học sinh (Sổ ra khi bấm) */}
                                {expandedTripId === trip.trip_id && (
                                    <TripStudentList tripId={trip.trip_id} />
                                )}
                            </div>
                        ))}
                        
                        {trips.length === 0 && <p className="text-center text-gray-500">Hôm nay không có chuyến nào.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentListForDriver;