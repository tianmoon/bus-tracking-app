import Bus from '../models/BusModel.js';

// Lấy tất cả xe buýt
export const getAllBuses = async (req, res) => {
    try {
        const buses = await Bus.getAll();
        res.status(200).json({
            status: 'success',
            data: buses,
            message: 'Lấy danh sách xe buýt thành công'
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
// Lấy xe buýt theo ID
export const getBusById = async (req, res) => {
    try {
        const busId = req.params.id;
        const bus = await Bus.getById(busId);
        // Kiểm tra nếu xe buýt không tồn tại
        if(!bus) {
            return res.status(404).json({
                status: 'fail',
                message: 'Xe buýt không tồn tại',
                code: 404
            });
        }
        res.status(200).json({
            status: 'success',
            data: bus,
            message: 'Lấy xe buýt theo ID thành công'
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

// Thêm xe buýt mới
export const createBus = async (req, res) => {
    try {
        const busData = req.body;
        if (!busData.plate_number || !busData.driver_id) {
            return res.status(400).json({
                status: 'fail',
                message: 'Thiếu thông tin bắt buộc: plate_number và driver_id',
                code: 400
            });
        }

        const isExistingBus = await Bus.isPlateNumberExists(busData.plate_number); 
        if (isExistingBus) {
            return res.status(409).json({
                status: 'fail',
                message: 'Biển số xe đã tồn tại',
                code: 409
            });
        }

        const newBus = await Bus.create(busData);
        res.status(201).json({
            status: 'success',
            data: newBus,
            message: 'Thêm xe buýt mới thành công'
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
