import axiosInstance from './api';

/**
 * @returns {Promise<Array>}  — Post listesi
 */

export const getPosts = async () => {
  const { data } = await axiosInstance.get('/posts');
  console.log('getPosts', data);
  return data;
};

/**
 * @param {string} id      — Post ObjectId
 * @returns {Promise<Object>}
 */

export const getPost = async (postId) => {
  const { data } = await axiosInstance.get(`/posts/${postId}`);
  console.log('getPost', data);
  return data;
};

/**
 * @param {{ title: string, content: string }} postData
 * @returns {Promise<Object>}
 */

export const createPost = async (postData) => {
  const { data } = await axiosInstance.post('/posts', postData);
  console.log('createPost', data);
  return data;
};

/**
 * @param {string} id
 * @param {{ title?: string, content?: string }} postData
 * @returns {Promise<Object>}
 */

export const updatePost = async (postId, postData) => {
  const { data } = await axiosInstance.put(`/posts/${postId}`, postData);
  console.log('updatePost', data);
  return data;
};

/**
 * @param {string} id
 * @returns {Promise<void>}
 */

export const deletePost = async (postId) => {
  const { data } = await axiosInstance.delete(`/posts/${postId}`);
  console.log('deletePost', data);
  return data;
};
