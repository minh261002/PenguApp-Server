import express from 'express';
import { getAllPostCatalogues, createPostCatalogue, getPostCatalogueById, updatePostCatalogue, deletePostCatalogue } from '~/controllers/postCatalogue.controller';
import { isAdmin } from '~/middlewares/authorization';
import { verifyToken } from '~/middlewares/verifyToken';
import  uploadFile  from '~/utils/upload';

const router = express.Router();

router.route('/').get(getAllPostCatalogues);
router.route('/').post(verifyToken, isAdmin ,uploadFile.single('image'), createPostCatalogue);
router.route('/:id').get(getPostCatalogueById);
router.route('/:id').put(uploadFile.single('image'), verifyToken, isAdmin, updatePostCatalogue);
router.route('/:id').delete(verifyToken, isAdmin, deletePostCatalogue);

export default router;
