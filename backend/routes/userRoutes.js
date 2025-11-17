import {Router } from 'express';
import { getParentByUserId, getDriverByUserId } from '../controllers/userController.js';

const router = Router();

// GET - Lấy thông tin phụ huynh theo user ID
router.get('/parent/:id', getParentByUserId);

// GET - Lấy thông tin tài xế theo user ID
router.get('/driver/:id', getDriverByUserId);

export default router;