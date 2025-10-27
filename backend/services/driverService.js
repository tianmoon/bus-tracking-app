import db from '../config/database.js';
import Driver from '../models/DriverModel.js';
import User from '../models/UserModel.js';

// Thêm tài xế mới
export const createDriverService = async (driverData) => {
    const conn = await db.getConnection();
    const { name, email, phone_number } = driverData;
    try {
        await conn.beginTransaction();
        // Tạo người dùng mới
        const user_id = await User.create(email, phone_number, 'driver', conn);

        // Tạo tài xế mới
        const driver = await Driver.create(name, user_id, conn);
        await conn.commit();
        
        return driver;
    } catch (error) {
        await conn.rollback();
        throw new Error('Lỗi service thêm tài xế mới vào cơ sở dữ liệu');
    }
    finally {
        conn.release();
    }
};
