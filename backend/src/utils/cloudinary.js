import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const createStorage = ({ folder, formats, transformation }) => {
  return new CloudinaryStorage({
    cloudinary,
    params: {
      folder,
      allowed_formats: formats,
      transformation,
    },
  });
};

export { cloudinary };
