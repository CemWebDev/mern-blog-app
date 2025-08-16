import { getStats } from './stats.service.js';
import { createCtrl } from '../../utils/controllerFactory.js';

export const statsCtrl = createCtrl(getStats);
