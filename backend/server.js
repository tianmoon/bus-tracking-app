import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import studentRoutes from './routes/studentRoutes.js';
import parentRoutes from './routes/parentRoutes.js';
import busRoutes from './routes/busRoutes.js';
import driverRoutes from './routes/driverRoutes.js';
import authRoutes from './routes/authRoutes.js';


// Initialize Express 
const app = express();
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

// Route mặc định
app.get('/', (req, res) => {
  res.json({ message: 'API Quản lý học sinh' });
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});