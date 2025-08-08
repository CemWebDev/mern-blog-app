import express from 'express';
import { protect } from '../../middleware/auth.js';
import { getMeCtrl, updateMeCtrl } from './user.controller.js';

const router = express.Router();

router.use(protect);

router.route('/me').get(getMeCtrl).put(updateMeCtrl);

export default router;
