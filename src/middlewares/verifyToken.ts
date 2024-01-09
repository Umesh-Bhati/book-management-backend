import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/User';
import { IUser } from '../types/types';

export interface CustomRequest extends Request {
  userId: number;
}


const verifyToken = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {

    const { token } = req.cookies;
    if (!token)
      return res.status(404).json({
        success: false,
        message: "Login First",
      });

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { _id: number };
    req.userId = decoded?._id;
    next();
  } catch (error) {
    console.error("verifyTokenErr ", error)
    next(error)
  }
};

export default verifyToken;
