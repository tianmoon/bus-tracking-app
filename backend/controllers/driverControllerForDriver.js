import db from '../config/database.js'; // Import kết nối database

// --- API 1: LẤY CÁC CHUYẾN ĐI TRONG NGÀY (CHO DASHBOARD) ---
// Tương ứng với: DashboardTaixe.js
export const getTodayTripsForDriver = async (req, res) => {
    try {
        // Lấy driverId từ middleware đã gắn vào req.user
        const driverId = req.user.driverId; 
        const today = new Date().toISOString().split('T')[0]; // Lấy ngày hôm nay, vd: '2025-11-17'

        // Câu SQL này tìm TẤT CẢ các chuyến (Trip)
        // mà được phân công (Assignment) cho xe (Bus)
        // mà tài xế (Driver) này đang lái, VÀ diễn ra trong HÔM NAY.
        const [trips] = await db.query(
            `SELECT 
                t.trip_id, t.status, t.departure_time, t.arrival_time,
                r.name as route_name,
                b.plate_number
             FROM Trip t
             JOIN Assignment a ON t.asn_id = a.asn_id
             JOIN Bus b ON a.bus_id = b.bus_id
             JOIN Schedule s ON a.schedule_id = s.schedule_id
             JOIN Route r ON s.route_id = r.route_id
             WHERE b.driver_id = ? AND a.asn_date = ?
             ORDER BY t.departure_time ASC`,
            [driverId, today]
        );

        // NẾU ADMIN CHƯA PHÂN CÔNG (dữ liệu trống)
        if (trips.length === 0) {
            return res.status(200).json({
                status: 'success',
                data: [], // Trả về mảng rỗng
                message: 'Tài xế không có lịch trình hôm nay.'
            });
        }

        // Nếu có, trả về danh sách chuyến
        res.status(200).json({
            status: 'success',
            data: trips
        });

    } catch (error) {
        console.error('Lỗi tại getTodayTripsForDriver:', error.message);
        res.status(500).json({ status: 'error', message: 'Lỗi server' });
    }
};


// --- API 2: LẤY CHI TIẾT 1 CHUYẾN ĐI (CHO TRANG BẢN ĐỒ/HỌC SINH) ---


