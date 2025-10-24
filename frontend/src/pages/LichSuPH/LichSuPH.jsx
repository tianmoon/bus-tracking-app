import React from "react";
import { FaCheckCircle, FaEllipsisH } from "react-icons/fa";

const LichSuPH = () => {
  const trips = [
    {
      date: "24/10/2025",
      route: "2",
      bus: "A-1234",
      destination: "THCS - ABC",
      start: "6h42",
      status: "Đang chạy",
      color: "bg-blue-100",
      border: "border-blue-400",
      icon: <FaEllipsisH className="text-blue-600 text-xl" />,
    },
    {
      date: "23/10/2025",
      route: "2",
      bus: "A-1234",
      destination: "456 Nguyễn Huệ, Q1",
      start: "17h10",
      end: "17h23",
      color: "bg-green-100",
      border: "border-green-400",
      icon: <FaCheckCircle className="text-green-600 text-3xl" />,
    },
    {
      date: "23/10/2025",
      route: "2",
      bus: "A-1234",
      destination: "THCS - ABC",
      start: "6h45",
      end: "6h59",
      color: "bg-green-100",
      border: "border-green-400",
      icon: <FaCheckCircle className="text-green-600 text-3xl" />,
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-center text-lg font-semibold mb-6 text-gray-800">
          Lịch sử chuyến đi
        </h2>

        <div className="space-y-4">
          {trips.map((trip, index) => (
            <div
              key={index}
              className={`flex justify-between items-center p-4 rounded-xl ${trip.color} border ${trip.border}`}
            >
              <div>
                <p className="font-semibold text-gray-800 mb-2">{trip.date}</p>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                  <p>Tuyến: {trip.route}</p>
                  <p>Số xe: {trip.bus}</p>
                </div>
                <div className="text-sm text-gray-700 mt-1 border-l-2 pl-2 border-gray-300">
                  Điểm đến: {trip.destination}
                </div>
                <div className="mt-1 text-sm font-medium">
                  <span className="mr-3">
                    Bắt đầu: <span className="font-semibold">{trip.start}</span>
                  </span>
                  {trip.end ? (
                    <>
                      Kết thúc:{" "}
                      <span className="font-semibold">{trip.end}</span>
                    </>
                  ) : (
                    <span className="text-blue-700 font-semibold">
                      {trip.status}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex-shrink-0">{trip.icon}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LichSuPH;
