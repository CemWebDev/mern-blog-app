import axiosInstance from './api';

export const getStats = async () => {
  const response = await axiosInstance.get('/stats');
  return response.data;
};
