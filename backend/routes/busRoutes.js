import { Router } from "express";
import { getAllBuses, getBusById, createBus } from "../controllers/busController.js";

const router = Router();

// GET - Lấy tất cả xe buýt
router.get('/', getAllBuses);
// GET - Lấy xe buýt theo ID
router.get('/:id', getBusById);
// POST - Thêm xe buýt mới
router.post('/', createBus);

export default router;