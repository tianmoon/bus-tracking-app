import Trip from "../models/tripModel.js";

// Lấy tất cả chuyến đi
export const getAllTrips = async (req, res) => {
    try {
        const trips = await Trip.getAll();
        res.status(200).json({
            status: 'success',
            data: trips,
            message: 'Lấy danh sách chuyến đi thành công'
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

