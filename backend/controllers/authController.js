import db from '../config/database.js';

let loggedInUsers = {}; // Map để lưu trữ trạng thái đăng nhập của người dùng

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const [rows] = await db.query(
            'SELECT * FROM user WHERE email = ? AND password = ?',
            [email, password]
        );

        if (!email || !password) {
            return res.status(400).json({
                status: 'fail',
                message: 'Thiếu thông tin bắt buộc: email và password',
                code: 400
            });
        }

        const user = rows[0];
        if (!user) {
            return res.status(401).json({
                status: 'fail',
                message: 'Email hoặc mật khẩu không đúng',
                code: 401
            });
        }

        loggedInUsers[user.user_id] = true; // Đánh dấu người dùng là đã đăng nhập
        res.status(200).json({
            status: 'success',
            data: {
                user_id: user.user_id,
                email: user.email,
                role: user.role
            },
            message: 'Đăng nhập thành công'
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
            code: 500
        });
    }
}

export const logout = async (req, res) => {
    try {
        const userId = req.body.user_id;

        if (!userId) {
            return res.status(400).json({
                status: 'fail',
                message: 'Thiếu thông tin bắt buộc: user_id',
                code: 400
            });
        }
        if (!loggedInUsers[userId]) {
            return res.status(400).json({
                status: 'fail',
                message: 'Người dùng chưa đăng nhập',
                code: 400
            });
        }
        delete loggedInUsers[userId]; // Xóa trạng thái đăng nhập của người dùng
        res.status(200).json({
            status: 'success',
            message: 'Đăng xuất thành công'
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
            code: 500
        });
    }
}

export const isLoggedIn = (userId) => {
    return !!loggedInUsers[userId];
}



