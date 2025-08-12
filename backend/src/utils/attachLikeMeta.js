import mongoose from 'mongoose';
import Like from '../modules/likes/like.model.js';

export const attachLikeMeta = async (items, userId) => {
  if (!items.length) return items;
  const ids = items.map((post) => post._id);

  const counts = await Like.aggregate([
    { $match: { postId: { $in: ids } } },
    { $group: { _id: '$postId', likeCount: { $sum: 1 } } },
  ]);

  const countMap = new Map(counts.map((c) => [String(c._id), c.likeCount]));

  let likedMap = new Map();
  if (userId && mongoose.isValidObjectId(userId)) {
    const liked = await Like.aggregate([
      {
        $match: {
          postId: { $in: ids },
          userId: new mongoose.Types.ObjectId(userId),
        },
      },
      { $group: { _id: '$postId' } },
    ]);
    likedMap = new Map(liked.map((l) => [String(l._id), true]));
  }

  return items.map((p) => ({
    ...p,
    likeCount: countMap.get(String(p._id)) ?? 0,
    liked: likedMap.get(String(p._id)) ?? false,
  }));
};
