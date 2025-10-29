import React, { useState } from 'react';
import { 
  Search, Plus, Edit, Trash2, Mail, Phone, 
  Users, Bus, Route, UserCheck, Home, 
  MessageSquare, Bell, Calendar 
} from 'lucide-react';
import Sidebar from '../../components/Sidebar/Sidebar';
const DriverForAdmin = () => {
  const [drivers, setDrivers] = useState([
    {
      id: 1,
      name: 'Nguyễn Văn A',
      phone: '0123456789',
      route: 'Tuyến A',
      bus: '81AH-9999',
      status: 'active'
    },
    {
      id: 2,
      name: 'Trần Thị B',
      phone: '0987654321',
      route: 'Tuyến B',
      bus: '72BH-8888',
      status: 'inactive'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);

  const filteredDrivers = drivers.filter(driver =>
    driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.phone.includes(searchTerm) ||
    driver.route.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa tài xế này?')) {
      setDrivers(drivers.filter(driver => driver.id !== id));
    }
  };

  const handleEdit = (driver) => {
    setEditingDriver(driver);
    setIsAddModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const driverData = {
      id: editingDriver ? editingDriver.id : Date.now(),
      name: formData.get('name'),
      phone: formData.get('phone'),
      route: formData.get('route'),
      bus: formData.get('bus'),
      status: formData.get('status')
    };

    if (editingDriver) {
      setDrivers(drivers.map(d => d.id === editingDriver.id ? driverData : d));
    } else {
      setDrivers([...drivers, driverData]);
    }

    setIsAddModalOpen(false);
    setEditingDriver(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-blue-800 to-blue-900 text-white p-6 fixed left-0 top-0 h-full overflow-y-auto">
        {/* Logo */}
        <div className="text-center mb-8 pb-6 border-b border-blue-700">
          <div className="text-4xl mb-2">🚌</div>
          <h2 className="text-xl font-bold">Schedules Pro</h2>
          <div className="text-xs bg-blue-700 px-3 py-1 rounded-full inline-block mt-2">
            Quản trị viên
          </div>
        </div>

        {/* Menu */}
        <ul className="space-y-2">
          <li className="flex items-center space-x-3 p-3 bg-blue-600 rounded-lg cursor-pointer">
            <Home size={20} />
            <span>Tổng quan</span>
          </li>
          <li className="flex items-center space-x-3 p-3 hover:bg-blue-700 rounded-lg cursor-pointer transition-colors">
            <UserCheck size={20} />
            <span>Tài xế</span>
          </li>
          <li className="flex items-center space-x-3 p-3 hover:bg-blue-700 rounded-lg cursor-pointer transition-colors">
            <Users size={20} />
            <span>Học sinh</span>
          </li>
          <li className="flex items-center space-x-3 p-3 hover:bg-blue-700 rounded-lg cursor-pointer transition-colors">
            <Bus size={20} />
            <span>Xe buýt</span>
          </li>
          <li className="flex items-center space-x-3 p-3 hover:bg-blue-700 rounded-lg cursor-pointer transition-colors">
            <Route size={20} />
            <span>Tuyến đường</span>
          </li>
          <li className="flex items-center space-x-3 p-3 hover:bg-blue-700 rounded-lg cursor-pointer transition-colors">
            <Calendar size={20} />
            <span>Lịch trình</span>
          </li>
          <li className="flex items-center space-x-3 p-3 hover:bg-blue-700 rounded-lg cursor-pointer transition-colors">
            <MessageSquare size={20} />
            <span>Tin nhắn</span>
          </li>
          <li className="flex items-center space-x-3 p-3 hover:bg-blue-700 rounded-lg cursor-pointer transition-colors">
            <Bell size={20} />
            <span>Cảnh báo</span>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 p-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border-l-4 border-blue-500">
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
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-md transition-shadow">
            <h3 className="text-gray-600 font-semibold mb-2">Tổng học sinh</h3>
            <p className="text-3xl font-bold text-blue-600">250</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-md transition-shadow">
            <h3 className="text-gray-600 font-semibold mb-2">Tổng tài xế</h3>
            <p className="text-3xl font-bold text-green-600">{drivers.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-md transition-shadow">
            <h3 className="text-gray-600 font-semibold mb-2">Xe buýt</h3>
            <p className="text-3xl font-bold text-orange-600">15</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-md transition-shadow">
            <h3 className="text-gray-600 font-semibold mb-2">Tuyến đường</h3>
            <p className="text-3xl font-bold text-purple-600">8</p>
          </div>
        </div>

        {/* Driver Management Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Header with Search and Add Button */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <h2 className="text-xl font-bold text-gray-800">Danh sách tài xế</h2>
              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm tài xế..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full lg:w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
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
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số điện thoại</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tuyến phụ trách</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Xe buýt chỉ định</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDrivers.map((driver) => (
                  <tr key={driver.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{driver.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{driver.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        {driver.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{driver.route}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{driver.bus}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                        driver.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {driver.status === 'active' ? 'Đang hoạt động' : 'Ngừng hoạt động'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
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
                  defaultValue={editingDriver?.name || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                <input
                  type="tel"
                  name="phone"
                  defaultValue={editingDriver?.phone || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tuyến phụ trách</label>
                <input
                  type="text"
                  name="route"
                  defaultValue={editingDriver?.route || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Xe buýt chỉ định</label>
                <input
                  type="text"
                  name="bus"
                  defaultValue={editingDriver?.bus || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
                <select
                  name="status"
                  defaultValue={editingDriver?.status || 'active'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="active">Đang hoạt động</option>
                  <option value="inactive">Ngừng hoạt động</option>
                </select>
              </div>
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
                    setEditingDriver(null);
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