import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
});

// добавляем токен
api.interceptors.request.use((config) => {
  const raw = localStorage.getItem('auth');
  if (raw) {
    const { token } = JSON.parse(raw);
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
