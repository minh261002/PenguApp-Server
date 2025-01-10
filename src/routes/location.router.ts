import express from 'express';
import { getDistrictsByProvinceId, getPronvinces, getWardsByDistrictId } from '~/controllers/location.controller';
const router = express.Router();

router.route('/provinces').get(getPronvinces);
router.route('/districts/:provinceCode').get(getDistrictsByProvinceId);
router.route('/wards/:districtCode').get(getWardsByDistrictId);

export default router;
