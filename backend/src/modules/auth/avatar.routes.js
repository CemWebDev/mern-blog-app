import express from 'express';
import { protect } from '../../middleware/auth.js';
import User from './auth.model.js';
import { uploadAvatar } from '../../middleware/upload.js';

const router = express.Router();

router.post('/me', protect, uploadAvatar, async (req, res, next) => {
  try {
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
