import multer from "multer";

import { coverStorage } from "../utils/cloudinary.js";

export const uploadCover = multer({ storage: coverStorage }).single("cover");