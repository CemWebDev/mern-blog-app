import express from 'express';
import multer from 'multer';
import { protect } from '../../middleware/auth.js';
import { storage } from '../../utils/cloudinary.js';
import User from './auth.model.js';

const router = express.Router();
const upload = multer({ storage });

console.log('Avatar routes initialized');


router.post('/me', protect, upload.single('avatar'), async (req, res, next) => {
  try {
    console.log(req.user)
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.avatarUrl = req.file.path;
    await user.save();
    res.status(200).json({ avatarUrl: user.avatarUrl });
  } catch (err) {
    next(err);
  }
});

export default router;
