import Axios from 'axios';

// import { API_URL } from '@/config';

export const axios = Axios.create({
  // TODO: Change this to the actual API URL
  baseURL: 'http://127.0.0.1:5000',
});

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('site');
  if (token) {
    config.headers.token = `${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('site');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);
