import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const avatarStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'avatars',
    allowedFormats: ['jpg', 'png'],
    transformation: [{ width: 150, height: 150, crop: 'fill' }],
  },
});

export const coverStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'post-covers',
    allowedFormats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [
      {
        width: 1200,
        height: 630,
        crop: 'fill',
        gravity: 'auto',
        quality: 'auto',
      },
    ],
  },
});

export { cloudinary };