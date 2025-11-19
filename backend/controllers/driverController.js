import db from '../config/database.js';
import Driver from '../models/DriverModel.js';
import { createDriverService } from '../services/driverService.js';

// Lấy tất cả tài xế
export const getAllDrivers = async (req, res) => {
    try {
        const drivers = await Driver.getAll();
        res.status(200).json({
            status: 'success',
            data: drivers,
            message: 'Lấy danh sách tài xế thành công'
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
            code: 500
        });
    }
}

// Lấy tài xế theo ID
export const getDriverById = async (req, res) => {
    try {
        const driverId = req.params.id;
        const driver = await Driver.getById(driverId);
        // Kiểm tra nếu tài xế không tồn tại
        if(!driver) {
            return res.status(404).json({
                status: 'fail',
                message: 'Tài xế không tồn tại',
                code: 404
            });
        }
        res.status(200).json({
            status: 'success',
            data: driver,
            message: 'Lấy tài xế theo ID thành công'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
            code: 500
        });
    }
}

// Thêm tài xế mới
export const createDriver = async (req, res) => {
    try {
        const driverData = req.body;
        if (!driverData.name) {
            return res.status(400).json({
                status: 'fail',
                message: 'Thiếu thông tin bắt buộc: name',
                code: 400
            });
        }
        const newDriver = await createDriverService(driverData);
        res.status(201).json({
            status: 'success',
            data: newDriver,
            message: 'Thêm tài xế mới thành công'
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
            code: 500
        });
    }
}
// Helper: Lấy DriverID từ UserID (Dùng nội bộ trong file này)
const getDriverIdFromUser = async (userId) => {
    const [rows] = await db.query('SELECT driver_id FROM Driver WHERE user_id = ?', [userId]);
    return rows.length > 0 ? rows[0].driver_id : null;
};

// API: Lấy Profile của chính tài xế đang đăng nhập
export const getMyProfile = async (req, res) => {
    try {
        // Giả sử middleware đã gắn user vào req.user hoặc lấy từ header tạm
        const userId = req.header('x-user-id'); 
        const driverId = await getDriverIdFromUser(userId);
        
        if (!driverId) return res.status(404).json({ message: 'Không tìm thấy hồ sơ tài xế' });

        const [driver] = await db.query(
            `SELECT d.driver_id, d.name, u.email, u.phone_number, b.bus_id, b.plate_number
            FROM Driver d
            INNER JOIN User u ON d.user_id = u.user_id
            LEFT JOIN Bus b ON d.driver_id = b.driver_id
            WHERE d.driver_id = ?`, [driverId]
        );
        res.status(200).json({ status: 'success', data: driver[0] });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// API: Lấy lịch trình hôm nay
export const getMyTodayTrips = async (req, res) => {
    try {
        const userId = req.header('x-user-id');
        const driverId = await getDriverIdFromUser(userId);
        const today = new Date().toISOString().split('T')[0];

        const [trips] = await db.query(
            `SELECT t.trip_id, t.status, t.departure_time, t.arrival_time,
                r.name as route_name, b.plate_number
             FROM Trip t
             JOIN Assignment a ON t.asn_id = a.asn_id
             JOIN Bus b ON a.bus_id = b.bus_id
             JOIN Schedule s ON a.schedule_id = s.schedule_id
             JOIN Route r ON s.route_id = r.route_id
             WHERE b.driver_id = ? AND a.asn_date = ?
             ORDER BY t.departure_time ASC`,
            [driverId, today]
        );
        res.status(200).json({ status: 'success', data: trips });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// API: Lấy chi tiết chuyến đi
export const getTripDetails = async (req, res) => {
    try {
        const { id: tripId } = req.params;
        const userId = req.header('x-user-id');
        const driverId = await getDriverIdFromUser(userId);

        // Check quyền
        const [check] = await db.query(
            `SELECT t.trip_id, b.bus_id, r.route_id 
             FROM Trip t JOIN Assignment a ON t.asn_id = a.asn_id 
             JOIN Bus b ON a.bus_id = b.bus_id 
             JOIN Schedule s ON a.schedule_id = s.schedule_id
             JOIN Route r ON s.route_id = r.route_id
             WHERE t.trip_id = ? AND b.driver_id = ?`, [tripId, driverId]
        );

        if (check.length === 0) return res.status(403).json({ message: 'Không có quyền truy cập' });
        const { bus_id, route_id } = check[0];

        // Lấy data
        const [tripInfo] = await db.query(`SELECT * FROM Trip WHERE trip_id = ?`, [tripId]);
        const [stops] = await db.query(`SELECT * FROM BusStop WHERE route_id = ? ORDER BY order_index`, [route_id]);
        const [students] = await db.query(
            `SELECT s.student_id, s.name, s.grade, r.status as current_status
             FROM Student s
             LEFT JOIN Report r ON s.student_id = r.student_id AND r.trip_id = ?
             WHERE s.bus_id = ?`, [tripId, bus_id]
        );

        // Summary report
        const summary = {
            total: students.length,
            picked_up: students.filter(s => s.current_status === 'picked_up').length,
            dropped_off: students.filter(s => s.current_status === 'dropped_off').length,
            absent: students.filter(s => s.current_status === 'absent').length
        };

        res.status(200).json({
            status: 'success',
            data: { info: tripInfo[0], stops, students, summary }
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// API: Điểm danh
export const updateStudentStatus = async (req, res) => {
    try {
        const { trip_id, student_id, status } = req.body;
        // Có thể thêm logic check driverId ở đây nếu cần bảo mật cao hơn
        
        const [exists] = await db.query('SELECT report_id FROM Report WHERE trip_id = ? AND student_id = ?', [trip_id, student_id]);
        
        if (exists.length > 0) {
            await db.query('UPDATE Report SET status = ?, timestamp = NOW() WHERE report_id = ?', [status, exists[0].report_id]);
        } else {
            await db.query('INSERT INTO Report (trip_id, student_id, status, timestamp) VALUES (?, ?, ?, NOW())', [trip_id, student_id, status]);
        }
        res.json({ status: 'success', message: 'Đã cập nhật trạng thái' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// API: Gửi cảnh báo
export const sendAlert = async (req, res) => {
    try {
        const { trip_id, type, content } = req.body;
        await db.query(
            `INSERT INTO Notification (content, type, sent_time, status, trip_id) VALUES (?, ?, NOW(), 'unread', ?)`,
            [content, type, trip_id]
        );
        res.json({ status: 'success', message: 'Đã gửi cảnh báo' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};



