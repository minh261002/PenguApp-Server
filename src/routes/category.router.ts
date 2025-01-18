import express from 'express';
import { getAllCategories, createCategory, getCategoryById, updateCategory,updateStatusCategory, deleteCategory } from '~/controllers/category.controller';
import { isAdmin } from '~/middlewares/authorization';
import { verifyToken } from '~/middlewares/verifyToken';

const router = express.Router();

router.route('/').get(getAllCategories);
router.route('/').post(verifyToken, isAdmin , createCategory);
router.route('/:id').get(getCategoryById);
router.route('/:id').put( verifyToken, isAdmin, updateCategory);
router.route('/:id/status').patch(verifyToken, isAdmin, updateStatusCategory);
router.route('/:id').delete(verifyToken, isAdmin, deleteCategory);

export default router;
