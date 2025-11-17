import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar/Sidebar";
import { Bell, CircleUserRound, X } from "lucide-react";
import { toast } from "react-toastify";
import Header from "../components/Header";
// import { useLocation } from "react-router-dom";

function BusTrackingAdmin(){
    // const location = useLocation();
    // const busData = location.state?.data;
    // console.log("Bus Data for Tracking:", busData);
    const [trips, setTrips] = useState([]);

    const handleStatus = (status) => {
        const statusMap = {
            completed: "Hoàn thành",
            ongoing: "Đang diễn ra",
            cancelled: "Chưa hoàn thành"
        }
        return statusMap[status] || "Không xác định";
    }

    const fetchTrips = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/trips");
            setTrips(response.data.data);
        } catch (error) {
            console.error("Error fetching trips:", error);
            toast.error("Lỗi khi tải danh sách chuyến đi.");
        }
    };

    useEffect(() => {
        fetchTrips();
    }, []);

    return(
        <>
            <div className="flex min-h-screen bg-gray-50">
                {/* Sidebar */}
                <Sidebar userRole='admin' />

                {/* Main Content */}
                <div className="flex-1">
                    {/* Top Navigation */}
                    <Header/>
                    
                    {/* Trip List */}
                    <div className="p-6">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="bg-white border-b px-6 py-4 flex justify-between items-center">
                                <h2 className="text-xl font-semibold">Danh sách Chuyến đi</h2>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full table-fixed">
                                    <thead className="bg-indigo-600 text-white">
                                        <tr>
                                            <th className="px-6 py-4 text-left font-semibolds">Id</th>
                                            <th className="px-6 py-4 text-left font-semibold">Biển số</th>
                                            <th className="px-6 py-4 text-left font-semibold">Trạng thái</th>
                                            <th className="px-6 py-4 text-left font-semibold">Tài xế</th>
                                            <th className="px-6 py-4 text-left font-semibold">Tuyến đường</th>
                                            <th className="px-6 py-4 text-left font-semibold">Thao tác</th>
                                        </tr>
                                    </thead>
                                </table>
                                <div className="overflow-y-auto max-h-165">
                                    <table className="w-full table-fixed">
                                        <tbody>
                                            {trips.length > 0 ? (trips.map((trip) => (
                                                <tr key={trip.trip_id} className="border-b hover:bg-gray-50">
                                                    <td className="px-6 py-4 ">{trip.trip_id}</td>
                                                    <td className="px-6 py-4 font-medium">{trip.plate_number}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={handleStatus(trip.status) === "Hoàn thành" ?
                                                            "bg-green-500 text-green-800 rounded-[15px] px-2 py-1 font-medium whitespace-nowrap" :
                                                            handleStatus(trip.status) === "Đang diễn ra" ?
                                                            "bg-blue-500 text-blue-800 rounded-[15px] px-2 py-1 font-medium whitespace-nowrap" :
                                                            "bg-yellow-200 text-yellow-800 rounded-[15px] px-2 py-1 font-medium whitespace-nowrap"
                                                        }>
                                                            {handleStatus(trip.status)}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 font-medium">{trip.driver_name}</td>
                                                    <td className="px-6 py-4 font-medium">{trip.route_name}</td>
                                                    <td className="px-6 py-4">
                                                        <button className={handleStatus(trip.status) === "Đang diễn ra" ? "bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600 transition-colors" : "bg-gray-400 text-white px-4 py-2 rounded mr-2 cursor-not-allowed"} disabled={handleStatus(trip.status) !== "Đang diễn ra"}>
                                                            Theo dõi
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
                                                        Chưa có thông tin chuyến đi
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
        </>
    )
}

export default BusTrackingAdmin;