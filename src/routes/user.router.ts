import express from 'express';
import { getAllUsers, getUserById } from '~/controllers/user.controller';
import { verifyToken } from '~/middlewares/verifyToken';
import { isAdmin } from '~/middlewares/authorization';
const router = express.Router();

router.route('/').get(verifyToken,isAdmin , getAllUsers);
router.route('/:id').get(verifyToken,isAdmin, getUserById);

export default router;
