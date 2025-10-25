import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import studentRoutes from './routes/studentRoutes.js';


// Initialize Express 
const app = express();
// Port
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/students', studentRoutes);

// Route mặc định
app.get('/', (req, res) => {
  res.json({ message: 'API Quản lý học sinh' });
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});