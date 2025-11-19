// Socket.IO tracking handling
export const initializeTrackingSocket = (io) => {
  // Lưu vị trí bus hiện tại
  const busLocations = new Map();

  io.on('connection', (socket) => {
    console.log('Tracking user connected:', socket.id);

    // Driver gửi vị trí realtime
    socket.on('update-location', (data) => {
      const { trip_id, bus_id, latitude, longitude, speed, heading } = data;
      
      // Lưu vị trí mới nhất
      busLocations.set(bus_id, {
        trip_id,
        bus_id,
        latitude,
        longitude,
        speed,
        heading,
        timestamp: new Date()
      });

      // Broadcast đến tất cả admin/parent đang theo dõi
      io.emit('location-update', {
        trip_id,
        bus_id,
        latitude,
        longitude,
        speed,
        heading,
        timestamp: new Date()
      });

      console.log(`Bus ${bus_id} location updated: ${latitude}, ${longitude}`);
    });

    // Admin/Parent yêu cầu vị trí hiện tại của bus
    socket.on('request-location', (bus_id) => {
      const location = busLocations.get(bus_id);
      if (location) {
        socket.emit('location-update', location);
      }
    });

    // Lấy tất cả vị trí bus đang hoạt động
    socket.on('get-all-locations', () => {
      const allLocations = Array.from(busLocations.values());
      socket.emit('all-locations', allLocations);
    });

    socket.on('disconnect', () => {
      console.log('Tracking user disconnected:', socket.id);
    });
  });
};
