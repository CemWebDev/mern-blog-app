import { createCtrl } from '../../utils/controllerFactory.js';
import * as postService from './post.service.js';
import * as likeService from '../likes/like.service.js';

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
  const { scope, authorId, limit, cursor, includeLike } = query;
  const inc = includeLike === '1' || includeLike === 'true';
  const common = { includeLike: inc, userId: req.user?.id };

  if (scope === 'mine') {
    if (!req.user?.id) throw new Error('Unauthorized access to personal posts');
    if (limit)
      return postService.getPaginatedPosts({
        limit: Number(limit),
        cursor,
        authorId: req.user.id,
        ...common,
      });
    return postService.getPostsByAuthor(req.user.id, inc, req.user.id);
  }

  if (authorId) {
    if (limit)
      return postService.getPaginatedPosts({
        limit: Number(limit),
        cursor,
        authorId,
        ...common,
      });
    return postService.getPostsByAuthor(authorId, inc, req.user?.id);
  }

  if (limit)
    return postService.getPaginatedPosts({
      limit: Number(limit),
      cursor,
      ...common,
    });
  return postService.getAllPosts(inc, req.user?.id);
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

export const likePostCtrl = createCtrl(async (_b, params, _q, req) => {
  const { id: postId } = params;
  await likeService.likePost(postId, req.user.id);
  return { ok: true };
});

export const unlikePostCtrl = createCtrl(async (_b, params, _q, req) => {
  const { id: postId } = params;
  await likeService.unlikePost(postId, req.user.id);
  return { ok: true };
});

export const likeMetaCtrl = createCtrl(async (_b, params, _q, req) => {
  const { id: postId } = params;
  return likeService.getLikeMeta(postId, req.user?.id);
});

export const getLikedPostsCtrl = createCtrl(
  async (body, params, query, req) => {
    const posts = await likeService.getLikedPosts(req.user.id);
    return posts;
  }
);
