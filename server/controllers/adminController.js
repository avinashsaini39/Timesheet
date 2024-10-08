import Admin from '../models/adminModel.js';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const secret = 'avinash';


// Admin Signup
export const adminSignup = async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      const existingAdmin = await Admin.findOne({ email });
      if (existingAdmin) return res.status(400).json({ message: 'Admin already exists' });
  
      const newAdmin = new Admin({ username, email, password });
      await newAdmin.save();
      
      res.status(201).json({ message: 'Admin created successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  };
  
  // Admin Login
//   export const adminLogin = async (req, res) => {
//     const { email, password } = req.body;
  
//     try {
//       const admin = await Admin.findOne({ email });
//       if (!admin) return res.status(404).json({ message: 'Admin not found' });
  
//       const isPasswordCorrect = await bcrypt.compare(password, admin.password);
//       if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });
  
//       const token = jwt.sign({ id: admin._id }, secret, { expiresIn: '1h' });
//       res.status(200).json({ result: admin, token });
//     } catch (error) {
//       res.status(500).json({ message: 'Something went wrong' });
//     }
//   };


export const adminLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the email belongs to an admin
        const admin = await Admin.findOne({ email });
        if (admin) {
            // Admin login
            const isPasswordCorrect = await bcrypt.compare(password, admin.password);
            if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });

            const token = jwt.sign({ id: admin._id, role: 'admin' }, secret, { expiresIn: '1h' });
            return res.status(200).json({ result: admin, token });
        }

        // Check if the email belongs to a user
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, role: 'user' }, secret, { expiresIn: '1h' });
        return res.status(200).json({ result: user, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};
  
  // Verify Token Middleware
  export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) return res.status(403).json({ message: 'Unauthorized' });
  
    try {
      const decoded = jwt.verify(token, secret);
      req.adminId = decoded?.id;
      next();
    } catch (error) {
      res.status(403).json({ message: 'Invalid token' });
    }
  };