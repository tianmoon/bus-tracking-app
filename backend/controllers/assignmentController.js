import Assignment from "../models/AssignmentModel.js";
import Trip from "../models/tripModel.js"; // <--- 1. THÊM IMPORT NÀY

// Lấy tất cả assignment (Giữ nguyên)
export async function getAllAssignments(req, res) {
    try {
        const assignments = await Assignment.getAll();
        res.status(200).json({
            status: 'success',
            data: assignments,
            message: 'Lấy danh sách assignment thành công'
        });
    }
    catch (error) {
        res.status(500).json({ status: 'error', message: error.message, code: 500 });
    }
}

// Lấy assignment theo ID (Giữ nguyên)
export async function getAssignmentById(req, res) {
    try {
        const assignmentId = req.params.id;
        const assignment = await Assignment.getById(assignmentId);
        if (!assignment) {
            return res.status(404).json({ status: 'fail', message: 'Assignment không tồn tại', code: 404 });
        }
        res.status(200).json({ status: 'success', data: assignment, message: 'Lấy assignment theo ID thành công' });
    }
    catch (error) {
        res.status(500).json({ status: 'error', message: error.message, code: 500 });
    }
}

// --- HÀM QUAN TRỌNG CẦN SỬA ---
// Thêm assignment mới & TỰ ĐỘNG TẠO TRIP
export async function createAssignment(req, res) {
    try {
        const assignmentData = req.body;
        
        // 1. Validate
        if (!assignmentData.bus_id || !assignmentData.schedule_id ) {
            return res.status(400).json({ status: 'fail', message: 'Thiếu thông tin bắt buộc', code: 400 });
        }

        // 2. Kiểm tra trùng lặp
        if (await Assignment.isScheduleAssigned(assignmentData.schedule_id)) {
            return res.status(400).json({ status: 'fail', message: 'Lịch trình đã được gán cho xe khác', code: 400 });
        }

        // 3. Tạo Assignment (Khuôn mẫu)
        const newAssignment = await Assignment.create(assignmentData);
        
        // --- LOGIC MỚI: TỰ ĐỘNG TẠO TRIP (INSTANCE) ---
        // Sau khi tạo phân công, ta cần lấy chi tiết (đặc biệt là giờ chạy start_time) 
        // để tạo Trip ngay lập tức cho Driver thấy.
        
        const assignmentDetails = await Assignment.getById(newAssignment.id);
        
        if (assignmentDetails) {
            // Lấy ngày giờ hiện tại cho Trip, hoặc lấy theo giờ của Schedule
            // Ở đây thầy lấy ngày hôm nay kết hợp với giờ của Schedule để tạo chuyến đi trong ngày
            
            const scheduleStartTime = new Date(assignmentDetails.start_time);
            const scheduleEndTime = new Date(assignmentDetails.end_time);
            
            // Tạo đối tượng Date cho ngày hôm nay
            const today = new Date();
            
            // Set giờ của Trip theo giờ của Schedule nhưng là ngày hôm nay
            const tripStartTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), scheduleStartTime.getHours(), scheduleStartTime.getMinutes());
            const tripEndTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), scheduleEndTime.getHours(), scheduleEndTime.getMinutes());

            const tripData = {
                asn_id: newAssignment.id,
                status: 'preparation', // Trạng thái ban đầu
                departure_time: tripStartTime,
                arrival_time: tripEndTime
            };

            // Gọi TripModel để tạo dòng dữ liệu trong bảng Trip
            await Trip.create(tripData);
            console.log(">> Đã tự động tạo Trip cho Assignment ID:", newAssignment.id);
        }
        // ----------------------------------------------

        res.status(201).json({
            status: 'success',
            data: newAssignment,
            message: 'Thêm phân công và tạo chuyến đi thành công'
        });
    }

    catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: error.message, code: 500 });
    }
}

// Cập nhật assignment (Giữ nguyên)
export async function updateAssignment(req, res) {
    try {
        const assignmentId = req.params.id;
        const assignmentData = req.body;
        // ... (Giữ nguyên logic update cũ của em)
        const updatedAssignment = await Assignment.update(assignmentId, assignmentData);
        res.status(200).json({ status: 'success', data: updatedAssignment, message: 'Cập nhật thành công' });
    }
    catch (error) {
        res.status(500).json({ status: 'error', message: error.message, code: 500 });
    }
}