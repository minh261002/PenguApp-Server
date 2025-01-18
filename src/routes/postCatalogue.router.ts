import express from 'express';
import { getAllPostCatalogues, createPostCatalogue, getPostCatalogueById, updatePostCatalogue,updateStatusPostCatalogue, deletePostCatalogue } from '~/controllers/postCatalogue.controller';
import { isAdmin } from '~/middlewares/authorization';
import { verifyToken } from '~/middlewares/verifyToken';

const router = express.Router();

router.route('/').get(getAllPostCatalogues);
router.route('/').post(verifyToken, isAdmin , createPostCatalogue);
router.route('/:id').get(getPostCatalogueById);
router.route('/:id').put( verifyToken, isAdmin, updatePostCatalogue);
router.route('/:id/status').patch(verifyToken, isAdmin, updateStatusPostCatalogue);
router.route('/:id').delete(verifyToken, isAdmin, deletePostCatalogue);

export default router;
