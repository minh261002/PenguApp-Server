import express from 'express';
import { deleteUser, getAllUsers, getUserById, updateUser } from '~/controllers/user.controller';
import { verifyToken } from '~/middlewares/verifyToken';
import { isAdmin } from '~/middlewares/authorization';
const router = express.Router();

router.route('/').get(verifyToken,isAdmin , getAllUsers);
router.route('/:id').get(verifyToken,isAdmin, getUserById);
router.route('/:id').put(verifyToken,isAdmin, updateUser);
router.route('/:id').delete(verifyToken,isAdmin, deleteUser);

export default router;
