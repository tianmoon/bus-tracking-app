import db from '../config/database.js';

class TripModel {
    // Lấy tất cả chuyến đi (Code cũ của bạn - Giữ nguyên)
    static async getAll() {
        try {
            const [rows] = await db.query(
                `SELECT tr.trip_id, sch.schedule_id, r.route_id, b.bus_id, tr.status, tr.arrival_time, tr.departure_time, b.plate_number, dr.name as driver_name, r.name as route_name
                FROM trip tr
                LEFT JOIN assignment asn ON asn.asn_id = tr.asn_id
                LEFT JOIN bus b ON b.bus_id = asn.bus_id
                LEFT JOIN driver dr ON dr.driver_id = b.driver_id
                LEFT JOIN schedule sch ON asn.schedule_id = sch.schedule_id
                LEFT JOIN route r ON r.route_id = sch.route_id;`
            );
            return rows;
        }
        catch (error) {
            throw new Error('Lỗi khi lấy danh sách chuyến đi từ cơ sở dữ liệu');
        }
    }

    // Lấy chi tiết chuyến đi theo ID (Hàm bổ sung cho Controller getTripById)
    static async getById(id) {
        try {
            const [rows] = await db.query(
                `SELECT tr.*, b.plate_number, r.name as route_name 
                 FROM trip tr
                 LEFT JOIN assignment asn ON asn.asn_id = tr.asn_id
                 LEFT JOIN bus b ON b.bus_id = asn.bus_id
                 LEFT JOIN schedule sch ON asn.schedule_id = sch.schedule_id
                 LEFT JOIN route r ON r.route_id = sch.route_id
                 WHERE tr.trip_id = ?`,
                [id]
            );
            return rows[0];
        } catch (error) {
            throw new Error('Lỗi khi lấy chi tiết chuyến đi: ' + error.message);
        }
    }

    // 🚀 HÀM MỚI: TẠO TRIP (INSERT)
    static async create(tripData) {
        try {
            // tripData = { asn_id, departure_time, arrival_time, status }
            const { asn_id, departure_time, arrival_time } = tripData;
            
            // Status mặc định là 'preparation'
            const status = tripData.status || 'preparation';

            const [result] = await db.query(
                `INSERT INTO trip (asn_id, status, departure_time, arrival_time) 
                 VALUES (?, ?, ?, ?)`,
                [asn_id, status, departure_time, arrival_time]
            );

            // Trả về ID của trip vừa tạo
            return result.insertId;
        } catch (error) {
            throw new Error('Lỗi khi tạo chuyến đi mới: ' + error.message);
        }
    }

    // Cập nhật trạng thái Trip (Dùng cho Controller updateTripStatus)
    static async updateStatus(tripId, newStatus) {
        try {
            const [result] = await db.query(
                'UPDATE trip SET status = ? WHERE trip_id = ?',
                [newStatus, tripId]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error('Lỗi cập nhật trạng thái trip: ' + error.message);
        }
    }
    static async getStudentsByTrip(tripId) {   
        try {
            const [rows] = await db.query(
                `SELECT s.student_id, s.name, s.class, s.parent_name, s.parent_phone
                FROM student s
                JOIN trip_student ts ON s.student_id = ts.student_id
                WHERE ts.trip_id = ?`, [tripId]);
            return rows;
        } catch (error) {
            throw new Error('Lỗi khi lấy danh sách học sinh của chuyến đi: ' + error.message);
        }   
}
// Hàm mới: Lấy báo cáo tổng hợp chuyến đi
static async getTripSummary(tripId) {
    try {
        // 1. Lấy thông tin chuyến đi, xe bus và tài xế
        const [tripInfo] = await db.query(
            `SELECT tr.trip_id, tr.status, tr.departure_time, tr.arrival_time, 
                    b.plate_number, dr.name as driver_name, r.name as route_name
             FROM trip tr
             LEFT JOIN assignment asn ON asn.asn_id = tr.asn_id
             LEFT JOIN bus b ON b.bus_id = asn.bus_id
             LEFT JOIN driver dr ON dr.driver_id = b.driver_id
             LEFT JOIN schedule sch ON asn.schedule_id = sch.schedule_id
             LEFT JOIN route r ON r.route_id = sch.route_id
             WHERE tr.trip_id = ?`,
            [tripId]
        );
        if (!tripInfo.length) return null;

        // 2. Lấy số liệu thống kê điểm danh (Tổng học sinh, số học sinh đã đón/trả)
        // (Giả định học sinh được gán qua bus_id của assignment)
        const [stats] = await db.query(
            `SELECT 
                COUNT(s.student_id) as total_students,
                SUM(CASE WHEN r.status = 'picked_up' THEN 1 ELSE 0 END) as picked_up_count,
                SUM(CASE WHEN r.status = 'dropped_off' THEN 1 ELSE 0 END) as dropped_off_count
             FROM trip tr
             JOIN assignment asn ON tr.asn_id = asn.asn_id
             JOIN student s ON s.bus_id = asn.bus_id
             LEFT JOIN report r ON r.student_id = s.student_id AND r.trip_id = tr.trip_id
             WHERE tr.trip_id = ?`,
            [tripId]
        );

        // 3. Lấy danh sách các sự cố (notifications)
        const [incidents] = await db.query(
            `SELECT content, type, sent_time FROM notification WHERE trip_id = ?`,
            [tripId]
        );

        return {
            ...tripInfo[0],
            stats: stats[0],
            incidents: incidents
        };
    } catch (error) {
        throw new Error('Lỗi khi lấy báo cáo chuyến đi: ' + error.message);
    }
}
// HÀM MỚI: Lấy danh sách chuyến đi của 1 tài xế trong ngày hôm nay
  static async getTripsByDriverToday(driverId) {
    try {
      const query = `
        SELECT tr.trip_id, tr.status, tr.departure_time, tr.arrival_time, 
               r.name as route_name, b.plate_number,
               sch.start_time, sch.end_time
        FROM trip tr
        JOIN assignment asn ON tr.asn_id = asn.asn_id
        JOIN bus b ON asn.bus_id = b.bus_id
        JOIN schedule sch ON asn.schedule_id = sch.schedule_id
        JOIN route r ON sch.route_id = r.route_id
        WHERE b.driver_id = ? 
        AND DATE(tr.departure_time) = CURDATE() -- Chỉ lấy ngày hôm nay
        ORDER BY tr.departure_time ASC
      `;
      const [rows] = await db.query(query, [driverId]);
      return rows;
    } catch (error) {
      throw new Error('Lỗi lấy lịch trình tài xế: ' + error.message);
    }
  }
}

export default TripModel;