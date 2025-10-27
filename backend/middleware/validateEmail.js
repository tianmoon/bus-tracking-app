import User from '../models/UserModel.js';

// Middleware kiểm tra email đã tồn tại chưa
export const validateEmail = async (req, res, next) => {
        const { email } = req.body;
        // Kiểm tra email rỗng
        if (!email) {
            return res.status(400).json({ 
                status: 'fail',
                message: 'Email không được để trống',
                code: 400});
        }

        // Regex kiểm tra định dạng email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                status: 'fail',
                message: 'Email không hợp lệ',
                code: 400});
        }

        // Kiểm tra email đã tồn tại trong cơ sở dữ liệu
        const isEmailExist = await User.isEmailExists(email);
        if (isEmailExist) {
            return res.status(409).json({ 
                status: 'fail',
                message: 'Email đã tồn tại',
                code: 409});
        }
        next();
};
