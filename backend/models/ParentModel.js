import db from '../config/database.js';

class ParentModel {

    // Lấy tất cả phụ huynh
    static async getAll() {
        try {
            const [rows] = await db.query(
                `   SELECT pt.parent_id, pt.name, pt.identification, us.email, us.phone_number 
                    FROM parent pt
                    LEFT JOIN user us ON us.user_id = pt.user_id `
            );
            return rows;
        } catch (error) {
            throw new Error('Lỗi khi lấy danh sách phụ huynh từ cơ sở dữ liệu');
        }
    }

    // Lấy phụ huynh theo ID
    static async getById(id) {
        try {
            const [rows] = await db.query(  
                `   SELECT pt.parent_id, pt.name, pt.identification, us.email, us.phone_number 
                    FROM parent pt
                    LEFT JOIN user us ON us.user_id = pt.user_id    
                    WHERE pt.parent_id = ? `,
                [id]
            );
            return rows[0];
        } catch (error) {
            throw new Error('Lỗi khi lấy phụ huynh theo id từ cơ sở dữ liệu');
        }   
    }

    // Thêm phụ huynh mới
    static async create(name, identification, user_id, conn) {
        try {
            const [result] = await conn.query(
                'INSERT INTO parent (name, identification, user_id) VALUES (?, ?, ?)',
                [name, identification, user_id]
            );
            return {
                id: result.insertId,
                name,
                identification,
                user_id
            };
        }
        catch (error) {
            throw new Error('Lỗi khi thêm phụ huynh mới vào cơ sở dữ liệu');
        }
    }       
}

export default ParentModel;
    
