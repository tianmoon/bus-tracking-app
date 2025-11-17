import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar/Sidebar";
import { Bell, CircleUserRound, X } from "lucide-react";
import { toast } from "react-toastify";
import Header from "../components/Header";
function Assignment() {
    const [assignments, setAssignments] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [buses, setBuses] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [formData, setFormData] = useState({
            bus_id: '',
            schedule_id: '',
        });

    // Hàm format thời gian và ngày
    const formatScheduleTime = (startTime, endTime, dayOfWeek) => {
        const dayNames = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
        const dayName = dayNames[dayOfWeek];

        const startDate = new Date(startTime);
        const endDate = new Date(endTime);

        const formatTime = (date) => {
            return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', hour12: false });
        };

        const formatDate = (date) => {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        };

        return `${dayName}, ${formatDate(startDate)} từ ${formatTime(startDate)} đến ${formatTime(endDate)}`;
    };

    const fetchAssignments = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/assignments');
            setAssignments(response.data.data);
        } catch (error) {
            console.error('Error fetching assignments:', error);
            toast.error('Lỗi khi lấy danh sách phân công');
        }
    };

    const fetchSchedules = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/schedules');
            setSchedules(response.data.data);
        }
        catch (error) {
            console.error('Error fetching schedules:', error);
            toast.error('Lỗi khi lấy danh sách lịch trình');
        }
    }

    const fetchBuses = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/buses');    
            setBuses(response.data.data);
        }
        catch (error) {
            console.error('Error fetching buses:', error);
            toast.error('Lỗi khi lấy danh sách xe buýt');
        }
    }


    useEffect(() => {
        fetchAssignments();
    }, []);
    useEffect(() => {
        fetchSchedules();
    }, []);
    useEffect(() => {
        fetchBuses();
    }, []);

    const openModel = (assignment = null) => {
        if (assignment) {
            console.log(assignment);
            setEditing(assignment);
            setFormData({
                bus_id: assignment.bus_id,
                schedule_id: assignment.schedule_id,
            });
        } else {
            setEditing(null);
            setFormData({
                bus_id: '',
                schedule_id: '',
            });
        }
        setIsModalOpen(true);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditing(null);
        setFormData({
            bus_id: '',
            schedule_id: ''
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editing) {
                // Chỉnh sửa phân công
                const response = await axios.put(`http://localhost:5000/api/assignments/${editing.asn_id}`, formData);
                if (response.data.status === 'success') {
                    toast.success("Cập nhật phân công thành công!");
                }
            } else {
                // Thêm phân công mới
                const response = await axios.post('http://localhost:5000/api/assignments', formData);
                if (response.data.status === 'success') {
                    toast.success("Thêm phân công thành công!");
                }
            }
            fetchAssignments();
            handleCloseModal();
        } catch (error) {
            console.error('Error saving assignment:', error);
            toast.error('Lỗi khi lưu phân công');
        }
    }

    return (
        <>
            <div className="flex min-h-screen bg-gray-50">
                {/* Sidebar */}
                <Sidebar userRole='admin' />

                {/* Main Content */}
                <div className="flex-1">
                    {/* Top Navigation */}
                    <Header/>

                    {/* Assignment List */}
                    <div className="p-6">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="bg-white border-b px-6 py-4 flex justify-between items-center">
                                <h2 className="text-xl font-semibold">Danh sách phân công</h2>
                                <button onClick={() => openModel()} className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                                    Thêm
                                </button>
                            </div>
                            <div className="overflow-hidden">
                                <table className="w-full table-fixed">
                                    <thead className="bg-indigo-600 text-white">
                                        <tr>
                                            <th className="px-6 py-4 text-left font-semibold">Id</th>
                                            <th className="px-6 py-4 text-left font-semibold">Xe buýt</th>
                                            <th className="px-6 py-4 text-left font-semibold">Tài xế</th>
                                            <th className="px-6 py-4 text-left font-semibold">Đoạn đường</th>
                                            <th className="px-6 py-4 text-left font-semibold">Thời gian</th>
                                            <th className="px-6 py-4 text-left font-semibold">Thao tác</th>
                                        </tr>
                                    </thead>
                                </table>
                                <div className="overflow-y-auto max-h-165">
                                    <table className="w-full table-fixed">
                                        <tbody>
                                            {assignments.length > 0 ? (
                                                assignments.map((assignment) => (
                                                    <tr key={assignment.asn_id} className="border-b hover:bg-gray-50">
                                                        <td className="px-6 py-4">{assignment.asn_id}</td>
                                                        <td className="px-6 py-4 font-medium">{assignment.plate_number}</td>
                                                        <td className="px-6 py-4">{assignment.driver_name}</td>
                                                        <td className="px-6 py-4">{assignment.route_name}</td>
                                                        <td className="px-6 py-4">
                                                            {formatScheduleTime(assignment.start_time, assignment.end_time, assignment.day_of_week)}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <button
                                                                onClick={() => openModel(assignment)}
                                                                className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600 transition-colors">
                                                                Sửa
                                                            </button>
                                                            {/* <button
                                                                onClick={() => handleDelete(student.id)}
                                                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                                                            >
                                                                Xóa
                                                            </button> */}
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="6" className="text-center py-4 text-gray-500">
                                                        Chưa có thông tin phân công
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Popup */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Overlay mờ */}
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setIsModalOpen(false)}
                    ></div>

                    {/* Modal Content */}
                    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
                        {/* Header */}
                        <div className="bg-indigo-600 text-white px-6 py-4 rounded-t-2xl flex justify-between items-center">
                            <h3 className="text-xl font-bold">
                                {editing ? 'Chỉnh sửa phân công' : 'Thêm phân công mới'}
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="hover:bg-indigo-700 rounded-full p-1 transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Xe buýt
                                </label>
                                <select
                                    name="bus_id"
                                    value={formData.bus_id}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 overflow-y-auto"
                                >
                                    <option value="">-- Chọn xe --</option>
                                    {buses.map((bus) => (
                                        <option key={bus.bus_id} value={bus.bus_id}>
                                            {bus.plate_number}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Lịch trình
                                </label>
                                <select
                                    name="schedule_id"
                                    value={formData.schedule_id}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 overflow-y-auto"
                                >
                                    <option value="">-- Chọn lịch trình --</option>
                                    {schedules.map((schedule) => (
                                        <option key={schedule.schedule_id} value={schedule.schedule_id}>
                                            {schedule.name} {`(${formatScheduleTime(schedule.start_time, schedule.end_time, schedule.day_of_week)})`}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-4 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
                                >
                                    {editing ? 'Cập nhật' : 'Thêm'}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                                >
                                    Hủy
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default Assignment;
