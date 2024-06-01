import Axios from 'axios';
import { toast } from 'react-hot-toast';

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
    if (response.headers['content-type'] === 'application/octet-stream') {
      return {
        data: response.data,
        contentType: response.headers['content-type'],
      };
    }

    if (response.data?.result) return response.data.result;

    return response.data;
  },
  (error) => {
    if (error.code === 'ERR_NETWORK' || error.response.status === 500) {
      toast.error('Błąd serwera: something is no yes');
    }
    if (error.response.status === 422) {
      if (error.response.data.detail) {
        const errors = error.response.data.detail;
        errors.forEach(({ loc, type }: { loc: string[]; type: string }) => {
          toast.error(`${loc[loc.length - 1]}: ${type}`);
        });
      } else if (error.response.data.errors) {
        const errors = error.response.data.errors;
        errors.forEach(({ source, detail }: { source: string; detail: string }) => {
          toast.error(`${source}: ${detail}`);
        });
      } else {
        toast.error('Nieokreślony błąd walidacji');
      }
    }
    if (error.response.status === 403) {
      toast.error('Nie masz prawa');
    }
    if (error.response.status === 401) {
      localStorage.removeItem('site');
      window.location.href = '/auth/login';
    }

    return Promise.reject(error);
  }
);
