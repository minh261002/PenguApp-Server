import express from 'express';
import { getSliders, createSlider, getSliderById, updateSlider, deleteSlider } from '~/controllers/slider.controller';
import { isAdmin } from '~/middlewares/authorization';
import { verifyToken } from '~/middlewares/verifyToken';
import  uploadFile  from '~/utils/upload';

const router = express.Router();

router.route('/').get(getSliders);
router.route('/').post(verifyToken, isAdmin ,uploadFile.single('image'), createSlider);
router.route('/:id').get(getSliderById);
router.route('/:id').put(uploadFile.single('image'), verifyToken, isAdmin, updateSlider);
router.route('/:id').delete(verifyToken, isAdmin, deleteSlider);

export default router;
