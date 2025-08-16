import { Router } from 'express';
import { statsCtrl } from './stats.controller.js';

const router = Router();

router.get('/', statsCtrl);

export default router;
