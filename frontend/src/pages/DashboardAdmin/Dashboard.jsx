import React, { useState, useEffect } from "react";
import Header from "../../components/Header.jsx";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Users, UserCheck, Bus, Route, UserCircle, Calendar } from "lucide-react";
import axios from "axios";

function Dashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalDrivers: 0,
    totalBuses: 0,
    totalRoutes: 0,
    totalParents: 0,
    totalSchedules: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Gọi API để lấy thống kê
      const [students, drivers, buses, routes, parents, schedules] = await Promise.all([
        axios.get('http://localhost:5000/api/students'),
        axios.get('http://localhost:5000/api/drivers'),
        axios.get('http://localhost:5000/api/buses'),
        axios.get('http://localhost:5000/api/routes'),
        axios.get('http://localhost:5000/api/parents'),
        axios.get('http://localhost:5000/api/schedules')
      ]);

      setStats({
        totalStudents: students.data?.data?.length || 0,
        totalDrivers: drivers.data?.data?.length || 0,
        totalBuses: buses.data?.data?.length || 0,
        totalRoutes: routes.data?.data?.length || 0,
        totalParents: parents.data?.data?.length || 0,
        totalSchedules: schedules.data?.data?.length || 0
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const statsCards = [
    {
      title: "Tổng Học Sinh",
      value: stats.totalStudents,
      icon: Users,
      color: "bg-blue-500",
      textColor: "text-blue-500",
      bgLight: "bg-blue-50"
    },
    {
      title: "Tổng Tài Xế",
      value: stats.totalDrivers,
      icon: UserCheck,
      color: "bg-green-500",
      textColor: "text-green-500",
      bgLight: "bg-green-50"
    },
    {
      title: "Tổng Xe Bus",
      value: stats.totalBuses,
      icon: Bus,
      color: "bg-purple-500",
      textColor: "text-purple-500",
      bgLight: "bg-purple-50"
    },
    {
      title: "Tổng Tuyến Đường",
      value: stats.totalRoutes,
      icon: Route,
      color: "bg-orange-500",
      textColor: "text-orange-500",
      bgLight: "bg-orange-50"
    },
    {
      title: "Tổng Phụ Huynh",
      value: stats.totalParents,
      icon: UserCircle,
      color: "bg-pink-500",
      textColor: "text-pink-500",
      bgLight: "bg-pink-50"
    },
    {
      title: "Tổng Lịch Trình",
      value: stats.totalSchedules,
      icon: Calendar,
      color: "bg-indigo-500",
      textColor: "text-indigo-500",
      bgLight: "bg-indigo-50"
    }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userRole='admin'/>
      <div className="flex-1">
        <Header />
        
        {/* Dashboard Content */}
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Tổng quan</h1>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {statsCards.map((card, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        {card.title}
                      </p>
                      <p className="text-3xl font-bold text-gray-800 mt-2">
                        {card.value}
                      </p>
                    </div>
                    <div className={`${card.bgLight} p-4 rounded-full`}>
                      <card.icon className={`w-8 h-8 ${card.textColor}`} />
                    </div>
                  </div>
                  <div className={`mt-4 h-1 ${card.color} rounded-full`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
