import axiosInstance from './api';

/**
 * @returns {Promise<Array>}
 */

export const getPosts = async (params = {}) => {
  const { data } = await axiosInstance.get('/posts', { params });
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
 * @param {FormData|object} postData
 * @returns {Promise<Object>}
 */
export const createPost = async (postData) => {
  const isForm =
    typeof FormData !== 'undefined' && postData instanceof FormData;
  const { data } = await axiosInstance.post('/posts', postData, {
    headers: isForm ? { 'Content-Type': 'multipart/form-data' } : undefined,
  });
  return data;
};
/**
 * @param {string} id
 * @param {{ title?: string, content?: string }} postData
 * @returns {Promise<Object>}
 */

export const updatePost = async (postId, data) => {
  const isForm = typeof FormData !== 'undefined' && data instanceof FormData;
  const res = await axiosInstance.put(`/posts/${postId}`, data, {
    headers: isForm ? { 'Content-Type': 'multipart/form-data' } : undefined,
  });
  return res.data;
};

/**
 * @param {string} id
 * @returns {Promise<void>}
 */

export const deletePost = async (postId) => {
  const { data } = await axiosInstance.delete(`/posts/${postId}`);
  return data;
};
