import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Enable CORS
app.use(cors()); // Add this line to enable CORS for all routes

// Routes
app.use('/api', userRoutes);
app.use('/api/admin', adminRoutes);
// Express route for updating user password
// app.put('/api/users/:id', async (req, res) => {
//     const { id } = req.params;
//     const { password } = req.body;

//     try {
//         const hashedPassword = await bcrypt.hash(password, 12);
//         await User.findByIdAndUpdate(id, { password: hashedPassword });
//         res.status(200).json({ message: 'Password updated successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to update password' });
//     }
// });


// Connect to MongoDB
mongoose.connect('mongodb+srv://avinashsaini39:9928373382@cluster.ysujsgk.mongodb.net/timesheet')
  .then(() => console.log('MongoDB Initialized'))
  .catch((error) => console.log('Error connecting to MongoDB:', error));

// Start server
const PORT = 5500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
