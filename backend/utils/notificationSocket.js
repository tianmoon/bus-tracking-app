export const initializeNotificationSocket = (io) => {
    io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Join room theo role 
    socket.on('join-room', (room1) => {
      socket.join(room1);
      console.log(`Socket ${socket.id} joined room: ${room1}`);
    });


    // Nhận tin nhắn từ driver và broadcast đến nhóm
    socket.on('send-notification', async (data) => {
        const { room, type, content, tripId } = data;
    const validTypes = ['delayed', 'arrival', 'breakdown'];
    const finalType = validTypes.includes(type) ? type : 'breakdown';
    
    const newNotificationData = {
            content: content,
            type: finalType,
            trip_id: tripId,
            timestamp: new Date(),
            sender: "Tài xế (Chuyến #" + tripId + ")"
        };

      try {

        // Broadcast tin nhắn đến room
        io.to(room).emit('new-notification', newNotificationData);
        console.log(`Message sent to ${room}: ${JSON.stringify(newNotificationData)}`);
      } catch (error) {
        console.error('Error handling message:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
}        