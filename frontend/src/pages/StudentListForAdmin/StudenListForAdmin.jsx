import React, { useState } from 'react';
import { Bell, BarChart3, Users, User, Bus, Route, Calendar, MessageSquare, AlertTriangle, Map } from 'lucide-react';
function StudentListForAdmin() {
    const [students, setStudents] = useState([
        { id: 1, name: 'Nguyễn Văn A', class: 'DCT1234' }
    ]);

    const handleDelete = (id) => {
        setStudents(students.filter(student => student.id !== id));
    };

    const menuItems = [
        { icon: BarChart3, label: 'Tổng quan', active: false },
        { icon: Users, label: 'Học sinh', active: true },
        { icon: User, label: 'Tài xế', active: false },
        { icon: Bus, label: 'Xe buýt', active: false },
        { icon: Route, label: 'Tuyến đường', active: false },
        { icon: Calendar, label: 'Lịch trình', active: false },
        { icon: MessageSquare, label: 'Tin nhắn', active: false },
        { icon: AlertTriangle, label: 'Cảnh báo', active: false },
        { icon: Map, label: 'Bản đồ theo dõi', active: false },
    ];

    return (
        <>
            <div className="flex min-h-screen bg-gray-50">
                {/* Sidebar */}
                <div className="w-64 bg-white shadow-lg">
                    <div className="p-4 border-b">
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center mr-3">
                                <Bus className="text-white" size={24} />
                            </div>
                            <div>
                                <div className="font-bold text-lg">SchoolBus Pro</div>
                                <div className="text-xs text-gray-500">Hệ thống quản lý</div>
                            </div>
                        </div>
                    </div>

                    <nav className="p-3">
                        {menuItems.map((item, index) => (
                            <button
                                key={index}
                                className={`w-full flex items-center px-4 py-3 mb-2 rounded-lg transition-colors ${item.active
                                    ? 'bg-indigo-600 text-white'
                                    : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                <item.icon size={20} className="mr-3" />
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </nav>
                </div>

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
                                    <div className="w-10 h-10 bg-indigo-600 rounded-full mr-2"></div>
                                    <span className="font-medium">Admin</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Student List */}
                    <div className="p-6">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="bg-white border-b px-6 py-4 flex justify-between items-center">
                                <h2 className="text-xl font-semibold">Danh sách học sinh</h2>
                                <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                                    Thêm
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-indigo-600 text-white">
                                        <tr>
                                            <th className="px-6 py-4 text-left font-semibold">Id</th>
                                            <th className="px-6 py-4 text-left font-semibold">Tên</th>
                                            <th className="px-6 py-4 text-left font-semibold">Lớp</th>
                                            <th className="px-6 py-4 text-left font-semibold">Phụ huynh</th>
                                            <th className="px-6 py-4 text-left font-semibold">Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {students.map((student) => (
                                            <tr key={student.id} className="border-b hover:bg-gray-50">
                                                <td className="px-6 py-4">{student.id}</td>
                                                <td className="px-6 py-4 font-medium">{student.name}</td>
                                                <td className="px-6 py-4">{student.class}</td>
                                                <td className="px-6 py-4">Nguyễn Thị B (Mẹ)</td>
                                                <td className="px-6 py-4">
                                                    <button className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600 transition-colors">
                                                        Sửa
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(student.id)}
                                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                                                    >
                                                        Xóa
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default StudentListForAdmin;