import React, { useState } from "react";
import { AdminDashboard } from "./components/admin/AdminDashboard";
import { DriverDashboard } from "./components/driver/DriverDashboard";
import { ParentDashboard } from "./components/parent/ParentDashboard";

function LoginPage({ onLogin }) {
  const [userType, setUserType] = useState("admin");

  const handleLogin = () => {
    onLogin({ type: userType, name: userType });
  };

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h1>🚌 Bus Tracking System</h1>
      <div style={{ margin: "20px 0" }}>
        <label>Chọn đối tượng: </label>
        <select value={userType} onChange={(e) => setUserType(e.target.value)}>
          <option value="admin">Quản trị viên</option>
          <option value="driver">Tài xế</option>
          <option value="parent">Phụ huynh</option>
        </select>
      </div>
      <button onClick={handleLogin}>Đăng nhập</button>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);

  if (!user) {
    return <LoginPage onLogin={setUser} />;
  }

  switch(user.type) {
    case "admin":
      return <AdminDashboard />;
    case "driver":
      return <DriverDashboard />;
    case "parent":
      return <ParentDashboard />;
    default:
      return <div>Loại người dùng không hợp lệ</div>;
  }
}

export default App;
