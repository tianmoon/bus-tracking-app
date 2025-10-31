import { getAllRoutes, getBusStopByIdRoute } from "../controllers/routeController.js";
import { Router } from "express";

const router = Router();

// Get - Lấy all tuyến đường
router.get('/', getAllRoutes);

// Get - Lấy bus stop
router.get('/:id', getBusStopByIdRoute);

export default router;