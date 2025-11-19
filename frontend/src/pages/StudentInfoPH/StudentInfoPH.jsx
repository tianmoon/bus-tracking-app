import React, { useContext, useState, useEffect } from "react";
import {
  FaChild,
} from "react-icons/fa";
import { CircleUserRound } from "lucide-react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header.jsx";
import { AppContext } from "../../context/AppContext.jsx";
import { toast } from "react-toastify";

export function StudentInfoPH() {
  const [childs, setChilds] = useState([]);
  const { user } = useContext(AppContext);

  const fetchChilds = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/parents/childs/${user.parent_id}`);
      const data = await response.json();
      setChilds(data.data);
    } catch (error) {
      console.error('Error fetching childs:', error.data?.message || error.message);
      toast.error('Lỗi khi tải thông tin con em.');
    }
  };

  useEffect(() => {
    fetchChilds();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar userRole='parent' />

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <Header />

        {/* Student Card */}
        <div className="p-6">
          {childs.length > 0 ? (
            <div className="flex flex-wrap gap-6">
              {childs.map((child) => (
                <div key={child.student_id} className="bg-white rounded-xl shadow-md p-6 flex items-center gap-6 w-[450px]">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <FaChild className="text-blue-600" /> Thông tin con em
                  </h4>

                  <div className="space-y-1 text-gray-700 text-sm">
                    <p><b>Mã học sinh:</b> {child.student_id}</p>
                    <p><b>Họ tên:</b> {child.name}</p>
                    <p><b>Lớp:</b> {child.grade}</p>
                    <p><b>Trường:</b> Đại học Sài Gòn</p>
                    <p><b>Xe:</b> {child.plate_number}</p>
                  </div>
                </div>

                <CircleUserRound className="w-28 h-28 rounded-full object-cover border border-gray-200" />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mt-10 text-gray-600">
            Không có thông tin học sinh
          </div>
        )}
        </div>
      </div>
    </div>

  );
}


export default StudentInfoPH;
