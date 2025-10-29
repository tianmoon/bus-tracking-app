import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Bell } from "lucide-react";

function AdminCanhBao() {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: "Tài xế",
      message: "Xe buýt A-1234 bị chậm 15 phút",
      time: "10:30 AM",
      status: "Chưa xử lý",
      priority: "Cao",
    },
    {
      id: 2,
      type: "Phụ huynh",
      message: "Học sinh Nguyễn Văn A không có mặt",
      time: "11:00 AM",
      status: "Đang xử lý",
      priority: "Trung bình",
    },
    {
      id: 3,
      type: "Tuyến đường",
      message: "Tuyến 3 có tắc đường",
      time: "11:30 AM",
      status: "Đã xử lý",
      priority: "Thấp",
    },
  ]);

  const handleDelete = (id) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  const statusBadge = (status) => {
    switch (status) {
      case "Chưa xử lý":
        return "bg-red-200 text-red-800";
      case "Đang xử lý":
        return "bg-yellow-200 text-yellow-800";
      case "Đã xử lý":
        return "bg-green-200 text-green-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  const priorityText = (priority) => {
    switch (priority) {
      case "Cao":
        return "text-red-600 font-semibold";
      case "Trung bình":
        return "text-yellow-600 font-medium";
      case "Thấp":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userRole="admin" />
      <div className="flex-1">
        <div className="bg-white border-b px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Dashboard Quản lý
              </h1>
              <p className="text-sm text-gray-500">
                Tổng quan hệ thống cảnh báo trường học
              </p>
            </div>
            <div className="flex items-center">
              <div className="relative mr-4">
                <Bell size={24} className="text-gray-600" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-indigo-600 rounded-full mr-2" />
                <span className="font-medium">Admin</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Danh sách Cảnh báo</h2>
              <div className="flex gap-3">
                <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                  Tạo cảnh báo
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-indigo-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">ID</th>
                    <th className="px-6 py-4 text-left font-semibold">Loại</th>
                    <th className="px-6 py-4 text-left font-semibold">
                      Nội dung
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">
                      Thời gian
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">
                      Mức độ
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">
                      Trạng thái
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {alerts.map((alert) => (
                    <tr
                      key={alert.id}
                      className="border-b hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">{alert.id}</td>
                      <td className="px-6 py-4 font-medium">{alert.type}</td>
                      <td className="px-6 py-4">{alert.message}</td>
                      <td className="px-6 py-4">{alert.time}</td>
                      <td className="px-6 py-4">
                        <span className={priorityText(alert.priority)}>
                          {alert.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`${statusBadge(
                            alert.status
                          )} rounded-[15px] px-2 py-1 font-medium whitespace-nowrap`}
                        >
                          {alert.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600 transition-colors">
                          Xử lý
                        </button>
                        <button
                          onClick={() => handleDelete(alert.id)}
                          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                  {alerts.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-6 py-8 text-center text-gray-500"
                      >
                        Không có cảnh báo nào.
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
  );
}

export default AdminCanhBao;
