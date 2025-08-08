import axiosInstance from './api';

export const getMe = async () => {
  const response = await axiosInstance.get('/users/me');
  return response.data.user;
};

export const updateMe = async (data) => {
  const response = await axiosInstance.put('/users/me', data);
  return response.data.user;
};