export const getTripDetailsForDriver = async (req, res) => {
    try {
        const { id: tripId } = req.params; 
        const driverId = req.user.driverId; 

        // 1. Xác thực tài xế (Giữ nguyên)
        const [permission] = await db.query(
            `SELECT t.trip_id 
             FROM Trip t
             JOIN Assignment a ON t.asn_id = a.asn_id
             JOIN Bus b ON a.bus_id = b.bus_id
             WHERE t.trip_id = ? AND b.driver_id = ?`,
            [tripId, driverId]
        );

        if (permission.length === 0) {
            return res.status(403).json({
                status: 'fail',
                message: 'Bạn không có quyền xem chi tiết chuyến đi này.'
            });
        }

        // 2. Lấy thông tin chung (Xe, Tuyến) (Giữ nguyên)
        const [tripInfo] = await db.query(
            `SELECT 
                t.trip_id, t.status, t.departure_time,
                b.bus_id, b.plate_number, b.capacity,
                r.route_id, r.name as route_name, r.start as route_start, r.end as route_end
             FROM Trip t
             JOIN Assignment a ON t.asn_id = a.asn_id
             JOIN Bus b ON a.bus_id = b.bus_id
             JOIN Schedule s ON a.schedule_id = s.schedule_id
             JOIN Route r ON s.route_id = r.route_id
             WHERE t.trip_id = ?`,
            [tripId]
        );

        // 3. Lấy danh sách học sinh (Giữ nguyên)
        const [studentList] = await db.query(
            `SELECT 
                s.student_id, s.name, s.grade,
                r.status as current_status
             FROM Student s
             JOIN Bus b ON s.bus_id = b.bus_id
             LEFT JOIN Report r ON s.student_id = r.student_id AND r.trip_id = ?
             WHERE b.bus_id = ? 
             ORDER BY s.name`,
            [tripId, tripInfo[0].bus_id] 
        );
        
        // 4. Lấy danh sách trạm dừng (Giữ nguyên)
        const [stops] = await db.query(
            `SELECT * FROM BusStop WHERE route_id = ? ORDER BY order_index ASC`,
            [tripInfo[0].route_id]
        );

        // 🔽 BƯỚC 5: TẠO BÁO CÁO TỔNG (PHẦN MỚI THẦY THÊM VÀO) 🔽
        // Chúng ta sẽ dùng code JavaScript để đếm từ `studentList`
        
        const totalStudents = studentList.length;
        const pickedUpCount = studentList.filter(s => s.current_status === 'picked_up').length;
        const droppedOffCount = studentList.filter(s => s.current_status === 'dropped_off').length;
        const absentCount = studentList.filter(s => s.current_status === 'absent').length;
        
        // Số học sinh "chưa có trạng thái" (chưa đón/trả)
        const pendingCount = studentList.filter(s => s.current_status === null).length;

        const summary = {
            totalStudents: totalStudents,
            pickedUp: pickedUpCount,
            droppedOff: droppedOffCount,
            absent: absentCount,
            pending: pendingCount
        };

        // 6. Trả về 1 GÓI DỮ LIỆU LỚN (đã bao gồm summary)
        res.status(200).json({
            status: 'success',
            data: {
                tripInfo: tripInfo[0],  // Thông tin chuyến
                summary: summary,       // ⬅️ BÁO CÁO TỔNG HỢP
                students: studentList,  // Danh sách học sinh chi tiết
                stops: stops            // Danh sách trạm dừng
            }
        });

    } catch (error) {
        console.error('Lỗi tại getTripDetailsForDriver (V2):', error.message);
        res.status(500).json({ status: 'error', message: 'Lỗi server' });
    }
};
// --- API 3: CẬP NHẬT TRẠNG THÁI HỌC SINH (NÚT "ĐÃ ĐÓN") ---
// Tương ứng với: Nút bấm trong StudentListForDriver.js
export const updateStudentStatusForDriver = async (req, res) => {
    try {
        const { trip_id, student_id, status } = req.body; // React gửi lên 3 cái này
        const driverId = req.user.driverId; 

        if (!trip_id || !student_id || !status) {
            return res.status(400).json({
                status: 'fail',
                message: 'Thiếu thông tin trip_id, student_id, hoặc status.'
            });
        }
        
        

        // Kiểm tra xem đã báo cáo cho học sinh này CHƯA
        const [existingReport] = await db.query(
            'SELECT report_id FROM Report WHERE trip_id = ? AND student_id = ?',
            [trip_id, student_id]
        );

        if (existingReport.length > 0) {
            // Đã tồn tại -> Cập nhật (UPDATE)
            const reportId = existingReport[0].report_id;
            await db.query(
                `UPDATE Report SET status = ?, timestamp = NOW() WHERE report_id = ?`,
                [status, reportId]
            );
        } else {
            // Chưa tồn tại -> Thêm mới (INSERT)
            await db.query(
                `INSERT INTO Report (trip_id, student_id, status, timestamp) 
                 VALUES (?, ?, ?, NOW())`,
                [trip_id, student_id, status]
            );
        }

        res.status(201).json({
            status: 'success',
            message: `Cập nhật thành công: HS ${student_id} sang ${status}.`
        });

    } catch (error) {
        console.error('Lỗi tại updateStudentStatusForDriver:', error.message);
        res.status(500).json({ status: 'error', message: 'Lỗi server' });
    }
};


// --- API 4: GỬI CẢNH BÁO SỰ CỐ ---
// Tương ứng với: Trang DriverCanhbao.js
export const sendAlertForDriver = async (req, res) => {
    try {
        // Lấy dữ liệu mà React (form) gửi lên
        const { trip_id, type, content } = req.body; 
        const driverId = req.user.driverId;

        if (!trip_id || !type || !content) {
            return res.status(400).json({
                status: 'fail',
                message: 'Thiếu thông tin chuyến đi, loại cảnh báo, hoặc nội dung.'
            });
        }

        // Lưu cảnh báo này vào bảng Notification
        const [result] = await db.query(
            `INSERT INTO Notification (content, type, sent_time, status, trip_id)
             VALUES (?, ?, NOW(), 'unread', ?)`,
            [content, type, trip_id]
        );
        
        const notificationId = result.insertId;


        res.status(201).json({
            status: 'success',
            message: 'Đã gửi cảnh báo sự cố thành công.',
            data: { notificationId: notificationId }
        });

    } catch (error) {
        console.error('Lỗi tại sendAlertForDriver:', error.message);
        res.status(500).json({ status: 'error', message: 'Lỗi server' });
    }
};


