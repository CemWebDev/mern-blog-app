import { createCtrl } from '../../utils/controllerFactory.js';
import * as postService from './post.service.js';

export const createPostCtrl = createCtrl(async (body, params, query, req) => {
  return await postService.createPost({
    title: body.title,
    content: body.content,
    author: req.user.id,
  });
}, 201);

export const getPostsCtrl = createCtrl(() => postService.getAllPosts());
export const getPostCtrl = createCtrl((_, params) =>
  postService.getPostById(params.id)
);
export const updatePostCtrl = createCtrl((_, params, __, req) =>
  postService.updatePost(params.id, req.body)
);

export const deletePostCtrl = createCtrl(
  (_, params) => postService.deletePost(params.id),
  204
);
