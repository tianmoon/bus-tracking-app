import db from '../config/database.js';
import Parent from '../models/ParentModel.js';
import User from '../models/UserModel.js';

// Thêm phụ huynh mới
export const createParentService = async (parentData) => {
    const conn = await db.getConnection();
    const { name, identification, email, phone_number } = parentData;
    try {
        await conn.beginTransaction();
        // Tạo người dùng mới
        const user_id = await User.create(email, phone_number, 'parent', conn);

        // Tạo phụ huynh mới
        const parent = await Parent.create(name, identification, user_id, conn);

        await conn.commit();
        return parent;
    } catch (error) {
        await conn.rollback();
        throw new Error('Lỗi service thêm phụ huynh mới vào cơ sở dữ liệu');
    } finally {
        conn.release();
    }
};



