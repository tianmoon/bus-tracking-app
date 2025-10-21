import React from "react";
import {
FaBus,
FaBell,
FaHistory,
FaUserCircle,
FaCog,
FaChild,
} from "react-icons/fa";

export function StudentInfoPH() {
return ( 
<div className="flex h-screen bg-gray-50 font-inter">
  {/* Sidebar */} 
  <aside className="w-56 bg-blue-900 text-white flex flex-col p-5"> 
    <div className="flex items-center mb-8"> <FaBus className="text-4xl text-blue-300 mr-2" /> 
      <h2 className="text-lg font-semibold leading-tight">SafeBus Parent</h2> 
    </div>
    <ul className="space-y-2">
      <li className="hover:bg-blue-700 cursor-pointer rounded-lg px-3 py-2">🚌 Theo dõi xe buýt</li>
      <li className="hover:bg-blue-700 cursor-pointer rounded-lg px-3 py-2">🔔 Thông báo</li>
      <li className="hover:bg-blue-700 cursor-pointer rounded-lg px-3 py-2">🧾 Lịch sử chuyến đi</li>
      <li className="bg-blue-700 rounded-lg px-3 py-2 font-medium">👦 Thông tin con em</li>
      <li className="hover:bg-blue-700 cursor-pointer rounded-lg px-3 py-2">⚙️ Cài đặt</li>
    </ul>
  </aside>

  {/* Main Content */}
  <main className="flex-1 p-6 overflow-y-auto">
    {/* Header */}
    <header className="flex justify-between items-center border-b border-gray-200 pb-3">
      <div>
        <h3 className="text-xl font-semibold text-gray-800">Thông tin con em</h3>
        <p className="text-gray-500 text-sm">Xem chi tiết thông tin học sinh và tuyến xe buýt của con bạn</p>
      </div>
      <div className="flex items-center gap-2 text-gray-700 font-medium">
        <FaUserCircle className="text-3xl text-blue-900" />
        <span>Nguyễn Thị Lan</span>
      </div>
    </header>

    {/* Student Card */}
    <section className="mt-6 flex justify-start">
      <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-6 w-[450px]">
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FaChild className="text-blue-600" /> Thông tin con em
          </h4>

          <div className="space-y-1 text-gray-700 text-sm">
            <p><b>Họ tên:</b> Nguyễn Minh An</p>
            <p><b>Lớp:</b> 8A2</p>
            <p><b>Trường:</b> THCS ABC</p>
            <p><b>Tuyến xe:</b> Số 15</p>
            <p><b>Điểm đón:</b> Ngã tư Bình Triệu</p>
          </div>
        </div>

        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="student"
          className="w-28 h-28 rounded-full object-cover border border-gray-200"
        />
      </div>
    </section>
  </main>
</div>

);
}


export default StudentInfoPH;
