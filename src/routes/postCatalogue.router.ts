import express from 'express';
import { getAllPostCatalogues, createPostCatalogue } from '~/controllers/postCatalogue.controller';
import { isAdmin } from '~/middlewares/authorization';
import { verifyToken } from '~/middlewares/verifyToken';
import  uploadFile  from '~/utils/upload';

const router = express.Router();

router.route('/').get(getAllPostCatalogues);
router.route('/').post(verifyToken, isAdmin ,uploadFile.single('image'), createPostCatalogue);


export default router;
