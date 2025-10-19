import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';
import busImage from '../../assets/schoolbus.png';
// import Dashboard from "./Dashboard";
// import DashboardPH from "./DashboardPH"; // Phụ huynh
// import DashboardTaixe from "./DashboardTaixe"; // Tài xế

function Login() {
  const [error, setError] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Admin");
  const navigate = useNavigate(); // Dùng để điều hướng

  const handleLogin = (e) => {
    e.preventDefault();

    // Kiểm tra thông tin đăng nhập
    if (
      (emailOrPhone === "admin" && password === "ADMIN" && role === "Admin") ||
      (emailOrPhone === "parent" && password === "PARENT" && role === "Phụ huynh") ||
      (emailOrPhone === "driver" && password === "DRIVER" && role === "Tài xế")
    ) {
      setError("");
      alert("Đăng nhập thành công!");

      // Điều hướng theo vai trò
      if (role === "Admin") {
        navigate("/dashboard");
      } else if (role === "Tài xế") {
        navigate("/dashboard-container");
      } else if (role === "Phụ huynh") {
        navigate("/ph-container");
      }
    } else {
      setError("Thông tin đăng nhập không chính xác.");
    }
  };

    return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Smart School Bus Tracking System</h2>

        {error && <p className="error-message">{error}</p>}

        <input
          type="text"
          placeholder="Email hoặc Số điện thoại"
          value={emailOrPhone}
          onChange={(e) => setEmailOrPhone(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="Admin">Admin</option>
          <option value="Phụ huynh">Phụ huynh</option>
          <option value="Tài xế">Tài xế</option>
        </select>
        <button className="login-btn">Đăng nhập</button>
        <button type="button" className="forgot-btn">Quên mật khẩu</button>
      </form>

      <div className="bus-image">
        <img src={busImage} alt="School Bus" />
      </div>
    </div>
  );
}

export default Login