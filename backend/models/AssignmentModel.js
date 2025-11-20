import db from '../config/database.js';

class AssignmentModel {
    // Lấy tất cả assignment
    static async getAll() {
        try {
            const [rows] = await db.query(
                `SELECT asn.asn_id, b.bus_id, sch.schedule_id, b.plate_number, dr.name as driver_name , r.name as route_name, sch.start_time, sch.end_time, sch.day_of_week
                FROM assignment asn
                LEFT JOIN bus b ON asn.bus_id = b.bus_id
                LEFT JOIN driver dr ON b.driver_id = dr.driver_id
                LEFT JOIN schedule sch ON sch.schedule_id = asn.schedule_id
                LEFT JOIN route r ON r.route_id = sch.route_id`);
            return rows;
        } catch (error) {
            throw new Error('Lỗi khi lấy danh sách assignment từ cơ sở dữ liệu');
        }
    }

    // Lấy assignment theo ID
    static async getById(id) {
        try {
            const [rows] = await db.query(
                `SELECT asn.asn_id, b.plate_number, dr.name as driver_name, r.name as route_name, sch.start_time, sch.end_time, sch.day_of_week
                FROM assignment asn
                LEFT JOIN bus b ON asn.bus_id = b.bus_id
                LEFT JOIN driver dr ON b.driver_id = dr.driver_id
                LEFT JOIN schedule sch ON sch.schedule_id = asn.schedule_id
                LEFT JOIN route r ON r.route_id = sch.route_id
                WHERE asn.asn_id = ?`, [id]);
            return rows[0];
        } catch (error) {
            throw new Error('Lỗi khi lấy assignment từ cơ sở dữ liệu');
        }
    }

    // Tạo assignment mới
    static async create(assignment) {
        const { bus_id, schedule_id } = assignment;
        try {
            const [result] = await db.query(
                `INSERT INTO assignment (bus_id, schedule_id) VALUES (?, ?)`,
                [bus_id, schedule_id]
            );
            return {
                id: result.insertId,
                ...assignment
            };
        }
        catch (error) {
            throw new Error('Lỗi khi tạo assignment mới trong cơ sở dữ liệu');
        }
    }

    // Cập nhật assignment
    static async update(id, assignment) {
        const { bus_id, schedule_id } = assignment;
        try {
            await db.query(
                `UPDATE assignment
                SET bus_id = ?, schedule_id = ?
                WHERE asn_id = ?;`,
                [bus_id, schedule_id, id]
            );
            return {
                id,
                ...assignment
            };
        } catch (error) {
            throw new Error('Lỗi khi cập nhật assignment trong cơ sở dữ liệu');
        }
    }

    // Lịch đã được phân công 
    static async isScheduleAssigned(schedule_id) {
        try {
            const [rows] = await db.query(
                'SELECT * FROM assignment WHERE schedule_id = ?',
                [schedule_id]
            );
            return rows[0];
        }
        catch (error) {
            throw new Error('Lỗi khi kiểm tra lịch trình đã được phân công trong cơ sở dữ liệu');
        }
    }
  
}
export default AssignmentModel;