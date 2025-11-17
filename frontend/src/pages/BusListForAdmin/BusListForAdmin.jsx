import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/Sidebar/Sidebar";
import { Bell, CircleUserRound, X } from 'lucide-react';
import axios from "axios";
import { toast } from 'react-toastify';
import Header from '../../components/Header';
// import { useNavigate } from 'react-router-dom';
function BusListForAdmin() {
    const [buses, setBuses] = useState([]);
    const [drivers, setDrivers] = useState([]);
    // const navigate = useNavigate();

    // Fetch bus
    const fetchBuses = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/buses/')
            setBuses(response.data.data)
        }
        catch (error) {
            console.error(error.response?.data?.message || error.message);
            toast.error("Lỗi khi tải danh sách xe buýt.");
        }
    }

    //Fetch tai xe
    const fetchDrivers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/drivers/')
            setDrivers(response.data.data)
        }
        catch (error) {
            console.error(error.response?.data?.message || error.message);
            toast.error("Lỗi khi tải danh sách tài xế.");
        }
    }

    useEffect(() => {
        fetchBuses();
    }, [])
    useEffect(() => {
        fetchDrivers();
    }, [])

    const [isModalOpen, setIsModalOpen] = useState(false);
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

    // const handleTrackingButton = (data) => {
    //     // Chuyển hướng đến trang theo dõi xe buýt
    //     navigate('/admin/tracking', { state: { data } });
        
    // }

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
                                <h2 className="text-xl font-semibold">Danh sách Xe Buýt</h2>
                                <button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                                    Thêm
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full table-fixed">
                                    <thead className="bg-indigo-600 text-white">
                                        <tr>
                                            <th className="px-6 py-4 text-left font-semibold">Id</th>
                                            <th className="px-6 py-4 text-left font-semibold">Biển số</th>
                                            <th className="px-6 py-4 text-left font-semibold">Trạng thái</th>
                                            <th className="px-6 py-4 text-left font-semibold">Tài xế</th>
                                            {/* <th className="px-6 py-4 text-left font-semibold">Thao tác</th> */}
                                        </tr>
                                    </thead>
                                </table>
                                <div className="overflow-y-auto max-h-165">
                                    <table className="w-full table-fixed">
                                        <tbody>
                                            {buses.length > 0 ? (buses.map((bus) => (
                                                <tr key={bus.bus_id} className="border-b hover:bg-gray-50">
                                                    <td className="px-6 py-4 ">{bus.bus_id}</td>
                                                    <td className="px-6 py-4 font-medium">{bus.plate_number}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={bus.active == 0 ?
                                                            "bg-green-500 text-green-800 rounded-[15px] px-2 py-1 font-medium whitespace-nowrap" :
                                                            "bg-yellow-200 text-yellow-800 rounded-[15px] px-2 py-1 font-medium whitespace-nowrap"
                                                        }>
                                                            {bus.active == 0 ? "Bình thường" : "Bảo trì"}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 font-medium">{bus.driver_name}</td>
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
                                                        Chưa có thông tin xe buýt
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
                            <h3 className="text-xl font-bold">Thêm xe buýt mới</h3>
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
                                    Biển số xe
                                </label>
                                <input
                                    type="text"
                                    name="plate_number"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Nhập biển số"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tên tài xế
                                </label>
                                <select
                                    name="driver_id"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 overflow-y-auto"
                                >
                                    <option value="">-- Chọn tài xế --</option>
                                    {drivers.map((driver) => (
                                        <option key={driver.driver_id} value={driver.driver_id}>
                                            {driver.name}
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
                                    Thêm xe
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
export default BusListForAdmin;