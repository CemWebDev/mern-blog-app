import { register, login } from './auth.service.js';
import { createCtrl } from '../../utils/controllerFactory.js';

export const registerCtrl = createCtrl(register, 201);
export const loginCtrl = createCtrl(login);