// --- API LẤY PROFILE (TÊN TÀI XẾ) ---
// Dùng cho tất cả các trang
export const getDriverProfileForDriver = async (req, res) => {
    try {
        const driverId = req.user.driverId;

        const [driver] = await db.query(
            `SELECT d.driver_id, d.name, u.email, u.phone_number,
                   b.bus_id, b.plate_number
            FROM Driver d
            INNER JOIN User u ON d.user_id = u.user_id
            LEFT JOIN Bus b ON d.driver_id = b.driver_id
            WHERE d.driver_id = ?`,
            [driverId]
        );

        if (driver.length === 0) {
            return res.status(404).json({
                status: 'fail',
                message: 'Không tìm thấy thông tin tài xế.'
            });
        }

        res.status(200).json({
            status: 'success',
            data: driver[0]
        });

    } catch (error) {
        console.error('Lỗi tại getDriverProfileForDriver:', error.message);
        res.status(500).json({ status: 'error', message: 'Lỗi server' });
    }
};

/**
 * API 5: LẤY BÁO CÁO TỔNG KẾT (CHO MÀN HÌNH BÁO CÁO)
 * API này sẽ TÍNH TOÁN (COUNT) các trạng thái từ bảng Report
 * sau khi chuyến đi đã hoàn tất.
 */
export const getTripReportForDriver = async (req, res) => {
    try {
        const { id: tripId } = req.params; // Lấy tripId từ URL
        const driverId = req.user.driverId; // Lấy từ middleware

        // 1. Xác thực tài xế (Giống API kia)
        const [permission] = await db.query(
            `SELECT t.trip_id, a.bus_id 
             FROM Trip t
             JOIN Assignment a ON t.asn_id = a.asn_id
             JOIN Bus b ON a.bus_id = b.bus_id
             WHERE t.trip_id = ? AND b.driver_id = ?`,
            [tripId, driverId]
        );

        if (permission.length === 0) {
            return res.status(403).json({
                status: 'fail',
                message: 'Bạn không có quyền xem báo cáo chuyến đi này.'
            });
        }
        
        const busId = permission[0].bus_id;

        // 2. Lấy thông tin chung của chuyến đi (cho tiêu đề báo cáo)
        const [tripInfo] = await db.query(
            `SELECT 
                t.trip_id, t.status, t.departure_time, t.arrival_time,
                r.name as route_name,
                (SELECT name FROM BusStop WHERE route_id = r.route_id ORDER BY order_index ASC LIMIT 1) as start_point,
                (SELECT name FROM BusStop WHERE route_id = r.route_id ORDER BY order_index DESC LIMIT 1) as end_point
             FROM Trip t
             JOIN Assignment a ON t.asn_id = a.asn_id
             JOIN Schedule s ON a.schedule_id = s.schedule_id
             JOIN Route r ON s.route_id = r.route_id
             WHERE t.trip_id = ?`,
            [tripId]
        );

        // 3. ĐẾM TỔNG HỢP TỪ BẢNG REPORT (Đây là logic em muốn)
        // Chúng ta dùng SQL COUNT và GROUP BY để DB tự đếm
        const [summaryRows] = await db.query(
            `SELECT status, COUNT(report_id) as count 
             FROM Report 
             WHERE trip_id = ? 
             GROUP BY status`,
            [tripId]
        );

        // 4. Lấy tổng số học sinh của xe này
        const [totalStudentsResult] = await db.query(
            `SELECT COUNT(student_id) as total FROM Student WHERE bus_id = ?`,
            [busId]
        );
        
        // 5. Định dạng lại dữ liệu "summary" cho dễ dùng
        const summary = {
            picked_up: 0,
            dropped_off: 0,
            absent: 0,
            totalStudents: totalStudentsResult[0].total || 0
        };

        for (const row of summaryRows) {
            if (row.status === 'picked_up') {
                summary.picked_up = row.count;
            } else if (row.status === 'dropped_off') {
                summary.dropped_off = row.count;
            } else if (row.status === 'absent') {
                summary.absent = row.count;
            }
        }

        // 6. Trả về báo cáo tổng kết cho React
        res.status(200).json({
            status: 'success',
            data: {
                tripInfo: tripInfo[0], // Thông tin chuyến
                summary: summary       // Báo cáo tóm tắt
            }
        });

    } catch (error) {
        console.error('Lỗi tại getTripReportForDriver:', error.message);
        res.status(500).json({
            status: 'error',
            message: 'Lỗi server khi lấy báo cáo chuyến đi.'
        });
    }
};