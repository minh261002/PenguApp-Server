import { Request, Response } from "express";
import { HttpStatus } from "~/constants/httpStatus";
import { Messages } from "~/constants/message";
import Slider from "~/models/databases/slider.model";
import SliderItem from "~/models/databases/sliderItem.model";

const getSliders = async (req: Request, res: Response): Promise<any> => {
  try {
    const sliders = await Slider.find();
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: Messages.SUCCESS,
      data: sliders,
    });
  } catch (err) {
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: HttpStatus.INTERNAL_SERVER_ERROR, message: Messages.SERVER_ERROR });
  }
}

const getSliderById = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const slider = await Slider.findById(id);
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: Messages.SUCCESS,
      data: slider,
    });
  } catch (err) {
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: HttpStatus.INTERNAL_SERVER_ERROR, message: Messages.SERVER_ERROR });
  }
}

const createSlider = async (req: Request, res: Response): Promise<any> => {
  try {
   const { name, key, description, status } = req.body;
   const slider = new Slider({ name, key, description, status });
   await slider.save();
   
   return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: Messages.SUCCESS,
      data: slider,
    });

  } catch (err) {
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: HttpStatus.INTERNAL_SERVER_ERROR, message: Messages.SERVER_ERROR });
  }
}

const updateSlider = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const { name, key, description, status } = req.body;
    const slider = await Slider.findById(id);
    if(!slider) {
      return res.status(HttpStatus.NOT_FOUND).json({
        status: HttpStatus.NOT_FOUND,
        message: Messages.NOT_FOUND,
      });
    }

    if(name) slider.name = name;
    if(key) slider.key = key;
    if(description) slider.description = description;
    if(status) slider.status = status;
    await slider.save();

    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: Messages.SUCCESS,
      data: slider,
    });

  } catch (err) {
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: HttpStatus.INTERNAL_SERVER_ERROR, message: Messages.SERVER_ERROR });
  }
}

const deleteSlider = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const slider = await Slider.findById(id);
    if(!slider) {
      return res.status(HttpStatus.NOT_FOUND).json({
        status: HttpStatus.NOT_FOUND,
        message: Messages.NOT_FOUND,
      });
    }
    await SliderItem.deleteMany({ slider_id: id });
    await slider.deleteOne();

    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: Messages.SUCCESS,
    });

  } catch (err) {
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: HttpStatus.INTERNAL_SERVER_ERROR, message: Messages.SERVER_ERROR });
  }
}

export {
  getSliders,
  getSliderById,
  createSlider,
  updateSlider,
  deleteSlider
};