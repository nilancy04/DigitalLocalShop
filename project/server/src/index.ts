import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database';
import shopRoutes from './routes/shopRoutes';
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';

// Load environment variables
dotenv.config();

declare global {
  namespace Express {
    interface Request {
      user?: any;
      token?: string;
    }
  }
}

const app: Express = express();
const PORT: number = Number(process.env.PORT) || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/shops', shopRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 