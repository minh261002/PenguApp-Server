import Province from "~/models/databases/province.model";
import District from "~/models/databases/district.model";
import Ward from "~/models/databases/ward.model";
import { Request, Response } from "express";
import { HttpStatus } from "~/constants/httpStatus";
import { Messages } from "~/constants/message";

const getPronvinces = async (req: Request, res: Response): Promise<any> => {
  try {
    const provinces = await Province.find();
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: Messages.SUCCESS,
      data: provinces,
    });
  } catch (err) {
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: HttpStatus.INTERNAL_SERVER_ERROR, message: Messages.SERVER_ERROR });
  }
}

const getDistrictsByProvinceId = async (req: Request, res: Response): Promise<any> => {
  try {
    const { provinceCode } = req.params;
    const districts = await District.find
      ({ parent_code: provinceCode });
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: Messages.SUCCESS,
      data: districts,
    });
  } catch (err) {
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: HttpStatus.INTERNAL_SERVER_ERROR, message: Messages.SERVER_ERROR });
  }
}

const getWardsByDistrictId = async (req: Request, res: Response): Promise<any> => {
  try {
    const { districtCode } = req.params;
    const wards = await Ward.find
      ({ parent_code: districtCode });
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: Messages.SUCCESS,
      data: wards,
    });
  } catch (err) {
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: HttpStatus.INTERNAL_SERVER_ERROR, message: Messages.SERVER_ERROR });
  }
}

export {
  getPronvinces,
  getDistrictsByProvinceId,
  getWardsByDistrictId
};