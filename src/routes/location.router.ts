import express from 'express';
import { getDistrictsByProvinceId, getPronvinces, getWardsByDistrictId } from '~/controllers/location.controller';
const router = express.Router();

router.route('/province').get(getPronvinces);
router.route('/district/:provinceCode').get(getDistrictsByProvinceId);
router.route('/ward/:districtCode').get(getWardsByDistrictId);

export default router;
