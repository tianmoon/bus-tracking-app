import Assignment from "../models/AssignmentModel.js";
// Lấy tất cả assignment
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
        res.status(500).json({
            status: 'error',
            message: error.message,
            code: 500
        });
    }
}

// Lấy assignment theo ID
export async function getAssignmentById(req, res) {
    try {
        const assignmentId = req.params.id;
        const assignment = await Assignment.getById(assignmentId);
        // Kiểm tra nếu assignment không tồn tại
        if (!assignment) {
            return res.status(404).json({
                status: 'fail',
                message: 'Assignment không tồn tại',
                code: 404
            });
        }
        res.status(200).json({
            status: 'success',
            data: assignment,
            message: 'Lấy assignment theo ID thành công'
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

// Thêm assignment mới
export async function createAssignment(req, res) {
    try {
        const assignmentData = req.body;
        if (!assignmentData.bus_id || !assignmentData.schedule_id ) {
            return res.status(400).json({
                status: 'fail',
                message: 'Thiếu thông tin bắt buộc: bus_id, schedule_id',
                code: 400
            });
        }

        if (await Assignment.isScheduleAssigned(assignmentData.schedule_id)) {
            return res.status(400).json({
                status: 'fail',
                message: 'Lịch trình đã được gán cho một xe buýt khác',
                code: 400
            });
        }
        const newAssignment = await Assignment.create(assignmentData);
        
       
        res.status(201).json({
            status: 'success',
            data: newAssignment,
            message: 'Thêm assignment mới thành công'
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

// Cập nhật assignment
export async function updateAssignment(req, res) {
    try {
        const assignmentId = req.params.id;
        const assignmentData = req.body;
        if (!assignmentData.bus_id || !assignmentData.schedule_id ) {
            return res.status(400).json({
                status: 'fail',
                message: 'Thiếu thông tin bắt buộc: bus_id, schedule_id',
                code: 400
            });
        }

        // if (await Assignment.isScheduleAssigned(assignmentData.schedule_id)) {
        //     return res.status(400).json({
        //         status: 'fail',
        //         message: 'Lịch trình đã được gán cho một xe buýt khác',
        //         code: 400
        //     });
        // }

        const updatedAssignment = await Assignment.update(assignmentId, assignmentData);
        res.status(200).json({
            status: 'success',
            data: updatedAssignment,
            message: 'Cập nhật assignment thành công'
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
