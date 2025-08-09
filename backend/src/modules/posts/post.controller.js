import { createCtrl } from '../../utils/controllerFactory.js';
import * as postService from './post.service.js';

export const createPostCtrl = createCtrl(async (body, _p, _q, req) => {
  return await postService.createPost({
    title: body.title,
    content: body.content,
    author: req.user.id,
  });
}, 201);

export const getPostsCtrl = createCtrl((_b, _p, query, req) => {
  const { scope, authorId } = query;

  if (scope === 'mine') {
    return postService.getPostsByAuthor(req.user.id);
  }
  if (authorId) {
    return postService.getPostsByAuthor(authorId);
  }
  return postService.getAllPosts();
});

export const getPostCtrl = createCtrl((_b, params) =>
  postService.getPostById(params.id)
);

export const updatePostCtrl = createCtrl((_b, params, _q, req) =>
  postService.updatePost(params.id, req.user.id, req.body)
);

export const deletePostCtrl = createCtrl(
  (_b, params, _q, req) => postService.deletePost(params.id, req.user.id),
  204
);
