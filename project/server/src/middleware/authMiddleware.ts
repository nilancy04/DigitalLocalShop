import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    const user = await User.findOne({ 
      _id: (decoded as any)._id, 
      'tokens.token': token 
    });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Please authenticate' });
  }
}; 