import express, { Router } from 'express';
import authRouter from './auth.router';
import userRouter from './user.router';
import locationRouter from './location.router';
import postCatalogueRouter from './postCatalogue.router';
import postRouter from './post.router';
import categoryRouter from './category.router';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/location', locationRouter);
router.use('/post-catalogue', postCatalogueRouter);
router.use('/post', postRouter);
router.use('/category', categoryRouter);

export default router;