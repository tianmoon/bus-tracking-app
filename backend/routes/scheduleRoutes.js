import { Router } from "express";
import { getAllSchedules, getScheduleById, createSchedule, deleteSchedule, updateSchedule } from "../controllers/scheduleController.js";

const router = Router();

// GET - Lấy tất cả lịch trình
router.get('/', getAllSchedules);

// GET - Lấy lịch trình theo ID
router.get('/:id', getScheduleById);

// POST - Thêm lịch trình mới
router.post('/', createSchedule);

// DELETE - Xóa lịch trình theo ID
router.delete('/:id', deleteSchedule);

// PUT - Cập nhật lịch trình theo ID
router.put('/:id', updateSchedule);

export default router;