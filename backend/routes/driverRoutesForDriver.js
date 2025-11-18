import express from 'express';
import {
    getDriverProfileForDriver,
    getTodayTripsForDriver,
    getTripDetailsForDriver,
    updateStudentStatusForDriver,
    sendAlertForDriver
} from '../controllers/driverControllerForDriver.js';

import { authMiddlewareForDriver } from '../middleware/authMiddlewareForDriver.js';

const router = express.Router();


router.use(authMiddlewareForDriver);



// 1. API cho trang DashboardTaixe.js
// Lấy 2 chuyến (Sáng/Chiều) mà Admin đã phân công cho tài xế HÔM NAY
router.get('/trips/today', getTodayTripsForDriver);

// 2. API cho trang DriverRoute.js VÀ StudentListForDriver.js
// Lấy chi tiết 1 chuyến đi (gồm danh sách học sinh, điểm dừng)
// :id ở đây là trip_id
router.get('/trip/details/:id', getTripDetailsForDriver);

// 3. API cho nút "Đã đón" trong StudentListForDriver.js
// Dùng để báo cáo trạng thái học sinh (đã đón, vắng, đã trả)
router.post('/report/status', updateStudentStatusForDriver);

// 4. API cho trang DriverCanhbao.js
// Dùng để gửi báo cáo sự cố (kẹt xe, hỏng hóc)
router.post('/alert', sendAlertForDriver);

// (API Lấy profile cá nhân, chúng ta đã làm)
router.get('/profile', getDriverProfileForDriver);

// API cho trang Báo cáo chuyến đi (DriverTripReport.js)
// Nó sẽ TÍNH TOÁN và trả về 1 bản tóm tắt.
router.get('/trip/report/:id', getTripReportForDriver); 



export default router;