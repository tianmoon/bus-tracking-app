import db from '../config/database.js';

class DriverModel {
    // Lấy tất cả tài xế
    static async getAll() {
        try {
            const [rows] = await db.query(
                `   SELECT dr.driver_id, dr.name, us.email, us.phone_number
                    FROM driver dr
                    LEFT JOIN user us ON us.user_id = dr.user_id `
            );
            return rows;
        }   
        catch (error) {
            throw new Error('Lỗi khi lấy danh sách tài xế từ cơ sở dữ liệu');
        }
    }
    // Lấy tài xế theo ID
    static async getById(id) {
        try {
            const [rows] = await db.query(
                `   SELECT dr.driver_id, dr.name, us.email, us.phone_number
                    FROM driver dr
                    LEFT JOIN user us ON us.user_id = dr.user_id
                    WHERE dr.driver_id = ? `,
                [id]
            );
            return rows[0];
        }
        catch (error) {
            throw new Error('Lỗi khi lấy tài xế theo id từ cơ sở dữ liệu');
        }
    }
    // Thêm tài xế mới
    static async create(name, user_id, conn) {
        try {
            const [result] = await conn.query(
                'INSERT INTO driver (name, user_id) VALUES (?, ?)',
                [name, user_id]
            );
            return {
                id: result.insertId,
                name,
                user_id
            };
        }
        catch (error) {
            throw new Error('Lỗi khi thêm tài xế mới vào cơ sở dữ liệu');
        }
    }



    // ✅ THÊM MỚI: Lấy lịch trình chạy xe HÔM NAY của tài xế
    static async getScheduleToday(driverId) {
        try {
            // Câu Query liên kết 5 bảng để lấy đầy đủ thông tin
            const sql = `
                SELECT 
                    t.trip_id, 
                    t.status, 
                    sch.start_time, 
                    sch.end_time,
                    r.name as route_name, 
                    r.start as start_point, 
                    r.end as end_point,
                    b.plate_number
                FROM trip t
                JOIN assignment a ON t.asn_id = a.asn_id
                JOIN bus b ON a.bus_id = b.bus_id
                JOIN schedule sch ON a.schedule_id = sch.schedule_id
                JOIN route r ON sch.route_id = r.route_id
                WHERE b.driver_id = ? 
                AND a.asn_date = CURDATE() -- Chỉ lấy lịch hôm nay
                ORDER BY sch.start_time ASC
            `;
            
            const [rows] = await db.query(sql, [driverId]);
            return rows;
        } catch (error) {
            throw new Error('Lỗi khi lấy lịch trình tài xế: ' + error.message);
        }
    }

     
   
    // ✅ ĐÃ SỬA (FINAL): Query chuẩn theo cấu trúc bảng TRIP của em
    static async getScheduleToday(driverId) {
        try {
            // Logic mới: 
            // 1. Lấy giờ đi/đến trực tiếp từ bảng trip (departure_time, arrival_time)
            // 2. Lọc ngày bằng cách dùng hàm DATE() bao quanh departure_time
            
            const sql = `
                SELECT 
                    t.trip_id, 
                    t.status, 
                    -- Lấy thẳng thời gian từ bảng Trip (chính xác nhất)
                    t.departure_time as start_time,
                    t.arrival_time as end_time,
                    
                    r.name as route_name, 
                    r.start as start_point, 
                    r.end as end_point,
                    b.plate_number
                FROM trip t
                JOIN assignment a ON t.asn_id = a.asn_id
                JOIN bus b ON a.bus_id = b.bus_id
                JOIN schedule sch ON a.schedule_id = sch.schedule_id
                JOIN route r ON sch.route_id = r.route_id
                WHERE b.driver_id = ? 
                -- ✅ LỌC NGÀY: Lấy phần NGÀY từ cột departure_time để so sánh với hôm nay
                AND DATE(t.departure_time) = CURDATE() 
                ORDER BY t.departure_time ASC
            `;
            
            const [rows] = await db.query(sql, [driverId]);
            return rows;
        } catch (error) {
            console.error("SQL Error:", error); 
            throw new Error('Lỗi khi lấy lịch trình tài xế: ' + error.message);
        }
    }

    // Lấy thông tin profile tài xế từ User ID
    static async getProfileByUserId(userId) {
        try {
            const [rows] = await db.query(`
                SELECT d.*, u.email, u.phone_number, u.role
                FROM driver d
                JOIN user u ON d.user_id = u.user_id
                WHERE u.user_id = ?
            `, [userId]);
            return rows[0];
        } catch (error) {
            throw new Error('Lỗi lấy profile tài xế');
        }
    }
    static async updateStatus(tripId, newStatus) {
        try {
            const [result]=await db.query(
                'UPDATE Trip SET status = ? WHERE trip_id = ?',
                [newStatus, tripId]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error('Lỗi khi cập nhật trạng thái chuyến đi');
        }
  }
}




export default DriverModel;