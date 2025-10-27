import Student from '../models/studentModel.js';

// Lấy tất cả học sinh
export const getAllStudents = async (req, res) => {
    try {
        const students = await Student.getAll();
        res.status(200).json({
            status: 'success',
            data: students,
            message: 'Lấy danh sách học sinh thành công'
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

// Lấy học sinh theo ID
export const getStudentById = async (req, res) => {
    try {
        const studentId = req.params.id;
        const student = await Student.getById(studentId);

        // Kiểm tra nếu học sinh không tồn tại
        if(!student) {
            return res.status(404).json({
                status: 'fail',
                message: 'Học sinh không tồn tại',
                code: 404
            });
        }

        res.status(200).json({
            status: 'success',
            data: student,
            message: 'Lấy học sinh theo ID thành công'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
            code: 500
        });
    }
}

// Thêm học sinh mới
export const createStudent = async (req, res) => {
    try {
        const studentData = req.body;

        if (!studentData.name || !studentData.grade) {
            return res.status(400).json({
                status: 'fail',
                message: 'Thiếu thông tin bắt buộc: name và grade',
                code: 400
            });
        }

        if( studentData.parent_id === undefined ) {
            return res.status(400).json({
                status: 'fail',
                message: 'Thiếu thông tin bắt buộc: parent_id',
                code: 400
            });
        }

        const newStudent = await Student.create(studentData);
        res.status(201).json({
            status: 'success',
            data: newStudent,
            message: 'Thêm học sinh mới thành công'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
            code: 500
        });
    }
}

