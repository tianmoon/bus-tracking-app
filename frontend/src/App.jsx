import './App.css';
import busImage from './assets/schoolbus.png'; // Thêm hình minh họa xe buýt

function App() {
  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Smart School Bus Tracking System</h2>
        <input type="text" placeholder="Email hoặc Số điện thoại" />
        <input type="password" placeholder="Mật khẩu" />
        <select>
          <option>Admin</option>
          <option>Phụ huynh</option>
          <option>Tài xế</option>
        </select>
        <button className="login-btn">Đăng nhập</button>
        <button className="forgot-btn">Quên mật khẩu</button>
      </div>
      <div className="bus-image">
        <img src={busImage} alt="School Bus" />
      </div>
    </div>
  );
}

export default App;

