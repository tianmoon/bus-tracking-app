import React, { useMemo, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import { Bell, CheckCircle, Bus } from "lucide-react";

function DriverTripReport() {
  const [tripData] = useState({
    title: "Báo cáo chuyến đi",
    date: "Thứ Hai, 11 tháng 10, 2024",
    status: "Đang hoạt động",
    driver: { name: "Nguyễn Văn A", role: "Tài xế xe buýt" },
    stops: [
      {
        id: 1,
        name: "Điểm 1: 123 Lê Lợi, Quận 1",
        address: "Trường tiểu học ABC",
        time: "8:00",
        arrivalTime: "8:30",
        distance: "8.0km",
        students: 30,
        studentsReceived: 30,
        issue: "Kẹt xe dẫn đến trễ 5 phút.",
        status: "completed",
      },
    ],
  });

  const todayStr = useMemo(() => {
    try {
      return new Date().toLocaleDateString("vi-VN", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    } catch {
      return tripData.date;
    }
  }, [tripData.date]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userRole="driver" />

      <div className="flex-1">
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{tripData.title}</h1>
              <p className="text-sm text-gray-500">{todayStr}</p>
            </div>
            <div className="flex items-center gap-5">
              <div className="relative">
                <Bell size={22} className="text-gray-600" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
              </div>
              <div className="flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2" />
                <span className="text-sm text-gray-600 mr-4">{tripData.status}</span>
                <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white mr-2">
                  <Bus size={18} />
                </div>
                <div>
                  <div className="font-medium">{tripData.driver.name}</div>
                  <div className="text-xs text-gray-500">{tripData.driver.role}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border">
            <div className="px-6 py-4 border-b">
              <h2 className="text-lg font-semibold text-gray-800">Chi tiết các điểm dừng</h2>
            </div>
            <div className="p-6 space-y-6">
              {tripData.stops.map((stop) => (
                <div key={stop.id} className="bg-gray-50 border rounded-xl p-5">
                  <div className="flex items-start justify-between pb-4 mb-4 border-b">
                    <div>
                      <div className="inline-flex items-center px-3 py-1 rounded-lg bg-green-600 text-white text-sm font-semibold">
                        {stop.name}
                      </div>
                      <p className="mt-2 text-sm text-gray-600">
                        <span className="font-medium text-gray-700">Điểm đến: </span>
                        {stop.address}
                      </p>
                    </div>
                    <button className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition">
                      <CheckCircle size={18} />
                      Đã hoàn thành
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    <div className="bg-white border rounded-lg p-4">
                      <p className="text-xs uppercase tracking-wide text-gray-500">Thời gian khởi hành</p>
                      <p className="mt-1 text-sm font-semibold text-gray-900">{stop.time}</p>
                    </div>
                    <div className="bg-white border rounded-lg p-4">
                      <p className="text-xs uppercase tracking-wide text-gray-500">Thời gian đến</p>
                      <p className="mt-1 text-sm font-semibold text-gray-900">{stop.arrivalTime}</p>
                    </div>
                    <div className="bg-white border rounded-lg p-4">
                      <p className="text-xs uppercase tracking-wide text-gray-500">Khoảng cách</p>
                      <p className="mt-1 text-sm font-semibold text-gray-900">{stop.distance}</p>
                    </div>
                    <div className="bg-white border rounded-lg p-4">
                      <p className="text-xs uppercase tracking-wide text-gray-500">Số lượng học sinh</p>
                      <p className="mt-1 text-sm font-semibold text-gray-900">{stop.students}</p>
                    </div>
                    <div className="bg-white border rounded-lg p-4">
                      <p className="text-xs uppercase tracking-wide text-gray-500">Số học sinh được trả</p>
                      <p className="mt-1 text-sm font-semibold text-gray-900">{stop.studentsReceived}</p>
                    </div>
                    <div className="bg-white border-l-4 border-amber-400 rounded-lg p-4">
                      <p className="text-xs uppercase tracking-wide text-gray-500">Sự cố</p>
                      <p className="mt-1 text-sm text-gray-800">{stop.issue}</p>
                    </div>
                  </div>
                </div>
              ))}

              {tripData.stops.length === 0 && (
                <div className="text-center text-gray-500 py-8">Không có dữ liệu chuyến đi.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DriverTripReport;
