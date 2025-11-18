import { Router } from "express";
import { getAllTrips } from "../controllers/tripController.js";

const router = Router();

// Lấy tất cả chuyến đi
router.get('/', getAllTrips);

export default router;