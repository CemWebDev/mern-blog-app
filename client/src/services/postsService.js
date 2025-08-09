import axiosInstance from './api';

/**
 * @returns {Promise<Array>}
 */

export const getPosts = async () => {
  const { data } = await axiosInstance.get('/posts');
  return data;
};

/**
 * @param {string} id
 * @returns {Promise<Object>}
 */

export const getPost = async (postId) => {
  const { data } = await axiosInstance.get(`/posts/${postId}`);
  return data;
};

/**
 * @param {{ title: string, content: string }} postData
 * @returns {Promise<Object>}
 */

export const createPost = async (postData) => {
  const { data } = await axiosInstance.post('/posts', postData);
  return data;
};

/**
 * @param {string} id
 * @param {{ title?: string, content?: string }} postData
 * @returns {Promise<Object>}
 */

export const updatePost = async (postId, postData) => {
  const { data } = await axiosInstance.put(`/posts/${postId}`, postData);
  return data;
};

/**
 * @param {string} id
 * @returns {Promise<void>}
 */

export const deletePost = async (postId) => {
  const { data } = await axiosInstance.delete(`/posts/${postId}`);
  return data;
};
