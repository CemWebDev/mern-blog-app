import { createCtrl } from "../../utils/controllerFactory.js";
import { getMe, updateMe } from "./user.service.js";

export const getMeCtrl = createCtrl(getMe);
export const updateMeCtrl = createCtrl(updateMe);