import Post from './post.model.js';

export const createPost = async ({ title, content, author }) => {
  return await Post.create({ title, content, author });
};

export const getAllPosts = async () => {
  return await Post.find().populate('author', 'username');
};

export const getPostById = async (id) => {
  return await Post.findById(id).populate('author', 'username');
};

export const updatePost = async (id, { title, content }) => {
  return await Post.findByIdAndUpdate(id, { title, content }, { new: true });
};

export const deletePost = async (id) => {
  await Post.findByIdAndDelete(id);
  return;
};
