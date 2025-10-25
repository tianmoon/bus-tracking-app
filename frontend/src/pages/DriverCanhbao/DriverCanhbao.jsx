import React from "react";
import { FaExclamationTriangle, FaTools, FaClock, FaLock } from "react-icons/fa";

const DriverCanhbao = () => {
  return (
    <div className="canhbao-container">
      {/* Header */}
      <div className="header">
        <h3>cảnh báo sự cố</h3>
        <p>báo cáo và theo dõi các sự cố trong lúc vận hành</p>
      </div>

      {/* Buttons group */}
      <div className="alert-buttons">
        <button className="btn gray"><FaClock /> chậm trễ</button>
        <button className="btn gray"><FaTools /> kỹ thuật</button>
        <button className="btn gray"><FaExclamationTriangle /> an toàn</button>
        <button className="btn gray"><FaLock /> khẩn cấp</button>
      </div>

      <div className="main-content">
        {/* Báo cáo sự cố mới */}
        <div className="report-section">
          <h3>báo cáo sự cố mới</h3>
          <form>
            <label>loại sự cố</label>
            <input type="text" />

            <label>mức nghiêm trọng</label>
            <input type="text" />

            <label>vị trí hiện tại</label>
            <input type="text" />

            <label>mô tả chi tiết</label>
            <textarea rows="3"></textarea>

            <label>dự kiến thời gian chậm trễ (phút)</label>
            <input type="number" />

            <div className="buttons">
              <button type="submit" className="btn-send">gửi báo cáo</button>
              <button type="button" className="btn-cancel">hủy</button>
            </div>
          </form>
        </div>

        {/* Liên hệ khẩn cấp */}
        <div className="contact-section">
          <h4>liên hệ khẩn cấp</h4>
          <div className="contact-box pink">
            <p>hotline hỗ trợ : 12345678</p>
          </div>
          <div className="contact-box pink">
            <p>quản lí tuyến : nguyễn văn a<br />sđt: 123456</p>
          </div>
          <button className="btn-danger">gọi ngay</button>
        </div>
      </div>
    </div>
  );
};

export default DriverCanhbao;
