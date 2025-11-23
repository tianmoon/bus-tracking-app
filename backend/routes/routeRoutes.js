import { getAllRoutes, getBusStopByIdRoute, getRouteById } from "../controllers/routeController.js";
import { Router } from "express";

const router = Router();

// Get - Lấy all tuyến đường
router.get('/', getAllRoutes);

// Get - Lấy bus stop
router.get('/:id', getBusStopByIdRoute);

// Get - Lấy thông tin route theo id
router.get('/info/:id', getRouteById);

export default router;