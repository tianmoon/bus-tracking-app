// controllers/notificationController.js
import Notification from '../models/NotificationModel.js';

// Biến io cần được truyền vào hoặc export từ server.js (như cách em làm message)
// Giả sử em dùng global.io hoặc import io từ file server
export const createAlert = async (req, res) => {
    try {
        const { tripId, type, content } = req.body;

        // 1. Validate dữ liệu đầu vào cho khớp với ENUM trong DB
        // DB của em chỉ có: 'delayed', 'arrival', 'breakdown'
        const validTypes = ['delayed', 'arrival', 'breakdown'];
        const finalType = validTypes.includes(type) ? type : 'breakdown'; // Fallback nếu sai

        // 2. Lưu vào Database
        const newNotifId = await Notification.create({
            content: content,
            type: finalType,
            trip_id: tripId
        });

        const newNotificationData = {
            id: newNotifId,
            content: content,
            type: finalType,
            trip_id: tripId,
            timestamp: new Date(),
            sender: "Tài xế (Chuyến #" + tripId + ")"
        };

        // 3. BẮN SOCKET (Real-time)
        // Em cần đảm bảo server.js đã gán io (ví dụ: req.app.get('io') hoặc global.io)
        // Hoặc đơn giản nhất là gửi socket từ client lên như cách cũ, 
        // nhưng chuẩn nhất là server bắn xuống:
        
        // Cách lấy IO từ req (nếu em setup ở server.js: app.set('io', io))
        const io = req.app.get('io'); 
        if (io) {
            // Gửi cho Admin
            io.emit('new-notification', newNotificationData);
            console.log("Đã bắn socket notification:", newNotificationData);
        }

        res.status(201).json({
            status: 'success',
            data: newNotificationData,
            message: 'Đã gửi cảnh báo thành công'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: error.message });
    }
};