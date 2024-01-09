import { CustomRequest } from "../middlewares/verifyToken";
import { NextFunction, Response } from "express";
import User from "../models/User";

export const getSelfUser = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId);
        res.status(200).json({ success: true, data: { email: user?.email, name: user?.name } });
    } catch (error) {
        next(error)
    }
};