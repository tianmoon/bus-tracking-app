import User from '../models/UserModel.js';

// Lấy thông tin phụ huynh theo user ID
export const getParentByUserId = async (req, res) => {
    try {
        const userId = req.params.id;
        const parent = await User.getParentByUserId(userId);
        res.status(200).json({
            status: 'success',
            data: parent,
            message: 'Lấy thông tin phụ huynh thành công'
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

// Lấy thông tin tài xế theo user ID
export const getDriverByUserId = async (req, res) => {
    try {
        const userId = req.params.id;
        const driver = await User.getDriverByUserId(userId);
        res.status(200).json({
            status: 'success',
            data: driver,
            message: 'Lấy thông tin tài xế thành công'
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