import db from '../config/database.js';

class MessageModel {

    // Lấy tất cả tin nhắn theo nhóm
    static async getByGroup(room) {
        try {
            const [rows] = await db.query(
                `SELECT m.msg_id, m.content, m.time_sent, m.sender_id, m.receiver_id, m.room
                FROM message m
                WHERE m.room = ? ORDER BY m.time_sent ASC`, [room]);
            return rows;
        } catch (error) {
            throw new Error('Lỗi khi lấy tin nhắn từ cơ sở dữ liệu');
        }
    }

    // Tạo tin nhắn mới
    static async create(message) {
        const { content, sender_id, receiver_id, room } = message;
        // if (!receiver_id) {
        //     receiver_id = null;
        // }
        try {
            const [result] = await db.query(
                `INSERT INTO message (content, time_sent, sender_id, receiver_id, room, status)
                VALUES (?, NOW(), ?, ?, ?, 'unread')`,
                [content, sender_id, receiver_id, room]
            );
            return {
                id: result.insertId,
                ...message
            };
        } catch (error) {
            throw new Error('Lỗi khi tạo tin nhắn mới trong cơ sở dữ liệu');
        }
    }
}   

export default MessageModel;