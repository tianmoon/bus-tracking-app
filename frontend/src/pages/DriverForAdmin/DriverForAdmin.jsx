import React, { useState, useEffect } from 'react';
import {
  Search, Plus, Edit, Trash2, Mail, Phone,
  Users, Bus, Route, UserCheck, Home,
  MessageSquare, Bell, Calendar, CircleUserRound
} from 'lucide-react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar/Sidebar';
import { toast } from 'react-toastify';
import Header from '../../components/Header';
const DriverForAdmin = () => {
  const [drivers, setDrivers] = useState([]);
  const [buses, setBuses] = useState([]);

  // Fetch tai xe 
  const fetchDrivers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/drivers/');
      setDrivers(response.data.data);
    }
    catch (error) {
      console.error(error.response?.data?.message || error.message);
      toast.error("Lỗi khi tải danh sách tài xế.");
    }
  };



  useEffect(() => {
    fetchDrivers();
  }, []);



  // const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);

  // Filter drivers based on search term
  // const filteredDrivers = drivers.filter(driver =>
  //   driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   driver.phone_number.includes(searchTerm) ||
  //   driver.route.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  // const handleDelete = (id) => {
  //   if (window.confirm('Bạn có chắc muốn xóa tài xế này?')) {
  //     setDrivers(drivers.filter(driver => driver.id !== id));
  //   }
  // };

  // const handleEdit = (driver) => {
  //   setEditingDriver(driver);
  //   setIsAddModalOpen(true);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const driverData = {
      id: editingDriver ? editingDriver.id : Date.now(),
      name: formData.get('name'),
      phone_number: formData.get('phone_number'),
      // route: formData.get('route'),
      email: formData.get('email'),
      // status: formData.get('status')
    };

    // if (editingDriver) {
    //   setDrivers(drivers.map(d => d.id === editingDriver.id ? driverData : d));
    // } else {
    //   setDrivers([...drivers, driverData]);
    // }

    try {
      const response = await axios.post('http://localhost:5000/api/drivers', driverData);
      if (response.data.status === 'success') {
        toast.success("Thêm tài xế thành công!");
      }
      fetchDrivers();
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      toast.error(`Lỗi khi thêm tài xế: ${error.response?.data?.message}`);
    }

    setIsAddModalOpen(false);
    // setEditingDriver(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar userRole='admin' />

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        {/* <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border-l-4 border-blue-500">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Dashboard Quản lý</h1>
              <p className="text-gray-600 mt-1">Tổng quan hệ thống xe buýt trường học</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <div className="flex items-center space-x-3 bg-gray-50 px-4 py-2 rounded-lg border">
                <div className="text-2xl">👨‍💼</div>
                <div>
                  <div className="font-semibold text-gray-800">Admin User</div>
                  <div className="text-xs text-gray-500">Quản trị viên hệ thống</div>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        <Header/>

        {/* Driver Management Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Header with Search and Add Button */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <h2 className="text-xl font-bold text-gray-800">Danh sách tài xế</h2>
              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                <div className="relative">

                  {/* // Thanh tìm kiếm đã bị ẩn */}
                  {/* <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm tài xế..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full lg:w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  /> */}
                </div>
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Thêm tài xế
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-y-hidden">
            <table className="w-full table-fixed">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số điện thoại</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tuyến phụ trách</th> */}
                  {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th> */}
                </tr>
              </thead>
            </table>
            <div className="overflow-y-auto max-h-165">
              <table className="w-full table-fixed">
                <tbody className="bg-white divide-y divide-gray-200">
                  {drivers.length > 0 ? (
                    drivers.map((driver) => (
                      <tr key={driver.driver_id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{driver.driver_id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{driver.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            {driver.phone_number}
                          </div>
                        </td>
                        {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{driver.route}</td> */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{driver.email}</td>

                        {/* // Active is hidden */}
                        {/* <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${driver.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                          }`}>
                          {driver.status === 'active' ? 'Đang hoạt động' : 'Ngừng hoạt động'}
                        </span>
                      </td> */}
                        {/* {driver.plate_number ? 
                        (<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{driver.plate_number}</td>) : 
                        (<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Chưa có</td>)} */}
                        {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center gap-2">
                            <button
                            onClick={() => handleEdit(driver)}
                            className="text-blue-600 hover:text-blue-900 flex items-center gap-1 px-3 py-1 rounded hover:bg-blue-50 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                            Sửa
                          </button>
                          <button
                            onClick={() => handleDelete(driver.id)}
                            className="text-red-600 hover:text-red-900 flex items-center gap-1 px-3 py-1 rounded hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                            Xóa
                          </button>
                            <button className="text-green-600 hover:text-green-900 flex items-center gap-1 px-3 py-1 rounded hover:bg-green-50 transition-colors">
                              <Mail className="w-4 h-4" />
                              Nhắn tin
                            </button>
                          </div>
                        </td> */}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-4 text-gray-500">
                        Chưa có thông tin tài xế
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 inset-0 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">
                {editingDriver ? 'Chỉnh sửa tài xế' : 'Thêm tài xế mới'}
              </h3>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên tài xế</label>
                <input
                  type="text"
                  name="name"
                  // defaultValue={editingDriver?.name || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                <input
                  type="tel"
                  name="phone_number"
                  // defaultValue={editingDriver?.phone || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="text"
                  name="email"
                  // defaultValue={editingDriver?.phone || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tuyến phụ trách</label>
                <input
                  type="text"
                  name="route"
                  // defaultValue={editingDriver?.route || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div> */}
              {/* // Active  */}
              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
                <select
                  name="status"
                  defaultValue={editingDriver?.status || 'active'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="active">Đang hoạt động</option>
                  <option value="inactive">Ngừng hoạt động</option>
                </select>
              </div> */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingDriver ? 'Cập nhật' : 'Thêm mới'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    // setEditingDriver(null);
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DriverForAdmin;