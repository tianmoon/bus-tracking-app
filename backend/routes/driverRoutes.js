import { Router } from 'express';
import { getAllDrivers, getDriverById, createDriver } from '../controllers/driverController.js';
import { validateEmail } from '../middleware/validateEmail.js';
import { validatePhoneNumber } from '../middleware/validatePhoneNumber.js';


const router = Router();

// GET - Lấy tất cả tài xế
router.get('/', getAllDrivers);

// GET - Lấy tài xế theo ID
router.get('/:id', getDriverById);

// POST - Thêm tài xế mới
router.post('/', validateEmail, validatePhoneNumber, createDriver);

export default router;
