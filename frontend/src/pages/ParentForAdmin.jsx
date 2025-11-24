import React, { useState, useEffect } from 'react';
import Sidebar from "../components/Sidebar/Sidebar";
import axios from "axios";
import { toast } from 'react-toastify';
import Header from '../components/Header';
import { X } from 'lucide-react';

function ParentForAdmin() {

    const [parents, setParents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch danh sách phụ huynh
    const fetchParents = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/parents');
            setParents(response.data.data);
        }
        catch (error) {
            console.error("Lỗi khi lấy danh sách phụ huynh:", error);
            toast.error("Lỗi khi lấy danh sách phụ huynh");
        }
    };

    useEffect(() => {
        fetchParents();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newParent = {
            name: formData.get('name'),
            identification: formData.get('identification'),
            email: formData.get('email'),
            phone_number: formData.get('phone_number')
        };
        try {
            const response = await axios.post('http://localhost:5000/api/parents', newParent);
            toast.success("Thêm phụ huynh thành công");
            setIsModalOpen(false);
            fetchParents();
        } catch (error) {
            console.error("Lỗi khi thêm phụ huynh:", error);
            toast.error("Lỗi khi thêm phụ huynh" + (error.response?.data?.message ? `: ${error.response.data.message}` : ''));
        }
    };

    return (
        <>
            <div className="flex min-h-screen bg-gray-50">
                {/* Sidebar */}
                <Sidebar userRole='admin' />

                {/* Main Content */}
                <div className="flex-1">
                    {/* Top Navigation */}
                    <Header />

                    {/* Bus List */}
                    <div className="p-6">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="bg-white border-b px-6 py-4 flex justify-between items-center">
                                <h2 className="text-xl font-semibold">Danh sách Phụ huynh</h2>
                                <button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                                    Thêm
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full table-fixed">
                                    <thead className="bg-indigo-600 text-white">
                                        <tr>
                                            <th className="px-6 py-4 text-left font-semibold">Id</th>
                                            <th className="px-6 py-4 text-left font-semibold">Tên</th>
                                            <th className="px-6 py-4 text-left font-semibold">Căn cước</th>
                                            <th className="px-6 py-4 text-left font-semibold">Số điện thoại</th>
                                            <th className="px-6 py-4 text-left font-semibold">Email</th>
                                            {/* <th className="px-6 py-4 text-left font-semibold">Thao tác</th> */}
                                        </tr>
                                    </thead>
                                </table>
                                <div className="overflow-y-auto max-h-165">
                                    <table className="w-full table-fixed">
                                        <tbody>
                                            {parents.length > 0 ? (parents.map((parent) => (
                                                <tr key={parent.parent_id} className="border-b hover:bg-gray-50">
                                                    <td className="px-6 py-4 ">{parent.parent_id}</td>
                                                    <td className="px-6 py-4 font-medium">{parent.name}</td>
                                                    <td className="px-6 py-4">
                                                        {parent.identification}
                                                    </td>
                                                    <td className="px-6 py-4 font-medium">{parent.phone_number}</td>
                                                    <td className="px-6 py-4 font-medium">{parent.email}
                                                    </td>
                                                    {/* <td className="px-6 py-4">
                                                        <button className={bus.active == 1 ? "bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600 transition-colors" : "bg-gray-400 text-white px-4 py-2 rounded mr-2 cursor-not-allowed"} onClick={() => handleTrackingButton(bus)} disabled={bus.active != 1}>
                                                            Theo dõi
                                                        </button>
                                                        <button
                                                        onClick={() => handleDelete(bus.id)}
                                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                                                    >
                                                        Xóa
                                                    </button>
                                                    </td> */}
                                                </tr>))) : (
                                                <tr>
                                                    <td colSpan="6" className="text-center py-4 text-gray-500">
                                                        Chưa có thông tin phụ huynh
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
                            <h3 className="text-xl font-bold">Thêm phụ huynh mới</h3>
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
                                    Tên phụ huynh
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Nhập tên phụ huynh"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Can cước công dân
                                </label>
                                <input
                                    type="text"
                                    name="identification"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Nhập căn cước công dân"
                                />
                          
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email
                                </label>
                                <input
                                    type="text"
                                    name="email"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Nhập email"
                                />
                          
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Số điện thoại
                                </label>
                                <input
                                    type="text"
                                    name="phone_number"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Nhập số điện thoại"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-4 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
                                >
                                    Thêm phụ huynh
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

export default ParentForAdmin;