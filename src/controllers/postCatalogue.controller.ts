import PostCatalogue from "~/models/databases/postCatalogue.model";
import { Request, Response } from "express";
import { HttpStatus } from "~/constants/httpStatus";
import { Messages } from "~/constants/message";
import { buildTree,createSlug } from "~/utils/helpers";

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

const getPostCatalogueById = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;

    const postCatalogue = await PostCatalogue.findById(id);

    if (!postCatalogue) {
      return res.status(HttpStatus.NOT_FOUND).json({
        status: HttpStatus.NOT_FOUND,
        message: Messages.NOT_FOUND,
      });
    }

    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: Messages.SUCCESS,
      data: postCatalogue,
    });
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: Messages.SERVER_ERROR,
    });
  }
}

const createPostCatalogue = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, description, parent, show_home, show_menu } = req.body;

    if (!name) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        message: Messages.REQUIRED_FIELDS_MISSING,
      });
    }

    const slug = createSlug(name);

    let image: string | undefined;
    if (req.file) {
      const file = req.file as Express.Multer.File;
      image = file.filename;
    }

    const newPostCatalogue = new PostCatalogue({
      name,
      slug,
      image,
      description,
      parent,
      show_home,
      show_menu,
    });

    await newPostCatalogue.save();

    return res.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      message: Messages.SUCCESS,
      data: newPostCatalogue,
    });
  } catch (error) {
    console.error('Error creating post catalogue:', error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: Messages.SERVER_ERROR,
    });
  }
};

const updatePostCatalogue = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const { name, description, parent, show_home, show_menu } = req.body;

    const postCatalogue = await PostCatalogue.findById(id);

    if (!postCatalogue) {
      return res.status(HttpStatus.NOT_FOUND).json({
        status: HttpStatus.NOT_FOUND,
        message: Messages.NOT_FOUND,
      });
    }

    if(name) postCatalogue.name = name;
    if(name) postCatalogue.slug = createSlug(name);
    if(description) postCatalogue.description = description;
    if(parent) postCatalogue.parent = parent;
    if(show_home) postCatalogue.show_home = show_home;
    if(show_menu) postCatalogue.show_menu = show_menu;

    const newPostCatalogue = await postCatalogue.save();

    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: Messages.SUCCESS,
      data: newPostCatalogue,
    });

  } catch (error) {
    console.error('Error updating post catalogue:', error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: Messages.SERVER_ERROR,
    });
  }
}

const deletePostCatalogue = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;

    const postCatalogue = await PostCatalogue.findById(id);

    if (!postCatalogue) {
      return res.status(HttpStatus.NOT_FOUND).json({
        status: HttpStatus.NOT_FOUND,
        message: Messages.NOT_FOUND,
      });
    }

    //xoá tất cả các bài viết thuộc danh mục này và danh mục con và các bài viết của danh mục con
    // delete all posts belong to this category and its children categories

    await postCatalogue.deleteOne();

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

const updateStatusPostCatalogue = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const postCatalogue = await PostCatalogue.findById(id);

    if (!postCatalogue) {
      return res.status(HttpStatus.NOT_FOUND).json({
        status: HttpStatus.NOT_FOUND,
        message: Messages.NOT_FOUND,
      });
    }

    if(status) postCatalogue.status = status;

    const newPostCatalogue = await postCatalogue.save();

    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: Messages.SUCCESS,
      data: newPostCatalogue,
    });

  } catch (error) {
    console.error('Error updating post catalogue:', error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: Messages.SERVER_ERROR,
    });
  }
}

export { getAllPostCatalogues, createPostCatalogue, getPostCatalogueById, updatePostCatalogue, deletePostCatalogue,updateStatusPostCatalogue };
