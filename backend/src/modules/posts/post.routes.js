import express from 'express';
import {
  createPostCtrl,
  getPostsCtrl,
  getPostCtrl,
  updatePostCtrl,
  deletePostCtrl,
  likePostCtrl,
  unlikePostCtrl,
  likeMetaCtrl,
  getLikedPostsCtrl,
} from './post.controller.js';
import { protect } from '../../middleware/auth.js';
import { uploadCover } from '../../middleware/upload.js';
import { optionalAuth } from '../../middleware/optionalAuth.js';

const router = express.Router();

router.get('/', optionalAuth, getPostsCtrl);

router.get('/liked', protect, getLikedPostsCtrl);

router.get('/:id/like/meta', optionalAuth, likeMetaCtrl);
router.put('/:id/like', protect, likePostCtrl);
router.delete('/:id/like', protect, unlikePostCtrl);

router.get('/:id', optionalAuth, getPostCtrl);
router.post('/', protect, uploadCover, createPostCtrl);
router.put('/:id', protect, uploadCover, updatePostCtrl);
router.delete('/:id', protect, deletePostCtrl);

export default router;
