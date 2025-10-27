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
}
export default DriverModel;