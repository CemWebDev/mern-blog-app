import axiosInstance from './api';

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
