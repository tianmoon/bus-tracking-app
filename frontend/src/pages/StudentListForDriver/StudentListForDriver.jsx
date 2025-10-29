import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import Sidebar from "../../components/Sidebar/Sidebar";

function StudentListForAdmin() {
    const [students, setStudents] = useState([
        { id: 1, name: 'Nguyễn Văn A', class: 'DCT1234' }
    ]);



    return (
        <>
            <div className="flex min-h-screen bg-gray-50">
                {/* Sidebar */}
                <Sidebar userRole='driver'/>

                {/* Main Content */}
                <div className="flex-1">
                    {/* Top Navigation */}
                    <div className="bg-white border-b px-6 py-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">Học sinh</h1>
                                <p className="text-sm text-gray-500">Tổng quan danh sách học sinh</p>
                            </div>
                            <div className="flex items-center">
                                <div className="relative mr-4">
                                    <Bell size={24} className="text-gray-600" />
                                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-indigo-600 rounded-full mr-2"></div>
                                    <span className="font-medium">Tài xế</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Student List */}
                    <div className="p-6">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="bg-white border-b px-6 py-4">
                                <h2 className="text-xl font-semibold">Danh sách học sinh</h2>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-indigo-600 text-white">
                                        <tr>
                                            <th className="px-6 py-4 text-left font-semibold">Id</th>
                                            <th className="px-6 py-4 text-left font-semibold">Tên</th>
                                            <th className="px-6 py-4 text-left font-semibold">Lớp</th>
                                            <th className="px-6 py-4 text-left font-semibold">Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {students.map((student) => (
                                            <tr key={student.id} className="border-b hover:bg-gray-50">
                                                <td className="px-6 py-4">{student.id}</td>
                                                <td className="px-6 py-4 font-medium">{student.name}</td>
                                                <td className="px-6 py-4">{student.class}</td>
                                                <td className="px-6 py-4">
                                                    <button className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600 transition-colors">
                                                        Đã đón
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