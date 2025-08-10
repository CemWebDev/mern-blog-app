import Post from './post.model.js';
import { cloudinary } from '../../utils/cloudinary.js';

export const createPost = async ({ title, content, author, cover }) => {
  const post = { title, content, author };
  if (cover) post.cover = cover;
  return await Post.create(post);
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

export const updatePost = async (id, userId, { title, content, cover, removeCover }) => {
  const post = await Post.findOne({ _id: id, author: userId });
  if (!post) {
    const error = new Error('Post not found or not authorized to update');
    error.status = 403;
    throw error;
  }

  if (typeof title === 'string') post.title = title;
  if (typeof content === 'string') post.content = content;
  if (removeCover && post.cover?.publicId) {
    try { await cloudinary.uploader.destroy(post.cover.publicId); } catch {}
    post.cover = undefined;
  }
  if (cover) {
    if (post.cover?.publicId) {
      try { await cloudinary.uploader.destroy(post.cover.publicId); } catch {}
    }
    post.cover = cover;
  }

  await post.save();
  return post;
};

export const deletePost = async (id, userId) => {
  const deleted = await Post.findOneAndDelete({ _id: id, author: userId });
  if (!deleted) {
    const err = new Error('Not authorized or post not found');
    err.statusCode = 403;
    throw err;
  } 
  return;
};
