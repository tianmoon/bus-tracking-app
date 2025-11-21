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

// Thêm tin nhắn mới (SỬA PHẦN NÀY)
export const createMessage = async (req, res) => {
    try {
        const messageData = req.body;
        
        // 1. Validate
        if (!messageData.content || !messageData.sender_id || !messageData.room) {
            return res.status(400).json({
                status: 'fail',
                message: 'Thiếu thông tin bắt buộc: content, sender_id, room',
                code: 400
            });
        }

        // 2. Lưu vào Database (Code cũ của em)
        const newMessage = await Message.create(messageData);

        // 3. --- BẮN SOCKET (PHẦN CÒN THIẾU) ---
        // Lấy biến io từ server.js
        const io = req.app.get('io'); 

        if (io) {
            // Chuẩn bị gói tin để gửi realtime
            const socketData = {
                msg_id: newMessage.id,
                content: messageData.content,
                sender: messageData.sender || "Quản trị viên", // Tên người gửi (hoặc em query user để lấy tên thật)
                sender_id: messageData.sender_id,
                timestamp: new Date(),
                room: messageData.room
            };

            // Gửi tin nhắn đến đúng phòng (driver hoặc parent)
            io.to(messageData.room).emit('receive-message', socketData);
            
            console.log(`>> Đã bắn socket tin nhắn tới phòng ${messageData.room}:`, socketData.content);
        }
        // ---------------------------------------

        res.status(201).json({
            status: 'success',
            data: newMessage,
            message: 'Thêm tin nhắn mới thành công'
        });
    }
    catch (error) {
        console.error("Lỗi createMessage:", error);
        res.status(500).json({
            status: 'error',
            message: error.message,
            code: 500
        });
    }
};