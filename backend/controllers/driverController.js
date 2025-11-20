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
// ==========================================
// 🚀 PHẦN MỚI: API CHO APP TÀI XẾ
// ==========================================

// 1. Lấy dữ liệu tổng quan cho Dashboard (Profile + Lịch trình)
export const getDriverDashboardInfo = async (req, res) => {
    try {
        // Giả sử userId được gửi qua header 'x-user-id' (giống cách mình làm ở DriverRoute)
        const userId = req.headers['x-user-id']; 
        
        if (!userId) {
            return res.status(401).json({ status: 'fail', message: 'Chưa đăng nhập' });
        }

        // A. Lấy thông tin tài xế
        const driverInfo = await Driver.getProfileByUserId(userId);
        
        if (!driverInfo) {
            return res.status(404).json({ status: 'fail', message: 'Không tìm thấy hồ sơ tài xế' });
        }

        // B. Lấy lịch trình hôm nay của tài xế đó
        const todayTrips = await Driver.getScheduleToday(driverInfo.driver_id);

        // Trả về cả 2 cục dữ liệu
        res.status(200).json({
            status: 'success',
            data: {
                profile: driverInfo,
                trips: todayTrips
            }
        });

    } catch (error) {
        console.error('Lỗi Dashboard:', error);
        res.status(500).json({ status: 'error', message: error.message });
    }
}


// API: Tài xế cập nhật trạng thái chuyến đi (Bắt đầu / Kết thúc)
export const updateTripStatus = async (req, res) => {
    try {
        const { tripId, status } = req.body; // status: 'ongoing' hoặc 'completed'
        
        // Validate trạng thái cho phép
        if (!['ongoing', 'completed','preparation'].includes(status)) {
            return res.status(400).json({ status: 'fail', message: 'Trạng thái không hợp lệ' });
        }

        // Cập nhật DB
        await db.query(
            'UPDATE Trip SET status = ? WHERE trip_id = ?', 
            [status, tripId]
        );

        res.json({ status: 'success', message: 'Cập nhật trạng thái thành công' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
}
// ... (giữ nguyên các code cũ của bạn)


