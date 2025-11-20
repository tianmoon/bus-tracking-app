import { Router } from "express";
import { getAllTrips,getTripById,createTrip,updateTripStatus,getStudentsByTrip } from "../controllers/tripController.js";

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
export default router;