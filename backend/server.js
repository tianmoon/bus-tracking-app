import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { initializeMessageSocket } from './utils/messageSocket.js';
import { initializeTrackingSocket } from './utils/trackingSocket.js';
import { initializeNotificationSocket } from './utils/notificationSocket.js';
import studentRoutes from './routes/studentRoutes.js';
import parentRoutes from './routes/parentRoutes.js';
import busRoutes from './routes/busRoutes.js';
import driverRoutes from './routes/driverRoutes.js';
import authRoutes from './routes/authRoutes.js';
import routeRoutes from './routes/routeRoutes.js';
import scheduleRoutes from './routes/scheduleRoutes.js';
import assignmentRoutes from './routes/assignmentRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import userRoutes from './routes/userRoutes.js';
import tripRoutes from './routes/tripRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';

// Initialize Express 
const app = express();
// Create HTTP server
const httpServer = createServer(app);

// Initialize Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// Port
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/students', studentRoutes);
app.use('/api/parents', parentRoutes);
app.use('/api/buses', busRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/routes', routeRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/user', userRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/notifications', notificationRoutes);

// Route mặc định
app.get('/', (req, res) => {
  res.json({ message: 'API Quản lý học sinh' });
})

// --- QUAN TRỌNG: Cấu hình Socket để Controller có thể gọi được ---
app.set('io', io); 

// --- QUAN TRỌNG: Xử lý Logic Join Room trực tiếp tại đây để đảm bảo kết nối ---
io.on("connection", (socket) => {
  // Log khi có người kết nối
  console.log(`⚡ Client connected: ${socket.id}`);

  // Lắng nghe sự kiện xin vào phòng từ Frontend (Driver/Parent/Admin)
  socket.on("join-room", (room) => {
    socket.join(room); // Cho socket này vào phòng
    console.log(`✅ User ${socket.id} joined room: ${room}`);
  });

  socket.on("disconnect", () => {
    console.log(`❌ Client disconnected: ${socket.id}`);
  });
});

// Initialize other Socket.IO handlers (Nếu trong này chưa có logic join-room)
initializeMessageSocket(io);
initializeTrackingSocket(io);
initializeNotificationSocket(io);

// Export io để dùng trong các route khác nếu cần
export { io };

// Start the server
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Socket.IO is ready`);
});