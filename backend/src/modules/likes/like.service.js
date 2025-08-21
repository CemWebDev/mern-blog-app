import mongoose from 'mongoose';
import Like from './like.model.js';
import Post from '../posts/post.model.js';

export const ensurePostExists = async (postId) => {
  if (!mongoose.isValidObjectId(postId)) {
    const err = new Error('Invalid post id');
    err.status = 400;
    throw err;
  }
  const exists = await Post.exists({ _id: postId });
  if (!exists) {
    const err = new Error('Post not found');
    err.status = 404;
    throw err;
  }
};

export const likePost = async (postId, userId) => {
  await ensurePostExists(postId);
  await Like.updateOne(
    { postId, userId },
    { $setOnInsert: { postId, userId } },
    { upsert: true }
  );
  return { ok: true };
};

export const unlikePost = async (postId, userId) => {
  await ensurePostExists(postId);
  await Like.deleteOne({ postId, userId });
  return { ok: true };
};

export const getLikeMeta = async (postId, userId) => {
  await ensurePostExists(postId);
  const [likeCount, mine] = await Promise.all([
    Like.countDocuments({ postId }),
    userId ? Like.exists({ postId, userId }) : Promise.resolve(null),
  ]);
  return { likeCount, liked: !!mine };
};

export const getLikedPosts = async (userId) => {
  const likes = await Like.find({ userId }).select('postId');
  const postIds = likes.map((like) => like.postId);

  const posts = await Post.find({ _id: { $in: postIds } })
    .populate('author', 'username')
    .lean();

  const postsWithMeta = await Promise.all(
    posts.map(async (post) => {
      const likeCount = await Like.countDocuments({ postId: post._id });
      return {
        ...post,
        likeCount,
        liked: true,
      };
    })
  );

  return postsWithMeta
};
