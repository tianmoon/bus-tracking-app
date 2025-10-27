import User from '../models/UserModel.js';

// Middleware kiểm tra số điện thoại đã tồn tại chưa
export const validatePhoneNumber = async (req, res, next) => {
        const { phone_number } = req.body;
        // Kiểm tra số điện thoại rỗng
        if (!phone_number) {
            return res.status(400).json({
                status: 'fail',
                message: 'Số điện thoại không được để trống',
                code: 400});
        }

        // Regex kiểm tra định dạng số điện thoại (ví dụ: chỉ cho phép số và độ dài từ 10-15 ký tự)
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone_number)) {
            return res.status(400).json({
                status: 'fail',
                message: 'Số điện thoại không hợp lệ',
                code: 400});
        }

        // Kiểm tra số điện thoại đã tồn tại trong cơ sở dữ liệu
        const isPhoneExist = await User.isPhoneNumberExists(phone_number);
        if (isPhoneExist) {
            return res.status(409).json({
                status: 'fail',
                message: 'Số điện thoại đã tồn tại',
                code: 409});
        }
        next();
};