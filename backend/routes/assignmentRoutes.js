import {
    getAllAssignments,
    getAssignmentById,
    createAssignment,
    updateAssignment
} from "../controllers/assignmentController.js";

import { Router } from "express";

const router = Router();

// GET - Lấy tất cả assignment
router.get('/', getAllAssignments);

// GET - Lấy assignment theo ID
router.get('/:id', getAssignmentById);

// POST - Thêm assignment mới
router.post('/', createAssignment);

// PUT - Cập nhật assignment theo ID
 router.put('/:id', updateAssignment);

export default router;