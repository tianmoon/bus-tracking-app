// models/NotificationModel.js
import db from '../config/database.js';

class NotificationModel {
    // Tạo thông báo mới
    static async create(data) {
        try {
            const { content, type, trip_id, room } = data;
            // status mặc định là 'unread', sent_time dùng NOW()
            const [result] = await db.query(
                `INSERT INTO notification (content, type, sent_time, status, trip_id, room) 
                 VALUES (?, ?, NOW(), 'unread', ?, ?)`,
                [content, type, trip_id, room]
            );
            
            return result.insertId; // Trả về ntf_id vừa tạo
        } catch (error) {
            throw new Error('Lỗi tạo notification: ' + error.message);
        }
    }

    // (Tùy chọn) Lấy danh sách để hiện lên chuông
    static async getUnread() {
        const [rows] = await db.query(
            "SELECT * FROM notification WHERE status = 'unread' ORDER BY sent_time DESC LIMIT 20"
        );
        return rows;
    }
}

export default NotificationModel;