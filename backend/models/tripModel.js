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
}

export default TripModel;