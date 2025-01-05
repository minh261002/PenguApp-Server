import express from 'express';
import authRouter from './auth.router';
import userRouter from './user.router';
import locationRouter from './location.router';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/location', locationRouter);

export default router;