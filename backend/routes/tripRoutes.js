import { Router } from "express";
import { getAllTrips,getTripById,createTrip,updateTripStatus,getStudentsByTrip,getTripReport,getDriverTripsToday } from "../controllers/tripController.js";

const router = Router();

// Lấy tất cả chuyến đi
router.get('/', getAllTrips);
// Lấy chuyến đi theo ID
router.get('/:id', getTripById);
// Tạo chuyến đi mới
router.post('/', createTrip);
// Cập nhật trạng thái chuyến đi
router.put('/status', updateTripStatus);
//
// Lấy danh sách học sinh theo Trip ID
router.get('/:tripId/students', getStudentsByTrip);
// Lấy báo cáo tổng hợp chuyến đi
router.get('/:tripId/report', getTripReport);
router.get('/driver/today', getDriverTripsToday);
export default router;