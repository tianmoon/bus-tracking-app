import { Router } from 'express';
import { login, logout, isLoggedIn  } from '../controllers/authController.js';

const router = Router();

// POST - Đăng nhập
router.post('/login', login);

// POST - Đăng xuất
router.post('/logout', logout);

// GET - Kiểm tra trạng thái đăng nhập
router.get('/isLoggedIn', isLoggedIn);

export default router;



