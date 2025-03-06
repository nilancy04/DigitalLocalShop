import express from 'express';
import { Router } from 'express';
import pool from '../config/database';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router: Router = express.Router();

// Login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Get user from database
        const [users] = await pool.execute(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        const user = (users as any[])[0];

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Create JWT token
        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        res.json({
            success: true,
            token,
            userId: user.id,
            message: 'Login successful'
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during login'
        });
    }
});

export default router; 