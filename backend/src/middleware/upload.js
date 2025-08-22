import multer from 'multer';
import { createStorage } from '../utils/cloudinary.js';

export const uploadAvatar = multer({
  storage: createStorage({
    folder: 'avatars',
    formats: ['jpg', 'png'],
    transformation: [{ width: 150, height: 150, crop: 'fill' }],
  }),
}).single('avatar');

export const uploadCover = multer({
  storage: createStorage({
    folder: 'post-covers',
    formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [
      {
        width: 1200,
        height: 630,
        crop: 'fill',
        gravity: 'auto',
        quality: 'auto',
      },
    ],
  }),
}).single('cover');
