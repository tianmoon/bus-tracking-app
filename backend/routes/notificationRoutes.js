// backend/routes/notificationRoutes.js
import { Router } from 'express';
import { createAlert } from '../controllers/notificationController.js';

const router = Router();

router.post('/', createAlert); // Route tạo thông báo mới

export default router;