import Message from '../models/MessageModel.js';

// Lấy tất cả tin nhắn
export const getAllMessagesByRoom = async (req, res) => {
    try {
        const room = req.params.room;
        const messages = await Message.getByGroup(room);
        res.status(200).json({
            status: 'success',
            data: messages,
            message: 'Lấy danh sách tin nhắn thành công'
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
            code: 500
        });
    }
};

// Thêm tin nhắn mới
export const createMessage = async (req, res) => {
    try {
        const messageData = req.body;
        if (!messageData.content || !messageData.sender_id|| !messageData.room) {
            return res.status(400).json({
                status: 'fail',
                message: 'Thiếu thông tin bắt buộc: content, sender_id, room',
                code: 400
            });
        }

        const newMessage = await Message.create(messageData);
        res.status(201).json({
            status: 'success',
            data: newMessage,
            message: 'Thêm tin nhắn mới thành công'
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
            code: 500
        });
    }
};


