import User from "~/models/databases/user.model";
import { Request, Response } from "express";
import { HttpStatus } from "~/constants/httpStatus";
import { Messages } from "~/constants/message";

const getAllUsers = async (req: Request, res: Response): Promise<any> => {
  try {
    const { page, limit } = req.query;
    let users; 

    if (!page || !limit) {
      users = await User.find();
    } else {
      users = await User.find().skip(+page * +limit).limit(+limit);
    }

    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: Messages.SUCCESS,
      data: users,
    });
    } catch (err) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: Messages.SERVER_ERROR });
    }
  };

const getUserById = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ status: HttpStatus.NOT_FOUND, message: Messages.NOT_FOUND });
    }

    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: Messages.SUCCESS,
      data: user,
    });
  } catch (err) {
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: Messages.SERVER_ERROR });
  }
}

export {
  getAllUsers,
  getUserById,
};