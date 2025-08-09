import Post from './post.model.js';

export const createPost = async ({ title, content, author }) => {
  return await Post.create({ title, content, author });
};

export const getAllPosts = async () => {
  return await Post.find()
    .sort({ createdAt: -1 })
    .populate('author', 'username');
};

export const getPostsByAuthor = async (authorId) => {
  return await Post.find({ author: authorId })
    .sort({ createdAt: -1 })
    .populate('author', 'username');
};

export const getPostById = async (id) => {
  return await Post.findById(id).populate('author', 'username');
};

export const updatePost = async (id, userId, { title, content }) => {
  const updated = await Post.findByIdAndUpdate(
    { _id: id, author: userId },
    { title, content },
    { new: true }
  );
  if (!updated) {
    const error = new Error('Post not found or not authorized to update');
    error.status = 403;
    throw error;
  }

  return updated;
};

export const deletePost = async (id, userId) => {
  const deleted = await Post.findByIdAndDelete({ _id: id, author: userId });
  if (!deleted) {
    const err = new Error('Not authorized or post not found');
    err.statusCode = 403;
    throw err;
  }
  return;
};
