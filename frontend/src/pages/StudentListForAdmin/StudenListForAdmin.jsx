import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar.jsx';
import { Bell, X, CircleUserRound } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Header from '../../components/Header.jsx';
function StudentListForAdmin() {

    
    const [students, setStudents] = useState([]);
    const [parents, setParents] = useState([]);
    const [buses, setBuses] = useState([]);

    // Fetch học sinh từ API
    const fetchStudents = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/students');
                if (response.data.status === 'success') {
                    setStudents(response.data.data);
                }
            } catch (error) {
                console.error(error.response?.data?.message || error.message);
                toast.error("Lỗi khi tải danh sách học sinh.");
            }
        }

    // Fetch phu huynh từ API
    const fetchParents = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/parents');
                if (response.data.status === 'success') {
                    setParents(response.data.data);
                }
            } catch (error) {
                console.error(error.response?.data?.message || error.message);
                toast.error("Lỗi khi tải danh sách phụ huynh.");
            }
        }

    // Fetch xe bus từ API
    const fetchBuses = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/buses');
                if (response.data.status === 'success') {
                    setBuses(response.data.data);
                }
            } catch (error) {
                console.error(error.response?.data?.message || error.message);
                toast.error("Lỗi khi tải danh sách xe buýt.");
            }
        }

    useEffect(() => {
        fetchStudents();
    }, []);
    useEffect(() => {
        fetchParents();
    }, []);
    useEffect(() => {
        fetchBuses();
    }, []);

    // Model form state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        grade: '',
        parent_id: '',
        bus_id: ''
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/students', formData);
            if (response.data.status === 'success') {
                toast.success("Thêm học sinh thành công!");
            }
            fetchStudents();
        } catch (error) {
            console.error(error.response?.data?.message || error.message);
            toast.error("Lỗi khi thêm học sinh.");
        }



        // Reset form và đóng modal
        setFormData({
            name: '',
            grade: '',
            parent_id: '',
            bus_id: ''
        });
        setIsModalOpen(false);
    };

    // const handleDelete = (id) => {
    //     setStudents(students.filter(student => student.id !== id));
    // };
    return (
        <>
            <div className="flex min-h-screen bg-gray-50">
                {/* Sidebar */}
                <Sidebar userRole='admin' />

                {/* Main Content */}
                <div className="flex-1">
                    {/* Top Navigation */}
                    <Header/>

                    {/* Student List */}
                    <div className="p-6">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="bg-white border-b px-6 py-4 flex justify-between items-center">
                                <h2 className="text-xl font-semibold">Danh sách học sinh</h2>
                                <button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                                    Thêm
                                </button>
                            </div>
                            <div className="overflow-hidden">
                                <table className="w-full table-fixed">
                                    <thead className="bg-indigo-600 text-white">
                                        <tr>
                                            <th className="px-6 py-4 text-left font-semibold">Id</th>
                                            <th className="px-6 py-4 text-left font-semibold">Tên</th>
                                            <th className="px-6 py-4 text-left font-semibold">Lớp</th>
                                            <th className="px-6 py-4 text-left font-semibold">Phụ huynh</th>
                                            <th className="px-6 py-4 text-left font-semibold">Xe buýt</th>
                                            {/* <th className="px-6 py-4 text-left font-semibold">Thao tác</th> */}
                                        </tr>
                                    </thead>
                                </table>
                                <div className="overflow-y-auto max-h-165">
                                    <table className="w-full table-fixed">
                                        <tbody>
                                            {students.length > 0 ? (
                                                students.map((student) => (
                                                    <tr key={student.student_id} className="border-b hover:bg-gray-50">
                                                        <td className="px-6 py-4">{student.student_id}</td>
                                                        <td className="px-6 py-4 font-medium">{student.student_name}</td>
                                                        <td className="px-6 py-4">{student.grade}</td>
                                                        <td className="px-6 py-4">{student.parent_name}</td>
                                                        <td className="px-6 py-4">{student.plate_number}</td>
                                                        {/* <td className="px-6 py-4">
                                                            <button className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600 transition-colors">
                                                                Sửa
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(student.id)}
                                                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                                                            >
                                                                Xóa
                                                            </button>
                                                        </td> */}
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="6" className="text-center py-4 text-gray-500">
                                                        Chưa có thông tin học sinh
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
                            <h3 className="text-xl font-bold">Thêm học sinh mới</h3>
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
                                    Tên học sinh
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Nhập tên học sinh"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Lớp
                                </label>
                                <input
                                    type="text"
                                    name="grade"
                                    value={formData.grade}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Nhập lớp (VD: 5A)"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tên phụ huynh
                                </label>
                                <select
                                    name="parent_id"
                                    value={formData.parent_id}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 overflow-y-auto"
                                >
                                    <option value="">-- Chọn phụ huynh --</option>
                                    {parents.map((parent) => (
                                        <option key={parent.parent_id} value={parent.parent_id}>
                                            {parent.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Biển số xe
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

                            {/* Buttons */}
                            <div className="flex gap-4 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
                                >
                                    Thêm học sinh
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
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
export default StudentListForAdmin;