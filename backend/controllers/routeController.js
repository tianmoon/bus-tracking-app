import Route from '../models/RouteModel.js';

// Get all routes
export const getAllRoutes = async (req, res) => {
    try {
        const routes = await Route.getAll();
        res.status(200).json({
            status: 'success',
            data: routes,
            message: 'Lấy danh sách tuyến đường thành công'
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
            code: 500
        });
    }
}

// Get bus stop by id 
export const getBusStopByIdRoute = async (req, res) => {
    try {
        const routeId = req.params.id;
        const busStops = await Route.getBusStopById(routeId);
        res.status(200).json({
            status: 'success',
            data: busStops,
            message: 'Lấy danh sách trạm thành công'
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
            code: 500
        })
    }
}