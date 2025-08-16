import api from './axios';

export const getAllUsers = async () => {
  const { data } = await api.get('/users');
  return data;
};

export const updateUserRole = async (id, role) => {
  const { data } = await api.patch(`/users/${id}/role`, { role });
  return data;
};