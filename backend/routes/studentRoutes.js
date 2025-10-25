import { Router } from 'express';
import { getAllStudents, getStudentById, createStudent } from '../controllers/studentController.js';

const router = Router();

// GET - Lấy tất cả học sinh
router.get('/', getAllStudents);

// GET - Lấy học sinh theo ID
router.get('/:id', getStudentById);

// POST - Thêm học sinh mới
router.post('/', createStudent);

export default router;