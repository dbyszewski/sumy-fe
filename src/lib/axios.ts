import Axios from 'axios';

// import { API_URL } from '@/config';

export const axios = Axios.create({
  // TODO: Change this to the actual API URL
  baseURL: 'http://127.0.0.1:5000',
});

// axios.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
// });
