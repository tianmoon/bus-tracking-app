import db from '../config/database.js';
class BusModel {
    
    // Check plate number đã tồn tại chưa
    static async isPlateNumberExists(plate_number) {
        try {
            const [rows] = await db.query(
                'SELECT * FROM bus WHERE plate_number = ?',
                [plate_number]
            );
            return rows[0];
        }
        catch (error) {
            throw new Error('Lỗi khi kiểm tra biển số xe trong cơ sở dữ liệu');
        }
    }

    // Lấy tất cả xe buýt
    static async getAll() {
        try {
            const [rows] = await db.query(
                `   SELECT b.bus_id, b.plate_number, dr.name AS driver_name
                    FROM bus b
                    LEFT JOIN driver dr ON dr.driver_id = b.driver_id `
            );
            return rows;
        }
        catch (error) {
            throw new Error('Lỗi khi lấy danh sách xe buýt từ cơ sở dữ liệu');
        }
    }

    // Lấy xe buýt theo ID
    static async getById(id) {
        try {
            const [rows] = await db.query(
                `   SELECT b.bus_id, b.plate_number, dr.name AS driver_name
                    FROM bus b
                    LEFT JOIN driver dr ON dr.driver_id = b.driver_id
                    WHERE b.bus_id = ? `,
                [id]
            );
            return rows[0];
        }
        catch (error) {
            throw new Error('Lỗi khi lấy xe buýt theo id từ cơ sở dữ liệu');
        }
    }

    // Thêm xe buýt mới
    static async create(busData) {
        try {
            const { plate_number, driver_id } = busData;
            const [result] = await db.query(
                'INSERT INTO bus (plate_number, driver_id) VALUES (?, ?)',
                [plate_number, driver_id]
            );
            return {
                id: result.insertId,
                ...busData
            };
        }
        catch (error) {
            throw new Error('Lỗi khi thêm xe buýt mới vào cơ sở dữ liệu');
        }
    }

}

export default BusModel;