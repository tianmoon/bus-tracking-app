import { Router } from 'express';
// Import các hàm cũ 
import { getAllDrivers, getDriverById, createDriver } from '../controllers/driverController.js';
// CÁC HÀM MỚI
import { 
    getMyProfile, 
    getMyTodayTrips, 
    getTripDetails, 
    updateStudentStatus, 
    sendAlert 
} from '../controllers/driverController.js';

import { validateEmail } from '../middleware/validateEmail.js';
import { validatePhoneNumber } from '../middleware/validatePhoneNumber.js';

const router = Router();

// ==================================================
// PHẦN CỦA TÀI XẾ - ĐỂ Ở TRÊN
// ==================================================

// 1. Xem hồ sơ bản thân (Dùng path riêng 'me' hoặc 'profile' để tránh trùng ID)
router.get('/profile/me', getMyProfile); // Gọi: /api/drivers/profile/me

// 2. Xem lịch trình hôm nay
router.get('/trips/today', getMyTodayTrips); // Gọi: /api/drivers/trips/today

// 3. Xem chi tiết chuyến (Có ID chuyến, không sợ trùng ID tài xế)
router.get('/trips/detail/:id', getTripDetails); 

// 4. Các chức năng thao tác
router.post('/report/status', updateStudentStatus);
router.post('/alert', sendAlert);


// ==================================================
// PHẦN ADMIN - ĐỂ Ở DƯỚI
// ==================================================

// GET - Lấy tất cả tài xế
router.get('/', getAllDrivers);

// GET - Lấy tài xế theo ID (Cái này nguy hiểm nhất, phải để cuối cùng)
router.get('/:id', getDriverById);

// POST - Thêm tài xế mới
router.post('/', validateEmail, validatePhoneNumber, createDriver);

export default router;