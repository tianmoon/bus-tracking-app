import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plus, Trash2, X, Bell, CircleUserRound } from 'lucide-react';
import Sidebar from '../../components/Sidebar/Sidebar';
import axios from 'axios';
import { toast } from 'react-toastify';
import Header from '../../components/Header';
function AdminLichtrinh() {
    // Lấy tuần hiện tại
    const getCurrentWeek = () => {
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 1);
        const diff = now - start;
        const oneWeek = 1000 * 60 * 60 * 24 * 7;
        return Math.ceil((diff / oneWeek));
    };

    const [currentWeek, setCurrentWeek] = useState(getCurrentWeek());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [showModal, setShowModal] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);
    const [editingTask, setEditingTask] = useState(null);
    const [daysOfWeek, setDaysOfWeek] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        startTime: '',
        endTime: '',
        description: ''
    });
    const [routes, setRoutes] = useState([]);

    const [tasks, setTasks] = useState({
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: []
    });

    // Hàm fetch dữ liệu lịch trình từ backend
    const fetchSchedules = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/schedules', {
                params: {
                    week: currentWeek,
                    year: currentYear
                }
            });
            
            if (response.data.status === 'success') {
                // Chuyển đổi data từ backend sang format tasks
                const newTasks = {
                    0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: []
                };
                
                response.data.data.forEach(schedule => {
                    // day_of_week trong DB: 0 = CN, 1 = T2, ..., 6 = T7
                    // Chuyển sang index: T2=0, T3=1, ..., T7=5, CN=6
                    const dayIndex = schedule.day_of_week === 0 ? 6 : schedule.day_of_week - 1;
                    
                    // Format DateTime thành giờ:phút (HH:MM)
                    const formatTime = (datetime) => {
                        if (!datetime) return '';
                        const date = new Date(datetime);
                        return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', hour12: false });
                    };
                    
                    newTasks[dayIndex].push({
                        id: schedule.schedule_id,
                        title: schedule.name,
                        route_id: schedule.route_id,  // Lưu route_id để dùng khi edit
                        startTime: formatTime(schedule.start_time),
                        endTime: formatTime(schedule.end_time),
                        description: schedule.describe || ''
                    });
                });
                
                setTasks(newTasks);
            }
        } catch (error) {
            console.error('Lỗi khi lấy lịch trình:', error?.data?.message || error);
            toast.error('Lỗi khi lấy lịch trình');
            // Giữ nguyên tasks cũ nếu lỗi
        }
    };

    const fetchRoutes = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/routes');
            if (response.data.status === 'success') {
                setRoutes(response.data.data);
            }
        } catch (error) {
            console.error('Lỗi khi lấy danh sách tuyến đường:', error?.data?.message || error);
            toast.error('Lỗi khi lấy danh sách tuyến đường');
        }
    };

    // Fetch data khi component mount hoặc khi tuần/năm thay đổi
    useEffect(() => {
        fetchSchedules();
    }, [currentWeek, currentYear]);

    // Fetch routes khi component mount
    useEffect(() => {
        fetchRoutes();
    }, []);

    // Hàm tính ngày đầu tuần (Thứ 2) từ số tuần và năm
    const getDateOfWeek = (week, year) => {
        const date = new Date(year, 0, 1 + (week - 1) * 7);
        const dayOfWeek = date.getDay();
        const diff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
        return new Date(date.setDate(diff));
    };

    // Hàm tạo mảng 7 ngày trong tuần
    const generateWeekDays = (week, year) => {
        const startDate = getDateOfWeek(week, year);
        const days = [];
        const dayLabels = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'CN'];
        
        for (let i = 0; i < 7; i++) {
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + i);
            
            const day = String(currentDate.getDate()).padStart(2, '0');
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            
            days.push({
                label: dayLabels[i],
                date: `${day}/${month}`
            });
        }
        
        return days;
    };

    // Cập nhật daysOfWeek mỗi khi tuần hoặc năm thay đổi
    useEffect(() => {
        setDaysOfWeek(generateWeekDays(currentWeek, currentYear));
    }, [currentWeek, currentYear]);

    const handlePrevWeek = () => {
        if (currentWeek > 1) {
            setCurrentWeek(currentWeek - 1);
        } else {
            // Chuyển sang tuần cuối của năm trước
            setCurrentYear(currentYear - 1);
            setCurrentWeek(52);
        }
    };

    const handleNextWeek = () => {
        if (currentWeek < 52) {
            setCurrentWeek(currentWeek + 1);
        } else {
            // Chuyển sang tuần đầu của năm sau
            setCurrentYear(currentYear + 1);
            setCurrentWeek(1);
        }
    };

    const openModal = (dayIndex, task = null) => {
        setSelectedDay(dayIndex);
        if (task) {
            setEditingTask(task);
            setFormData({
                title: task.route_id || '', 
                startTime: task.startTime,
                endTime: task.endTime,
                description: task.description || ''
            });
        } else {
            setEditingTask(null);
            setFormData({
                title: '',
                startTime: '',
                endTime: '',
                description: ''
            });
        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedDay(null);
        setEditingTask(null);
        setFormData({
            title: '',
            startTime: '',
            endTime: '',
            description: ''
        });
    };

    const handleSubmit = async () => {
        if (!formData.title || !formData.startTime || !formData.endTime) {
            toast.error('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        try {
            // Chuyển dayIndex sang day_of_week (T2=1, T3=2, ..., T7=6, CN=0)
            const dayOfWeek = selectedDay === 6 ? 0 : selectedDay + 1;
            
            // Tính ngày cụ thể từ tuần và năm
            const startDate = getDateOfWeek(currentWeek, currentYear);
            const scheduleDate = new Date(startDate);
            scheduleDate.setDate(startDate.getDate() + selectedDay);
            
            // Tạo DateTime từ date và time (format MySQL DateTime)
            const createDateTime = (date, time) => {
                const [hours, minutes] = time.split(':');
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                const hoursStr = String(hours).padStart(2, '0');
                const minutesStr = String(minutes).padStart(2, '0');
                
                // Format: YYYY-MM-DD HH:MM:SS
                return `${year}-${month}-${day} ${hoursStr}:${minutesStr}:00`;
            };

            const scheduleData = {
                route_id: formData.title,
                start_time: createDateTime(scheduleDate, formData.startTime),
                end_time: createDateTime(scheduleDate, formData.endTime),
                describe: formData.description,
                day_of_week: dayOfWeek,
            };

            if (editingTask) {
                // Cập nhật lịch trình
                await axios.put(`http://localhost:5000/api/schedules/${editingTask.id}`, scheduleData);
                toast.success('Cập nhật lịch trình thành công!');
            } else {
                // Thêm lịch trình mới
                await axios.post('http://localhost:5000/api/schedules', scheduleData);
                toast.success('Thêm lịch trình thành công!');
            }

            // Refresh dữ liệu
            await fetchSchedules();
            closeModal();
        } catch (error) {
            console.error('Lỗi khi lưu lịch trình:', error);
            toast.error(error?.response?.data?.message || 'Lỗi khi lưu lịch trình');
        }
    };

    const handleDelete = (dayIndex, taskId) => {
        setTasks(prev => ({
            ...prev,
            [dayIndex]: prev[dayIndex].filter(task => task.id !== taskId)
        }));
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <Sidebar userRole='admin' />

            {/* Main Content */}
            <div className="flex-1">

                {/* Top Navigation */}
                <Header/>

                {/* Schedules  */}
                <div className='p-6'>
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                        <div className="flex justify-between items-center">
                            <h1 className="text-2xl font-bold text-gray-800">
                                Tuần {currentWeek} - Năm {currentYear}
                            </h1>
                            <div className="flex gap-2">
                                <button
                                    onClick={handlePrevWeek}
                                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                >
                                    <ChevronLeft size={20} />
                                    Tuần trước
                                </button>
                                <button
                                    onClick={handleNextWeek}
                                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                >
                                    Tuần sau
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="grid grid-cols-7 border-b">
                            {daysOfWeek.map((day, index) => (
                                <div
                                    key={index}
                                    className="p-4 text-center border-r last:border-r-0 bg-indigo-50"
                                >
                                    <div className="font-bold text-gray-800">{day.label}</div>
                                    <div className="text-sm text-gray-600">{day.date}</div>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-7">
                            {daysOfWeek.map((day, dayIndex) => (
                                <div
                                    key={dayIndex}
                                    className="min-h-96 border-r last:border-r-0 p-3 bg-white hover:bg-gray-50 cursor-pointer relative"
                                    onClick={() => openModal(dayIndex)}
                                >
                                    <div className="absolute top-2 right-2 opacity-0 hover:opacity-100 transition-opacity">
                                        <Plus size={20} className="text-indigo-600" />
                                    </div>

                                    <div className="space-y-2">
                                        {tasks[dayIndex].map((task) => (
                                            <div
                                                key={task.id}
                                                className="bg-indigo-100 border-l-4 border-indigo-600 p-2 rounded text-sm cursor-pointer hover:bg-indigo-200 transition-colors group"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    openModal(dayIndex, task);
                                                }}
                                            >
                                                <div className="flex justify-between items-start">
                                                    <div className="flex-1">
                                                        <div className="font-semibold text-gray-800">
                                                            {task.startTime}-{task.endTime}
                                                        </div>
                                                        <div className="text-gray-700">{task.title}</div>
                                                        {task.description && (
                                                            <div className="text-gray-600 text-xs mt-1">
                                                                {task.description}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <button
                                                        onClick={(e) => {
                                                          e.stopPropagation();
                                                            handleDelete(dayIndex, task.id);
                                                        }}
                                                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-500 hover:text-white rounded"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {showModal && (
                    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
                        <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
                            <div className="flex justify-between items-center p-6 border-b">
                                <h2 className="text-xl font-bold text-gray-800">
                                    {editingTask ? 'Sửa lịch trình' : 'Thêm lịch trình'}
                                </h2>
                                <button
                                    onClick={closeModal}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="p-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Tên tuyến đường
                                        </label>
                                        <select
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        >
                                            <option value="">Chọn tuyến đường</option>
                                            {routes.length > 0 ? routes.map((route) => (
                                                <option key={route.route_id} value={route.route_id}>
                                                    {route.name}
                                                </option>
                                            )) : <option disabled>Không có tuyến đường</option>}
                                        </select>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Thời gian bắt đầu
                                            </label>
                                            <input
                                                type="time"
                                                value={formData.startTime}
                                                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Thời gian kết thúc
                                            </label>
                                            <input
                                                type="time"
                                                value={formData.endTime}
                                                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Mô tả (tuỳ chọn)
                                        </label>
                                        <textarea
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            rows="3"
                                            placeholder="Nhập mô tả công việc"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3 mt-6">
                                    <button
                                        onClick={closeModal}
                                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        Huỷ
                                    </button>
                                    <button
                                        onClick={handleSubmit}
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                    >
                                        {editingTask ? 'Cập nhật' : 'Thêm'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminLichtrinh