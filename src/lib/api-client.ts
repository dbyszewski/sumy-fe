import Axios from 'axios';

// import { API_URL } from '@/config';

export const apiClient = Axios.create({
  // TODO: Change this to the actual API URL
  baseURL: 'http://127.0.0.1:5000',
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('site');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    if (response.data?.result) return response.data.result;

    return response.data;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('site');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);
