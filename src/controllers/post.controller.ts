import { Request, Response } from "express";
import { HttpStatus } from "~/constants/httpStatus";
import { Messages } from "~/constants/message";
import Post  from "~/models/databases/post.model";
import { createSlug } from "~/utils/helpers";

const getAllPosts = async (req: Request, res: Response): Promise<any> => {
  try {
    const posts = await Post.find();

    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: Messages.SUCCESS,
      data: posts,
    });
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: Messages.SERVER_ERROR,
    });
  }
};

const getPostById = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(HttpStatus.NOT_FOUND).json({
        status: HttpStatus.NOT_FOUND,
        message: Messages.NOT_FOUND,
      });
    }

    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: Messages.SUCCESS,
      data: post,
    });
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: Messages.SERVER_ERROR,
    });
  }
}

const createPost = async (req: Request, res: Response): Promise<any> => {
  try {
    const { title, category_id, image, content, is_featured, status } = req.body;
    const slug = createSlug(title);
    const post = new Post({
      title,
      category_id,
      slug,
      image,
      content,
      is_featured,
      status,
    });

    await post.save();

    return res.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      message: Messages.SUCCESS,
      data: post,
    });
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: Messages.SERVER_ERROR,
    });
  }
}

const updatePost = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const { title, category_id, image, content, is_featured, status } = req.body;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(HttpStatus.NOT_FOUND).json({
        status: HttpStatus.NOT_FOUND,
        message: Messages.NOT_FOUND,
      });
    }

    if(title) post.title = title;
    if(title) post.slug = createSlug(title);
    if(category_id) post.category_id = category_id;
    if(image) post.image = image;
    if(content) post.content = content;
    if(is_featured) post.is_featured = is_featured;
    if(status) post.status = status;

    const newPost = await post.save();

    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: Messages.SUCCESS,
      data: newPost,
    });

  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: Messages.SERVER_ERROR,
    });
  }
}

const deletePost = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(HttpStatus.NOT_FOUND).json({
        status: HttpStatus.NOT_FOUND,
        message: Messages.NOT_FOUND,
      });
    }

    await post.deleteOne();

    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: Messages.SUCCESS,
    });

  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: Messages.SERVER_ERROR,
    });
  }
}

export {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};