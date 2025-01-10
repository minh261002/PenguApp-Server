import express from 'express';
import { getSliderItems, createSliderItem, getSliderItemById, updateSliderItem, deleteSliderItem } from '~/controllers/sliderItem.controller';
import { isAdmin } from '~/middlewares/authorization';
import { verifyToken } from '~/middlewares/verifyToken';
import  uploadFile  from '~/utils/upload';

const router = express.Router();

router.route('/').get(getSliderItems);
router.route('/').post(verifyToken, isAdmin ,uploadFile.single('image'), createSliderItem);
router.route('/:id').get(getSliderItemById);
router.route('/:id').put(uploadFile.single('image'), verifyToken, isAdmin, updateSliderItem);
router.route('/:id').delete(verifyToken, isAdmin, deleteSliderItem);

export default router;
