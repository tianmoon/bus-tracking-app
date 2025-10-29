import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';
import busImage from '../../assets/schoolbus.png';
import { toast } from 'react-toastify';
import axios from 'axios';

function Login() {
  const API_URL = "http://localhost:5000/api/auth/login";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate(); // Dùng để điều hướng

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(API_URL, {
        email: email,
        password: password,
        role: role 
      });
      if (response.data.status === "success") {

        // Lưu thông tin người dùng vào localStorage
        localStorage.setItem('user', JSON.stringify(response.data.data));
        
        // Điều hướng theo vai trò
        if (role === "manager") {
          navigate("/admin/dashboard");
        } else if (role === "driver") {
          navigate("/driver/schedules");
        } else if (role === "parent") {
          navigate("/parent/child-info");
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Đã xảy ra lỗi trong quá trình đăng nhập.");
    } finally {
      setLoading(false);
    }
  
  };

    return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Đăng nhập</h2>

        {error && <p className="error-message">{error}</p>}

        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select onChange={(e) => setRole(e.target.value)}>
          <option value="">Chọn vai trò</option>
          <option value="manager">Quản lý</option>
          <option value="parent">Phụ huynh</option>
          <option value="driver">Tài xế</option>
        </select>
        <button type="submit" disabled={loading}  className="login-btn">
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>

        <button type="button" className="forgot-btn">Quên mật khẩu</button>
      </form>

      <div className="bus-image">
        <img src={busImage} alt="School Bus" />
      </div>
    </div>
  );
}

export default Login