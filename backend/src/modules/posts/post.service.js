import Post from './post.model.js';
import Like from '../likes/like.model.js';
import { cloudinary } from '../../utils/cloudinary.js';
import { attachLikeMeta } from '../../utils/attachLikeMeta.js';

export const createPost = async ({ title, content, author, cover }) => {
  const post = { title, content, author };
  if (cover) post.cover = cover;
  const created = await Post.create(post);
  await created.populate('author', 'username');
  return created.toObject();
};

export const getAllPosts = async (includeLike, userId) => {
  let items = await Post.find(
    {},
    'title content author cover createdAt updatedAt'
  )
    .sort({ createdAt: -1 })
    .populate('author', 'username')
    .lean();
  if (includeLike) items = await attachLikeMeta(items, userId);
  return items;
};

export const getPostsByAuthor = async (authorId, includeLike, userId) => {
  let items = await Post.find(
    { author: authorId },
    'title content author cover createdAt updatedAt'
  )
    .sort({ createdAt: -1 })
    .populate('author', 'username')
    .lean();
  if (includeLike) items = await attachLikeMeta(items, userId);
  return items;
};

export const getPostById = async (id) => {
  return await Post.findById(id).populate('author', 'username').lean();
};

export const getPaginatedPosts = async ({
  limit = 12,
  cursor,
  authorId,
  includeLike,
  userId,
}) => {
  const query = {};
  if (authorId) query.author = authorId;
  if (cursor) query.createdAt = { $lt: new Date(cursor) };

  let items = await Post.find(
    query,
    'title content author cover createdAt updatedAt'
  )
    .sort({ createdAt: -1 })
    .limit(limit + 1)
    .populate('author', 'username')
    .lean();

  const hasMore = items.length > limit;
  if (hasMore) items.pop();

  if (includeLike) items = await attachLikeMeta(items, userId);

  const nextCursor = hasMore
    ? items[items.length - 1].createdAt.toISOString()
    : null;
  return { items, nextCursor, hasMore };
};

export const updatePost = async (
  id,
  userId,
  { title, content, cover, removeCover }
) => {
  const post = await Post.findOne({ _id: id, author: userId });
  if (!post) {
    const error = new Error('Post not found or not authorized to update');
    error.status = 403;
    throw error;
  }

  if (typeof title === 'string') post.title = title;
  if (typeof content === 'string') post.content = content;
  if (removeCover && post.cover?.publicId) {
    try {
      await cloudinary.uploader.destroy(post.cover.publicId);
    } catch {}
    post.cover = undefined;
  }
  if (cover) {
    if (post.cover?.publicId) {
      try {
        await cloudinary.uploader.destroy(post.cover.publicId);
      } catch {}
    }
    post.cover = cover;
  }

  await post.save();
  await post.populate('author', 'username');
  return post.toObject();
};

export const deletePost = async (id, userId) => {
  const deleted = await Post.findOneAndDelete({ _id: id, author: userId });
  if (!deleted) {
    const err = new Error('Not authorized or post not found');
    err.statusCode = 403;
    throw err;
  }
  try {
    await Like.deleteMany({ postId: id });
  } catch (error) {}
  return;
};
