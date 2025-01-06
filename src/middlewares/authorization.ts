import { Request, Response, NextFunction } from "express";
import { UserRole } from "~/constants/enum";
import { HttpStatus } from "~/constants/httpStatus";
import {Messages} from "~/constants/message";

export const isAdmin = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const user = req.user;
        if (user.role === UserRole.ADMIN) {
            next();
        } else {
            return res.status(HttpStatus.UNAUTHORIZED).json({ message: Messages.PERMISSION_DENIED });
        }
    } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: Messages.SERVER_ERROR });
    }
};