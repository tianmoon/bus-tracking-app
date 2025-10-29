import React, { useMemo } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Bell, MapPin, Bus, AlertTriangle } from "lucide-react";

function DriverRoute() {
  const todayStr = useMemo(() => {
    try {
      return new Date().toLocaleDateString("vi-VN", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    } catch {
      return "Hôm nay";
    }
  }, []);

  const stats = [
    { label: "Vị trí hiện tại", value: "Đường Nguyễn Huệ" },
    { label: "Trạm tiếp theo", value: "Trạm B" },
    { label: "Thời gian dự kiến", value: "10 phút" },
    { label: "Tốc độ hiện tại", value: "50 km/h" },
  ];

  const routeInfo = [
    { k: "Mã tuyến", v: "R01" },
    { k: "Quãng đường", v: "12 km" },
    { k: "Thời gian dự kiến", v: "30 phút" },
    { k: "Tổng trạm dừng", v: "4" },
  ];

  const stops = [
    { name: "Trạm 1", status: "Đã đến", badge: "bg-green-100 text-green-700" },
    { name: "Trạm 2", status: "Đang đến", badge: "bg-yellow-100 text-yellow-700" },
    { name: "Trạm 3", status: "Chưa đến", badge: "bg-gray-100 text-gray-700" },
    { name: "Trạm 4", status: "Chưa đến", badge: "bg-gray-100 text-gray-700" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userRole="driver" />

      <div className="flex-1">
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Bản đồ tuyến đường</h1>
              <p className="text-sm text-gray-500">{todayStr}</p>
            </div>
            <div className="flex items-center gap-5">
              <div className="relative">
                <Bell size={22} className="text-gray-600" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
              </div>
              <div className="flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2" />
                <span className="text-sm text-gray-600 mr-4">Đang hoạt động</span>
                <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white mr-2">
                  <Bus size={18} />
                </div>
                <div>
                  <div className="font-medium">Nguyễn Văn A</div>
                  <div className="text-xs text-gray-500">Tài xế xe buýt</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Điều hướng</h2>
            <div className="flex gap-3">
              <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition">
                Bắt đầu chuyến
              </button>
              <button className="bg-white border text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-50 transition">
                Báo cáo sự cố
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {stats.map((s, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-sm border p-4">
                <p className="text-sm text-gray-500">{s.label}</p>
                <p className="mt-1 text-lg font-semibold text-gray-900">{s.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 bg-white rounded-xl border shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={18} className="text-indigo-600" />
                <h3 className="font-semibold text-gray-800">Bản đồ trực tiếp</h3>
              </div>
              <div className="aspect-video w-full rounded-lg bg-gray-100 border flex items-center justify-center">
                <div className="flex items-center gap-2 text-gray-500">
                  <MapPin size={18} />
                  <span>Đang tải bản đồ...</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl border shadow-sm">
                <div className="px-4 py-3 border-b">
                  <h4 className="font-semibold text-gray-800">Thông tin tuyến đường</h4>
                </div>
                <div className="p-4">
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-3">
                    {routeInfo.map((r, i) => (
                      <div key={i} className="flex flex-col">
                        <dt className="text-xs uppercase tracking-wide text-gray-500">{r.k}</dt>
                        <dd className="text-sm font-medium text-gray-900">{r.v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>

              <div className="bg-white rounded-xl border shadow-sm">
                <div className="px-4 py-3 border-b flex items-center gap-2">
                  <AlertTriangle size={18} className="text-amber-600" />
                  <h4 className="font-semibold text-gray-800">Các điểm dừng</h4>
                </div>
                <div className="p-4 space-y-3">
                  {stops.map((s, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-sm text-gray-800">{s.name}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${s.badge}`}>{s.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl border shadow-sm">
                <div className="px-4 py-3 border-b">
                  <h4 className="font-semibold text-gray-800">Cảnh báo</h4>
                </div>
                <div className="p-4 text-sm text-gray-600">Không có cảnh báo mới.</div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
}

export default DriverRoute;
