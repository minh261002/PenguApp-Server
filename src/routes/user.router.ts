import express from 'express';
import { createUser, deleteUser, getAllUsers, getUserById, updateUser, updateStatus } from '~/controllers/user.controller';
import { verifyToken } from '~/middlewares/verifyToken';
import { isAdmin } from '~/middlewares/authorization';
import uploadFile from '~/utils/upload';
const router = express.Router();

router.route('/').get(verifyToken,isAdmin , getAllUsers);
router.route('/:id').get(verifyToken,isAdmin, getUserById);
router.route('/').post(verifyToken,isAdmin, uploadFile.single('file'), createUser);
router.route('/:id').put(verifyToken,isAdmin, updateUser);
router.route('/:id').delete(verifyToken,isAdmin, deleteUser);
router.route('/:id/status').patch(verifyToken,isAdmin, updateStatus);

export default router;
