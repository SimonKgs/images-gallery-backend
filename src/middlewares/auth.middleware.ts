import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { JwtPayload } from 'jsonwebtoken';



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

  next();
};



// Extend the Request interface to include a user object
interface AuthenticatedRequest extends Request {
  user?: JwtPayload | string;
}


//* OWNER OF THE ROUTE
// to control not other user than the actual will modify the data 
export const authOwnershipMiddleware = async (
  req: AuthenticatedRequest, 
  res: Response, 
  next: NextFunction
) => {
  // Extract token from "Bearer <token>"
  const token = req.headers.authorization?.split(' ')[1]; 
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Verifying the token and get the payload I need to cast it
  const decoded = verifyToken(token) as JwtPayload;
  
  // check if ther is a token user
  if (!decoded || !decoded.id) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  // Get user ID from the token payload and the ID from params to compare them
  const userIdFromToken = decoded.id as string; 
  const userIdFromParams = req.params.id;

  if (userIdFromToken !== userIdFromParams) {
    return res.status(403).json({ message: 'You are not authorized to modify this user' });
  }

  next();
};
