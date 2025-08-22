import axiosInstance from './api';
const API_URL = import.meta.env.VITE_API_URL;

/**
 * @param {{ username: string, email: string, password: string }} userData
 */

export const register = async (userData) => {
  const response = await axiosInstance.post('/auth/register', userData);
  return response.data;
};

/**
 * @param {{ email: string, password: string }} credentials
 */

export const login = async (credentials) => {
  const response = await axiosInstance.post('/auth/login', credentials);
  return response.data;
};

export const logout = async () => {
  localStorage.removeItem('persist:root');
};

export const signWithGithub = () => {
  window.location.href = `${API_URL}/auth/github`;
};
/**
 * @param {File} file
 * @returns {Promise<{ avatarUrl: string }>}
 */
export const uploadAvatar = async (file) => {
  const formData = new FormData();
  formData.append('avatar', file);

  const response = await axiosInstance.post('/avatar/me/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const getMe = async () => {
  const { data } = await axiosInstance.get('/auth/me');
  return data;
};
