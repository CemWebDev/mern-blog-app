import User from '../auth/auth.model.js';
import Post from '../posts/post.model.js';

export const getStats = async (req, res) => {
  const models = [User, Post];

  const stats = {};
  for (const model of models) {
    const count = await model.countDocuments();
    stats[model.modelName] = count;
  }

  return stats;
};
