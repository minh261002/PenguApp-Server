import { Request, Response } from "express";
import { HttpStatus } from "~/constants/httpStatus";
import { Messages } from "~/constants/message";
import SliderItem from "~/models/databases/sliderItem.model";

const getSliderItems = async (req: Request, res: Response): Promise<any> => {
  try {
    const sliderItems = await SliderItem.find();
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: Messages.SUCCESS,
      data: sliderItems,
    });
  } catch (err) {
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: HttpStatus.INTERNAL_SERVER_ERROR, message: Messages.SERVER_ERROR });
  }
}

const getSliderItemById = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const sliderItem = await SliderItem.findById(id);
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: Messages.SUCCESS,
      data: sliderItem,
    });
  } catch (err) {
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: HttpStatus.INTERNAL_SERVER_ERROR, message: Messages.SERVER_ERROR });
  }
}

const createSliderItem = async (req: Request, res: Response): Promise<any> => {
  try {
    const { title, slider_id, href, position, image, status } = req.body;
    const sliderItem = new SliderItem({ title, slider_id, href, position, image, status });
    await sliderItem.save();
    
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: Messages.SUCCESS,
      data: sliderItem,
    });

  } catch (err) {
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: HttpStatus.INTERNAL_SERVER_ERROR, message: Messages.SERVER_ERROR });
  }
}

const updateSliderItem = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const { title, slider_id, href, position, image, status } = req.body;
    const sliderItem = await SliderItem.findById(id);
    if(!sliderItem) {
      return res.status(HttpStatus.NOT_FOUND).json({
        status: HttpStatus.NOT_FOUND,
        message: Messages.NOT_FOUND,
      });
    }

    if(title) sliderItem.title = title;
    if(slider_id) sliderItem.slider_id = slider_id;
    if(href) sliderItem.href = href;
    if(position) sliderItem.position = position;
    if(image) sliderItem.image = image;
    if(status) sliderItem.status = status;
    await sliderItem.save();

    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: Messages.SUCCESS,
      data: sliderItem,
    });
  } catch (err) {
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: HttpStatus.INTERNAL_SERVER_ERROR, message: Messages.SERVER_ERROR });
  }
}

const deleteSliderItem = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const sliderItem = await SliderItem.findById(id);
    if(!sliderItem) {
      return res.status(HttpStatus.NOT_FOUND).json({
        status: HttpStatus.NOT_FOUND,
        message: Messages.NOT_FOUND,
      });
    }
    await sliderItem.deleteOne();
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
  getSliderItems,
  getSliderItemById,
  createSliderItem,
  updateSliderItem,
  deleteSliderItem
};