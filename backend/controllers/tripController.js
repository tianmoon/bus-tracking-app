import Trip from "../models/tripModel.js";

// ==========================================
// 1. CÁC HÀM LẤY DỮ LIỆU (READ)
// ==========================================

// Lấy tất cả chuyến đi
export const getAllTrips = async (req, res) => {
    try {
        // Gọi hàm getAll từ Model (đã JOIN bảng đầy đủ)
        const trips = await Trip.getAll();

        // (Tùy chọn) Format lại dữ liệu nếu cần trước khi trả về
        // Ví dụ: Format ngày tháng cho đẹp, hoặc lọc bớt trường thừa
        const formattedTrips = trips.map(trip => ({
            ...trip,
            // Ví dụ format lại status sang tiếng Việt nếu muốn hiển thị trực tiếp
            // status_vi: trip.status === 'ongoing' ? 'Đang chạy' : ...
        }));

        res.status(200).json({
            status: 'success',
            data: formattedTrips,
            message: 'Lấy danh sách chuyến đi thành công'
        });
    }
    catch (error) {
        console.error("Lỗi getAllTrips:", error);
        res.status(500).json({
            status: 'error',
            message: error.message,
            code: 500
        });
    }
}

// Lấy chuyến đi theo ID
export const getTripById = async (req, res) => {
    try {
        const tripId = req.params.id;
        const trip = await Trip.getById(tripId);
        
        if (!trip) {
            return res.status(404).json({
                status: 'fail',
                message: 'Không tìm thấy chuyến đi',
                code: 404
            });
        }

        res.status(200).json({
            status: 'success',
            data: trip
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
            code: 500
        });
    }
}

// ==========================================
// 2. CÁC HÀM TẠO & CẬP NHẬT (CREATE & UPDATE)
// ==========================================

// 🚀 HÀM TẠO TRIP MỚI (Độc lập)
export const createTrip = async (req, res) => {
    try {
        const tripData = req.body;

        // Validate dữ liệu cơ bản
        if (!tripData.asn_id) {
            return res.status(400).json({
                status: 'fail',
                message: 'Thiếu thông tin bắt buộc: asn_id',
                code: 400
            });
        }

        // Gọi Model để tạo Trip
        const newTripId = await Trip.create(tripData);

        if (!newTripId) {
            throw new Error("Không thể tạo chuyến đi (Lỗi DB)");
        }

        res.status(201).json({
            status: 'success',
            data: { 
                trip_id: newTripId, 
                ...tripData 
            },
            message: 'Tạo chuyến đi thành công'
        });

    } catch (error) {
        console.error("Lỗi createTrip:", error);
        res.status(500).json({
            status: 'error',
            message: error.message,
            code: 500
        });
    }
}

// Cập nhật trạng thái Trip
export const updateTripStatus = async (req, res) => {
    try {
        const { tripId, status } = req.body;
        
        if (!tripId || !status) {
            return res.status(400).json({ status: 'fail', message: 'Thiếu tripId hoặc status' });
        }

        const success = await Trip.updateStatus(tripId, status);

        if (!success) {
            return res.status(404).json({ status: 'fail', message: 'Không tìm thấy Trip để update' });
        }

        res.status(200).json({
            status: 'success',
            message: `Cập nhật trạng thái thành công: ${status}`
        });

    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
}
export const getStudentsByTrip = async (req, res) => {
    try {
        const tripId = req.params.tripId;
        const students = await Trip.getStudentsByTrip(tripId);

        if (!students) {
            return res.status(404).json({
                status: 'fail',
                message: 'Không tìm thấy học sinh cho chuyến đi này',
                code: 404
            });
        }

        res.status(200).json({
            status: 'success',
            data: students,
            message: 'Lấy danh sách học sinh cho chuyến đi thành công'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
            code: 500
        });
    }
}