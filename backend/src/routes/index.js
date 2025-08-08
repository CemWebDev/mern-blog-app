import express from 'express';
import authRoutes from '../modules/auth/auth.routes.js';
import postsRoutes from '../modules/posts/post.routes.js';
import avatarRoutes from '../modules/auth/avatar.routes.js';
import userRoutes from '../modules/users/user.routes.js';
const router = express.Router();

router.use('/auth', authRoutes);
router.use('/posts', postsRoutes);
router.use('/avatar', avatarRoutes);
router.use('/users', userRoutes);

export default router;
