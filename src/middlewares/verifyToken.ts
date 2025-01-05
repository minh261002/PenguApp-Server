//// src/middleware/verifyToken.ts
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { HttpStatus } from '~/constants/httpStatus'; 
import { Messages } from '~/constants/message'; 

export const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const token = req.headers['authorization']?.split(' ')[1]; 

  if (!token) {
    return res.status(HttpStatus.UNAUTHORIZED).json({ message: Messages.TOKEN_REQUIRED });
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: Messages.SERVER_ERROR });
  }

  try {
    const decoded = verify(token, jwtSecret);
    req.user = decoded;

    next(); 
  } catch (error) {
    return res.status(HttpStatus.UNAUTHORIZED).json({ message: Messages.INVALID_TOKEN });
  }

  return;
};
