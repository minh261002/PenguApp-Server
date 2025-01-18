import express from 'express';
import { getSliderItems, createSliderItem, getSliderItemById, updateSliderItem, deleteSliderItem } from '~/controllers/sliderItem.controller';
import { isAdmin } from '~/middlewares/authorization';
import { verifyToken } from '~/middlewares/verifyToken';

const router = express.Router();

router.route('/').get(getSliderItems);
router.route('/').post(verifyToken, isAdmin , createSliderItem);
router.route('/:id').get(getSliderItemById);
router.route('/:id').put( verifyToken, isAdmin, updateSliderItem);
router.route('/:id').delete(verifyToken, isAdmin, deleteSliderItem);

export default router;
