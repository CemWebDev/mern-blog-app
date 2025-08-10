import { createCtrl } from '../../utils/controllerFactory.js';
import * as postService from './post.service.js';

const mapCover = (file) =>
  file
    ? {
        url: file.path,
        publicId: file.filename,
        width: file.width,
        height: file.height,
        format: file.format,
      }
    : undefined;

export const createPostCtrl = createCtrl(async (body, _p, _q, req) => {
  return await postService.createPost({
    title: body.title,
    content: body.content,
    author: req.user.id,
    cover: mapCover(req.file),
  });
}, 201);

export const getPostsCtrl = createCtrl((_b, _p, query, req) => {
  const { scope, authorId } = query;

  if (scope === 'mine') {
    if (!req.user?.id) {
      throw new Error('Unauthorized access to personal posts');
    }
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

export const updatePostCtrl = createCtrl(async (body, params, _q, req) => {
  return postService.updatePost(params.id, req.user.id, {
    title: body.title,
    content: body.content,
    cover: mapCover(req.file), 
    removeCover: body.removeCover === '1' || body.removeCover === true, 
  });
});

export const deletePostCtrl = createCtrl(
  (_b, params, _q, req) => postService.deletePost(params.id, req.user.id),
  204
);
