import db from '../config/database.js';

class ScheduleModel {

    // Lấy tất cả lịch trình theo tuần
    static async getAll(week, year) {
        try {
            // Nếu không có tham số tuần/năm, lấy tất cả
            if (!week || !year) {
                const [rows] = await db.query(
                    `SELECT sc.schedule_id, r.name, sc.start_time, sc.end_time, sc.day_of_week, sc.describe, sc.route_id
                    FROM schedule sc
                    LEFT JOIN route r ON r.route_id = sc.route_id
                    WHERE sc.active = 1
                    ORDER BY sc.start_time`
                );
                return rows;
            }

            // Hàm lấy tuần 
            // Tính ngày đầu tuần (Thứ 2) và cuối tuần (Chủ nhật)
            const startDate = this.getDateOfWeek(week, year);
            const endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + 6);
            endDate.setHours(23, 59, 59, 999); // Cuối ngày Chủ nhật

            // Format ngày cho MySQL: YYYY-MM-DD HH:MM:SS
            const startDateStr = startDate.toISOString().slice(0, 19).replace('T', ' ');
            const endDateStr = endDate.toISOString().slice(0, 19).replace('T', ' ');

            // Query lọc lịch trình trong khoảng thời gian của tuần
            const [rows] = await db.query(
                `SELECT sc.schedule_id, r.name, sc.start_time, sc.end_time, sc.day_of_week, sc.describe, sc.route_id
                FROM schedule sc
                LEFT JOIN route r ON r.route_id = sc.route_id
                WHERE sc.active = 1
                AND sc.start_time >= ?
                AND sc.start_time <= ?
                ORDER BY sc.start_time`,
                [startDateStr, endDateStr]
            );

            return rows;
        } catch (error) {
            console.error('Error in getAll:', error);
            throw new Error('Lỗi khi lấy danh sách lịch trình từ cơ sở dữ liệu');
        }
    }

    // Hàm helper tính ngày đầu tuần (Thứ 2)
    static getDateOfWeek(week, year) {
        const date = new Date(year, 0, 1 + (week - 1) * 7);
        const dayOfWeek = date.getDay();
        const diff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
        return new Date(date.setDate(diff));
    }

    // Lấy lịch trình theo id
    static async getById(id) {
        try {
            const [rows] = await db.query(
                `SELECT r.name, sc.start_time, sc.end_time, sc.day_of_week, sc.describe
                FROM schedule sc
                LEFT JOIN route r ON r.route_id = sc.route_id
                WHERE sc.schedule_id = ?`, [id]);
            return rows[0];
        } catch (error) {
            throw new Error('Lỗi khi lấy lịch trình từ cơ sở dữ liệu');
        }
    }

    // Tạo lịch trình mới
    static async create(schedule) {
        const { route_id, start_time, end_time, day_of_week, describe } = schedule;
        try {
            const [result] = await db.query(
                `INSERT INTO schedule (route_id, start_time, end_time, day_of_week, \`describe\`, active)
                VALUES (?, ?, ?, ?, ?, 1)`,
                [route_id, start_time, end_time, day_of_week, describe]
            );
            return {
                id: result.insertId,
                ...schedule
            };
        } catch (error) {
            throw new Error('Lỗi khi tạo lịch trình mới trong cơ sở dữ liệu');
        }
    }

    // Cập nhật lịch trình
    static async update(id, schedule) {
        const { route_id, start_time, end_time, day_of_week, describe } = schedule;
        try {
            await db.query(
                `UPDATE schedule
                SET route_id = ?, start_time = ?, end_time = ?, day_of_week = ?, \`describe\` = ?
                WHERE schedule_id = ?;`,
                [route_id, start_time, end_time, day_of_week, describe, id]
            );
            return {
                id,
                ...schedule
            };
        } catch (error) {
            throw new Error('Lỗi khi cập nhật lịch trình trong cơ sở dữ liệu');
        }
    }

    // Xóa lịch trình
    static async delete(id) {
        try {
            await db.query(
                `UPDATE schedule
                SET active = 0
                WHERE schedule_id = ?;
                `, [id]
            );
            return{ id };
        } catch (error) {
            throw new Error('Lỗi khi xóa lịch trình trong cơ sở dữ liệu');
        }
    }

}

export default ScheduleModel;