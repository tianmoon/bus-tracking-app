import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import './App.css';
import busImage from './assets/schoolbus.png';
import Dashboard from "./Dashboard";

function LoginPage() {
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
    ) 
    {
      setError("");
      alert("Đăng nhập thành công!");
      navigate("/dashboard"); // Điều hướng đến Dashboard
    } 
    else 
    {
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

// Cấu trúc router cho toàn bộ ứng dụng
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

