

import db from '../config/database.js';
// Import "cuốn sổ" và "hàm kiểm tra" từ file đăng nhập cũ của em
import { isLoggedIn } from '../controllers/authController.js';

export const authMiddlewareForDriver = async (req, res, next) => {
    try {
        // 1. LẤY THẺ TÊN (user_id) TỪ HEADER
        // Chúng ta quy ước React/Postman sẽ gửi 1 cái header tên là 'x-user-id'
        const userId = req.header('x-user-id');
        
        if (!userId) {
            return res.status(401).json({
                status: 'fail',
                message: 'Không có "thẻ tên" (x-user-id), truy cập bị từ chối'
            });
        }

        // 2. GỌI HÀM KIỂM TRA TỪ FILE AUTH CŨ
        // "Bảo vệ" chạy đi hỏi "cuốn sổ"
        if (!isLoggedIn(userId)) {
            return res.status(401).json({
                status: 'fail',
                message: 'Người dùng chưa đăng nhập, hoặc server đã khởi động lại.'
            });
        }
        
        // 3. Lấy thông tin User và Driver từ DB
        const [users] = await db.query(
            'SELECT user_id, email, role FROM User WHERE user_id = ? AND role = ?',
            [userId, 'driver']
        );

        if (users.length === 0) {
            return res.status(403).json({
                status: 'fail',
                message: 'Truy cập bị từ chối. Đây không phải tài khoản Driver.'
            });
        }
        
        // 4. LẤY DRIVER_ID
        const [drivers] = await db.query(
            'SELECT driver_id, name FROM Driver WHERE user_id = ?',
            [users[0].user_id]
        );

        if (drivers.length === 0) {
            return res.status(404).json({
                status: 'fail',
                message: 'Không tìm thấy hồ sơ tài xế.'
            });
        }

        // 5. Gắn thông tin vào request
        req.user = {
            userId: users[0].user_id,
            role: users[0].role,
            driverId: drivers[0].driver_id,
            name: drivers[0].name
        };

        // 6. Cho phép đi tiếp
        next(); 

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Lỗi server khi xác thực: ' + error.message
        });
    }
};