import express from 'express';
import {
  createPostCtrl,
  getPostsCtrl,
  getPostCtrl,
  updatePostCtrl,
  deletePostCtrl,
} from './post.controller.js';
import { protect } from '../../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.route('/').get(getPostsCtrl).post(createPostCtrl);

router
  .route('/:id')
  .get(getPostCtrl)
  .put(updatePostCtrl)
  .delete(deletePostCtrl);

export default router;
