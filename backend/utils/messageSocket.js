import Message from "../models/MessageModel.js";

// Socket.IO message handling
export const initializeMessageSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Join room theo role (parent, driver, admin)
    socket.on('join-room', (room) => {
      socket.join(room);
      console.log(`Socket ${socket.id} joined room: ${room}`);
    });

    // Nhận tin nhắn từ admin và broadcast đến nhóm
    socket.on('send-message', async (data) => {
      const { room, content, sender_id, sender } = data;

      try {
        // Lưu tin nhắn vào database
        const messageData = {
          content: content,
          sender_id: sender_id,
          room: room
        };
        
        await Message.create(messageData);
        console.log('Message saved to DB');

        // Broadcast tin nhắn đến room
        io.to(room).emit('receive-message', {
          content,
          sender,
          timestamp: new Date()
        });
        console.log(`Message sent to ${room}: ${content}`);
      } catch (error) {
        console.error('Error handling message:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};