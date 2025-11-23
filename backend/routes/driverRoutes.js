import { Router } from 'express';
import { getAllDrivers, getDriverById, createDriver, getDriverDashboardInfo,updateTripStatus } from '../controllers/driverController.js';
import { validateEmail } from '../middleware/validateEmail.js';
import { validatePhoneNumber } from '../middleware/validatePhoneNumber.js';


const router = Router();
// GET - Dashboard cho App Tài xế (Phải đặt trước /:id)
router.get('/app/dashboard', getDriverDashboardInfo); 
// GET - Lấy tất cả tài xế
router.get('/', getAllDrivers);

// GET - Lấy tài xế theo ID
router.get('/:id', getDriverById);

// POST - Thêm tài xế mới
router.post('/', validateEmail, validatePhoneNumber, createDriver);
// PUT - Cập nhật trạng thái chuyến đi
router.put('/trip/status', updateTripStatus);

export default router;
