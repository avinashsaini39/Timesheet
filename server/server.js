import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

// Connect to MongoDB
mongoose.connect('mongodb+srv://avinashsaini39:9928373382@cluster.ysujsgk.mongodb.net/timesheet').then(() => console.log('MongoDB Initialized'))
  .catch((error) => console.log('Error connecting to MongoDB:', error));

// Start server
const PORT = 5500;
app.listen(PORT, () => console.log(`Server Port ${PORT}`));
