import express from 'express';
import { Login, Register, RefreshToken, Me } from '~/controllers/auth.controller';
import { verifyToken } from '~/middlewares/verifyToken';
const router = express.Router();

router.route('/login').post(Login);
router.route('/register').post(Register);
router.route('/refresh-token').post(verifyToken, RefreshToken);
router.route('/me').get(verifyToken, Me);

export default router;
