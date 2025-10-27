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



