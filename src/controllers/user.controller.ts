import User from "~/models/databases/user.model";
import { Request, Response } from "express";
import { HttpStatus } from "~/constants/httpStatus";
import { Messages } from "~/constants/message";
import {  hashSync } from "bcrypt";

const getAllUsers = async (req: Request, res: Response): Promise<any> => {
  try {
    const users = await User.find()
      .where('_id').ne(req.user.id)
      .sort({ createdAt: -1 });
    
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: Messages.SUCCESS,
      data: users,
    });

    } catch (err) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({status: HttpStatus.OK ,message: Messages.SERVER_ERROR });
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

const createUser = async (req: Request, res: Response): Promise<any> => {

  try {
    const { name, email, password, phone, province_id, district_id, ward_id, address, status, avatar, role, birthday } = req.body;
    console.log(req.body)
    if(!name || !email || !password){
      return res.status(HttpStatus.BAD_REQUEST).json({status: HttpStatus.BAD_REQUEST, message: Messages.REQUIRED_FIELDS_MISSING});
    }

    const existsUser = await User.findOne({ email });
    if(existsUser){
      return res.status(HttpStatus.BAD_REQUEST).json({status: HttpStatus.BAD_REQUEST, message: Messages.EMAIL_EXISTS});
    }

    const hashedPassword = hashSync(password, 10);

    const user = new User();

    user.name = name;
    user.email = email;
    user.password = hashedPassword;
    if(phone) user.phone = phone;
    if(province_id) user.province_id = province_id;
    if(district_id) user.district_id = district_id;
    if(ward_id) user.ward_id = ward_id;
    if(address) user.address = address;
    if(status) user.status = status;
    if(role) user.role = role;
    if(avatar) user.avatar = avatar;
    if(birthday) user.birthday = birthday

    await user.save();

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

const updateUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ status: HttpStatus.NOT_FOUND, message: Messages.NOT_FOUND });
    }

    const { name, email,password, phone, province_id, district_id, ward_id, address, status, role, avatar, birthday} = req.body;

    if(password){
      const hashedPassword = hashSync(password, 10);
      user.password = hashedPassword;
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (province_id) user.province_id = province_id;
    if (district_id) user.district_id = district_id;
    if (ward_id) user.ward_id = ward_id;
    if (address) user.address = address;
    if (status) user.status = status;
    if (role) user.role = role;
    if (avatar) user.avatar = avatar;
    if (birthday) user.birthday = birthday;

    const updatedUser = await user.save();

    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: Messages.SUCCESS,
      data: updatedUser, 
    });

  } catch (err) {
    console.error(err); 
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: Messages.SERVER_ERROR });
  }
};

const updateStatus = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ status: HttpStatus.NOT_FOUND, message: Messages.NOT_FOUND });
    }

    const { status } = req.body;
    if (status) user.status = status;
    const updatedUser = await user.save();

    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: Messages.SUCCESS,
      data: updatedUser,
    });
  } catch (err) {
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: Messages.SERVER_ERROR });
  }
}

const deleteUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ status: HttpStatus.NOT_FOUND, message: Messages.NOT_FOUND });
    }

    await user.deleteOne();

    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: Messages.SUCCESS,
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
  createUser,
  updateUser,
  deleteUser,
  updateStatus,
};