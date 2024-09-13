import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from "Bearer <token>"
  console.log(token);

  if (!token) {
    return res.status(401).send('No token provided');
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).send('Invalid token');
  }

  
//   req.user = decoded; // Attach user information to request (optional)
  next();
};
