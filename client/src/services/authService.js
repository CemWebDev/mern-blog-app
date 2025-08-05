import axiosInstance from './api';
const API_URL = 'http://localhost:5000';

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
  window.location.href = `${API_URL}/api/auth/github`;
};
