import api from './axios';

export const registerUser = async (email, password) => {
  const { data } = await api.post('/auth/register', { email, password });
  return data; // { token, user }
};

export const loginUser = async (email, password) => {
  const { data } = await api.post('/auth/login', { email, password });
  return data; // { token, user }
};
