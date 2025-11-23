import { Router } from "express";
import { getAllParents, getParentById, createParent, getStudentsByParentId } from "../controllers/parentController.js";
import { validateEmail } from "../middleware/validateEmail.js"; 
import { validatePhoneNumber } from "../middleware/validatePhoneNumber.js";

const router = Router();

// GET - Lấy tất cả phụ huynh
router.get('/', getAllParents);

// GET - Lấy phụ huynh theo ID
router.get('/:id', getParentById);

// GET - Lấy học sinh theo phụ huynh
router.get('/childs/:id', getStudentsByParentId);

// POST - Thêm phụ huynh mới
router.post('/', validateEmail, validatePhoneNumber, createParent);

export default router;
