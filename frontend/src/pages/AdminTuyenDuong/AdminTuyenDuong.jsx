import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/Sidebar/Sidebar";
import { Bell, CircleUserRound, X } from 'lucide-react';
import axios from "axios";
import { toast } from 'react-toastify';
import RouteDetailModal from '../../components/RouteDetailModel';

function AdminTuyenDuong() {

    const [routes, setRoutes] = useState([]);

    const fetchRoutes = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/routes/');
            setRoutes(response.data.data);
        }
        catch (error) {
            console.error(error.response?.data?.message || error.message);
            toast.error("Lỗi khi tải danh sách tuyến đường.");
        }
    }

    useEffect(() => {
        fetchRoutes();
    }, [])

    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedRoute, setSelectedRoute] = useState(null);
    // const handleDelete = (id) => {
    //     setBuses(buses.filter(bus => bus.id !== id));
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        const busData = {
            plate_number: formData.get('plate_number'),
            driver_id: formData.get('driver_id')
        }
        try {
            const response = await axios.post('http://localhost:5000/api/buses', busData);
            if (response.data.status === 'success') {
                toast.success("Thêm xe buýt thành công!");
            }
            fetchBuses();
        } catch (error) {
            console.error(error.response?.data?.message || error.message);
            toast.error(`Lỗi khi thêm xe: ${error.response?.data?.message}`);
        }

        setIsModalOpen(false);
    }
    return (
        <>
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

                    {/* Bus List */}
                    <div className="p-6">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="bg-white border-b px-6 py-4 flex justify-between items-center">
                                <h2 className="text-xl font-semibold">Danh sách tuyến đường</h2>
                                <button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                                    Thêm
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full table-fixed">
                                    <thead className="bg-indigo-600 text-white">
                                        <tr>
                                            <th className="px-6 py-4 text-left font-semibold">Id</th>
                                            <th className="px-6 py-4 text-left font-semibold">Tên tuyến đường</th>
                                            <th className="px-6 py-4 text-left font-semibold">Điểm bắt đầu</th>
                                            <th className="px-6 py-4 text-left font-semibold">Điểm đến</th>
                                            <th className="px-6 py-4 text-left font-semibold">Số lượng trạm</th>
                                            <th className="px-6 py-4 text-left font-semibold">Thao tác</th>
                                        </tr>
                                    </thead>
                                </table>
                                <div className="overflow-y-auto max-h-165">
                                    <table className="w-full table-fixed">
                                        <tbody>
                                            {routes.length > 0 ? (routes.map((route) => (
                                                <tr key={route.route_id} className="border-b hover:bg-gray-50">
                                                    <td className="px-6 py-4 ">{route.route_id}</td>
                                                    <td className="px-6 py-4 font-medium">{route.name}</td>
                                                    <td className="px-6 py-4 font-medium">{route.start}</td>
                                                    <td className="px-6 py-4 font-medium">{route.end}</td>
                                                    <td className="px-6 py-4 ">{route.stop_quantity}</td>
                                                    <td className="px-6 py-4">
                                                        <button onClick={() => {
                                                            setSelectedRoute(route);
                                                            setIsDetailModalOpen(true);
                                                        }} className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600 transition-colors ">
                                                            Xem
                                                        </button>
                                                        {/* <button
                                                            onClick={() => handleDelete(bus.id)}
                                                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                                                        >
                                                            Xóa
                                                        </button> */}
                                                    </td>
                                                </tr>))) : (
                                                <tr>
                                                    <td colSpan="6" className="text-center py-4 text-gray-500">
                                                        Chưa có thông tin tuyến đường
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

            {/* Model Detail */}
            <RouteDetailModal
            isOpen={isDetailModalOpen}
            onClose={() => setIsDetailModalOpen(false)}
            route={selectedRoute}
            />
        </>
    )
}
export default AdminTuyenDuong