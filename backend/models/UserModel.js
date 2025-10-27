import db from '../config/database.js';

class UserModel {

    // Check email đã tồn tại chưa
    static async isEmailExists(email) {
        try {
            const [rows] = await db.query(
                'SELECT * FROM user WHERE email = ?',
                [email]
            );
            return rows[0];
        }
        catch (error) {
            throw new Error('Lỗi khi kiểm tra email trong cơ sở dữ liệu');
        }
    }

    // Check số điện thoại đã tồn tại chưa
    static async isPhoneNumberExists(phone_number) {
        try {
            const [rows] = await db.query(
                'SELECT * FROM user WHERE phone_number = ?',
                [phone_number]
            );
            return rows[0];
        }
        catch (error) {
            throw new Error('Lỗi khi kiểm tra số điện thoại trong cơ sở dữ liệu');
        }
    }

    //Check 

    // Thêm người dùng mới
    static async create(email, phone_number, role, conn) {
        try {
            const [result] = await conn.query(
                'INSERT INTO user (email, phone_number, password, role, active) VALUES (?, ?, "123@123", ?, 1)',
                [email, phone_number, role]
            );
            return result.insertId;
        }
        catch (error) {
            throw new Error('Lỗi khi thêm người dùng mới vào cơ sở dữ liệu');
        }
    }

}

export default UserModel;
            