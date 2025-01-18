import express from 'express';
import { getAllPosts, createPost, getPostById, updatePost, deletePost } from '~/controllers/post.controller';
import { isAdmin } from '~/middlewares/authorization';
import { verifyToken } from '~/middlewares/verifyToken';

const router = express.Router();

router.route('/').get(getAllPosts);
router.route('/').post(verifyToken, isAdmin, createPost);
router.route('/:id').get(getPostById);
router.route('/:id').put(verifyToken, isAdmin, updatePost);
router.route('/:id').delete(verifyToken, isAdmin, deletePost);

export default router;
