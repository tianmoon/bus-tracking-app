import React from "react";
import {
FaBus,
FaBell,
FaHistory,
FaUserCircle,
FaCog,
FaChild,
} from "react-icons/fa";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header.jsx";


export function StudentInfoPH() {
return ( 
<div className="flex h-screen bg-gray-50 font-inter">
  {/* Sidebar */} 
  <Sidebar userRole='parent'/>

  {/* Main Content */}
  <main className="flex-1 p-6 overflow-y-auto">
    {/* Header */}
    <Header/>

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
