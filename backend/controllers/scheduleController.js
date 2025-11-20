import Schedule from '../models/ScheduleModel.js';

// Lấy tất cả lịch trình
export const getAllSchedules = async (req, res) => {
    try {
        // Lấy week và year từ query params
        const { week, year } = req.query;
        
        // Gọi model với tham số tuần và năm
        const schedules = await Schedule.getAll(week, year);
        res.status(200).json({
            status: 'success',
            data: schedules,
            message: 'Lấy danh sách lịch trình thành công'

        });
    } catch (error) {
        res.status(500).json({ 
            status: 'error',
            message: error.message,
            code: 500
        });
    }
};

// Lấy lịch trình theo ID
export const getScheduleById = async (req, res) => {
    try {
        const scheduleId = req.params.id;
        const schedule = await Schedule.getById(scheduleId);
        // Kiểm tra nếu lịch trình không tồn tại
        if (!schedule) {
            return res.status(404).json({
                status: 'fail',
                message: 'Lịch trình không tồn tại',
                code: 404
            });
        }
        res.status(200).json({
            status: 'success',
            data: schedule,
            message: 'Lấy lịch trình theo ID thành công'
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
            code: 500
        });
    }
};

// Thêm lịch trình mới
export const createSchedule = async (req, res) => {
    try {
        const scheduleData = req.body;
        if (!scheduleData.route_id || !scheduleData.start_time || !scheduleData.end_time || !scheduleData.day_of_week) {
            return res.status(400).json({
                status: 'fail',
                message: 'Thiếu thông tin bắt buộc: route_id, start_time, end_time, day_of_week',
                code: 400
            });
        }

        if (new Date(scheduleData.start_time) >= new Date(scheduleData.end_time)) {
            return res.status(400).json({
                status: 'fail',
                message: 'Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc',
                code: 400
            });
        }

        const newSchedule = await Schedule.create(scheduleData);
        res.status(201).json({
            status: 'success',
            data: newSchedule,
            message: 'Thêm lịch trình mới thành công'
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
            code: 500
        });
    }
};

// Cập nhật lịch trình
export const updateSchedule = async (req, res) => {
    try {
        const scheduleId = req.params.id;
        const scheduleData = req.body;
        const updatedSchedule = await Schedule.update(scheduleId, scheduleData);
        // Kiểm tra nếu lịch trình không tồn tại
        if (!updatedSchedule) {
            return res.status(404).json({
                status: 'fail',
                message: 'Lịch trình không tồn tại',
                code: 404
            });
        }

        if (new Date(scheduleData.start_time) >= new Date(scheduleData.end_time)) {
            return res.status(400).json({
                status: 'fail',
                message: 'Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc',
                code: 400
            });
        }


        res.status(200).json({
            status: 'success',
            data: updatedSchedule,
            message: 'Cập nhật lịch trình thành công'
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
            code: 500
        });
    }
};

// Xóa lịch trình
export const deleteSchedule = async (req, res) => {
    try {
        const scheduleId = req.params.id;
        const isDeleted = await Schedule.delete(scheduleId);
        // Kiểm tra nếu lịch trình không tồn tại
        if (!isDeleted) {
            return res.status(404).json({
                status: 'fail',
                message: 'Lịch trình không tồn tại',
                code: 404
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Xóa lịch trình thành công'
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
            code: 500
        });
    }
};