import { Router } from 'express';
import { 
    getAllStudents, 
    getStudentById, 
    createStudent, 
    getStudentsByTripId,    // Import mới
    updateStudentTripStatus // Import mới
} from '../controllers/studentController.js';

const router = Router();

router.get('/', getAllStudents);
router.post('/', createStudent);

// --- ROUTE CHO DRIVER ---
router.get('/trip/:tripId', getStudentsByTripId); // Lấy DS học sinh theo Trip
router.post('/status', updateStudentTripStatus);  // Cập nhật trạng thái (Đón/Trả)
// ------------------------

router.get('/:id', getStudentById);

export default router;