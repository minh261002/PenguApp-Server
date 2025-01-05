import PostCatalogue from "~/models/databases/postCatalogue.model";
import { Request, Response } from "express";
import { HttpStatus } from "~/constants/httpStatus";
import { Messages } from "~/constants/message";
import { buildTree } from "~/utils/helpers";

const getAllPostCatalogues = async (req: Request, res: Response): Promise<any> => {
  try {
    const rootCategories = await PostCatalogue.find({ parent: null });

    const catalogueTree = await Promise.all(rootCategories.map(async (rootCategory) => {
      const children = await buildTree(PostCatalogue, rootCategory._id as string);
      return {
        ...rootCategory.toObject(),
        children,
      };
    }));

    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: Messages.SUCCESS,
      data: catalogueTree,
    });
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: Messages.SERVER_ERROR,
    });
  }
};

const createPostCatalogue = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name,image, description, parent, show_home, show_menu } = req.body;

    const newPostCatalogue = new PostCatalogue({  name,image, description, parent, show_home, show_menu });

    await newPostCatalogue.save();

    return res.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      message: Messages.SUCCESS,
      data: newPostCatalogue,
    });
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: Messages.SERVER_ERROR,
    });
  }
}

export { getAllPostCatalogues, createPostCatalogue };
