import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Trash2, X, Bell, CircleUserRound } from 'lucide-react';
import Sidebar from '../../components/Sidebar/Sidebar';

function AdminLichtrinh() {
    const [currentWeek, setCurrentWeek] = useState(44);
    const [currentYear] = useState(2025);
    const [showModal, setShowModal] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);
    const [editingTask, setEditingTask] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        startTime: '',
        endTime: '',
        description: ''
    });

    const [tasks, setTasks] = useState({
        0: [
            { id: 1, title: 'Họp nhóm', startTime: '08:00', endTime: '10:00', description: '' },
            { id: 2, title: 'Dạy lớp A', startTime: '13:00', endTime: '17:00', description: '' }
        ],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: []
    });

    const daysOfWeek = [
        { label: 'Thứ 2', date: '28/10' },
        { label: 'Thứ 3', date: '29/10' },
        { label: 'Thứ 4', date: '30/10' },
        { label: 'Thứ 5', date: '31/10' },
        { label: 'Thứ 6', date: '01/11' },
        { label: 'Thứ 7', date: '02/11' },
        { label: 'CN', date: '03/11' }
    ];

    const handlePrevWeek = () => {
        if (currentWeek > 1) {
            setCurrentWeek(currentWeek - 1);
        }
    };

    const handleNextWeek = () => {
        if (currentWeek < 52) {
            setCurrentWeek(currentWeek + 1);
        }
    };

    const openModal = (dayIndex, task = null) => {
        setSelectedDay(dayIndex);
        if (task) {
            setEditingTask(task);
            setFormData({
                title: task.title,
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

    const handleSubmit = () => {
        if (!formData.title || !formData.startTime || !formData.endTime) {
            alert('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        if (editingTask) {
            setTasks(prev => ({
                ...prev,
                [selectedDay]: prev[selectedDay].map(task =>
                    task.id === editingTask.id
                        ? { ...task, ...formData }
                        : task
                )
            }));
        } else {
            const newTask = {
                id: Date.now(),
                ...formData
            };
            setTasks(prev => ({
                ...prev,
                [selectedDay]: [...prev[selectedDay], newTask]
            }));
        }

        closeModal();
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
                <div className="bg-white border-b px-6 py-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Dashboard Quản lý</h1>
                            <p className="text-sm text-gray-500">Tổng quan hệ thống xe buýt trường học</p>
                        </div>
                        <div className="flex items-center">
                            <div className="relative mr-4">
                                <Bell size={24} className="text-gray-600" />
                                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                            </div>
                            <div className="flex items-center">
                                <CircleUserRound size={28} className="text-gray-600 mr-2" />
                                <span className="font-medium">Admin</span>
                            </div>
                        </div>
                    </div>
                </div>

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
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
                            <div className="flex justify-between items-center p-6 border-b">
                                <h2 className="text-xl font-bold text-gray-800">
                                    {editingTask ? 'Sửa công việc' : 'Thêm công việc'}
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
                                            Tên công việc
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            placeholder="Nhập tên công việc"
                                        />
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