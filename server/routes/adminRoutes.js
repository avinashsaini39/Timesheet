import express from 'express';
import { adminSignup, adminLogin } from '../controllers/adminController.js';

const router = express.Router();

// Admin signup
router.post('/signup', adminSignup);

// Admin login
router.post('/login', adminLogin);

export default router;
