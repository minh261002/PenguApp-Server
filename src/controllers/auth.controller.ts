import User from "~/models/databases/user.model";
import { Request, Response } from "express";
import { UserRole, UserStatus } from "~/constants/enum";
import { compareSync, hashSync } from "bcrypt";
import { HttpStatus } from "~/constants/httpStatus";
import {Messages} from "~/constants/message";
import { generateTokens } from "~/utils/jwt";
import { JwtPayload, verify } from "jsonwebtoken";

const Login = async (req: Request, res: Response): Promise<any> => {
  try{
    const { email, password } = req.body;
    const user = await User.findOne({email});

    if (!user) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: Messages.LOGIN_FAILED });
    }

    if (user.status === UserStatus.INACTIVE) {
      return res.status(HttpStatus.FORBIDDEN).json({ message: Messages.ACCOUNT_INACTIVE });
    }else if(user.status === UserStatus.BLOCK){
      return res.status(HttpStatus.FORBIDDEN).json({ message: Messages.ACCOUNT_LOCKED });
    }

    const isPasswordValid = compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(HttpStatus.FORBIDDEN).json({ message: Messages.LOGIN_FAILED });
    }

    const payload = { id: user.id, role: user.role };
    const tokens = generateTokens(payload);

    user.refresh_token = tokens.refreshToken;
    await user.save();

    return res.status(HttpStatus.OK).json({status:HttpStatus.OK, message: Messages.LOGIN_SUCCESS, tokens });
  }catch(err){
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: Messages.SERVER_ERROR});
  }
};

const RefreshToken = async (req: Request, res: Response): Promise<any> => {
  try{
    const refreshToken = req.body.refreshToken;
    // console.log(refreshToken);
    if (!refreshToken) {
      return res.status(HttpStatus.BAD_REQUEST).json({status:HttpStatus.BAD_REQUEST, message: Messages.REFRESH_TOKEN_REQUIRED });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({status: HttpStatus.INTERNAL_SERVER_ERROR, message: Messages.SERVER_ERROR });
    }
    
    const payload = verify(refreshToken, jwtSecret);
    const user = await User.findById((payload as JwtPayload).id);

    if (!user) {
      return res.status(HttpStatus.NOT_FOUND).json({status: HttpStatus.NOT_FOUND, message: Messages.ACCOUNT_NOT_FOUND });
    }

    if (user.refresh_token !== refreshToken) {
      return res.status(HttpStatus.UNAUTHORIZED).json({status: HttpStatus.UNAUTHORIZED, message: Messages.REFRESH_TOKEN_INVALID });
    }

    const newTokens = generateTokens({ id: user.id, role: user.role });
    user.refresh_token = newTokens.refreshToken;
    await user.save();

    return res.status(HttpStatus.OK).json({status:HttpStatus.OK,  message: Messages.TOKEN_REFRESHED, tokens: newTokens });
  }catch(err){
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: Messages.SERVER_ERROR});
  }
};

const Register = async (req: Request, res: Response): Promise<any> => {
  try{
    const {name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(HttpStatus.CONFLICT).json({ message: Messages.EMAIL_EXISTS });
    }

    const hashedPassword = hashSync(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role: UserRole.USER });
    await newUser.save();

    return res.status(HttpStatus.CREATED).json({status:HttpStatus.OK,  message: Messages.REGISTRATION_SUCCESS });
  }catch(err){
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: Messages.SERVER_ERROR});
  }
}

const Me = async (req: Request, res: Response): Promise<any> => {
  try {
    if (!req.user.id) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: Messages.UNAUTHORIZED });
    }

    const user = await User.findById(req.user.id);
  console.log(user);    
    if (!user) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: Messages.ACCOUNT_NOT_FOUND });
    }

    const userResponse = {
      name: user.name,
      avatar: user.avatar,
      role: user.role,
    }

    return res.status(HttpStatus.OK).json({ status: HttpStatus.OK, userResponse });
  } catch (err) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: Messages.SERVER_ERROR });
  }
}

export { Login, Register, RefreshToken, Me };