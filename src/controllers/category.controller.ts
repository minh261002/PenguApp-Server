
import { Request, Response } from "express";
import { HttpStatus } from "~/constants/httpStatus";
import { Messages } from "~/constants/message";
import { createSlug } from "~/utils/helpers";
import Category from "~/models/databases/category";

const getAllCategories = async (req: Request, res: Response): Promise<any> => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });

    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: Messages.SUCCESS,
      data: categories,
    });
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: Messages.SERVER_ERROR,
    });
  }
};

const getCategoryById = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(HttpStatus.NOT_FOUND).json({
        status: HttpStatus.NOT_FOUND,
        message: Messages.NOT_FOUND,
      });
    }

    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: Messages.SUCCESS,
      data: category,
    });
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: Messages.SERVER_ERROR,
    });
  }
}

const createCategory = async (req: Request, res: Response): Promise<any> => {
  try {
    let { name, image, description, show_home, show_menu } = req.body;

    if (!name) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        message: Messages.REQUIRED_FIELDS_MISSING,
      });
    }

    if(!image){
      image = 'https://res.cloudinary.com/doy3slx9i/image/upload/v1735367389/Pengu/not-found_y7uha7.jpg';
    }

    const slug = createSlug(name);

    const newCategory = new Category({
      name,
      slug,
      image,
      description,
      show_home,
      show_menu,
    });

    await newCategory.save();

    return res.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      message: Messages.SUCCESS,
      data: newCategory,
    });
  } catch (error) {
    console.error('Error creating post catalogue:', error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: Messages.SERVER_ERROR,
    });
  }
};

const updateCategory = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const { name, description, show_home, show_menu, status } = req.body;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(HttpStatus.NOT_FOUND).json({
        status: HttpStatus.NOT_FOUND,
        message: Messages.NOT_FOUND,
      });
    }

    if(name) category.name = name;
    if(name) category.slug = createSlug(name);
    if(description) category.description = description;
    if(show_home) category.show_home = show_home;
    if(show_menu) category.show_menu = show_menu;
    if(status) category.status = status;
    
    const newCategory = await category.save();

    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: Messages.SUCCESS,
      data: newCategory,
    });

  } catch (error) {
    console.error('Error updating post catalogue:', error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: Messages.SERVER_ERROR,
    });
  }
}

const deleteCategory = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(HttpStatus.NOT_FOUND).json({
        status: HttpStatus.NOT_FOUND,
        message: Messages.NOT_FOUND,
      });
    }

    await category.deleteOne();

    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: Messages.SUCCESS,
    });
  } catch (error) {
    console.error('Error deleting post catalogue:', error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: Messages.SERVER_ERROR,
    });
  }
}

const updateStatusCategory = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(HttpStatus.NOT_FOUND).json({
        status: HttpStatus.NOT_FOUND,
        message: Messages.NOT_FOUND,
      });
    }

    if(status) category.status = status;

    const newCategory = await category.save();

    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: Messages.SUCCESS,
      data: newCategory,
    });

  } catch (error) {
    console.error('Error updating post catalogue:', error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: Messages.SERVER_ERROR,
    });
  }
}

export{
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  updateStatusCategory
}