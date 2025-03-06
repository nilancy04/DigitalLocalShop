import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './config/database';
import authRoutes from './routes/authRoutes';

// Load environment variables
dotenv.config();

const app: Express = express();
const PORT: number = Number(process.env.PORT) || 3005;

// Middleware
app.use(cors());
app.use(express.json());

// Test database connection
const testConnection = async () => {
    try {
        await pool.getConnection();
        console.log('Database connected successfully');
        return true;
    } catch (error) {
        console.error('Database connection error:', error);
        return false;
    }
};

// Routes
app.use('/api/auth', authRoutes);

// Test route
app.get('/test', (req, res) => {
    res.json({ message: 'Server is running' });
});

// Start server
const startServer = async () => {
    const isConnected = await testConnection();
    if (isConnected) {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } else {
        process.exit(1);
    }
};

startServer(); 