import api from './axios';

export const getProducts = async ({
  q = '',
  category = '',
  page = 1,
  limit = 6,
} = {}) => {
  const { data } = await api.get('/products', {
    params: { q, category, page, limit },
  });
  return data; // { data, total, page, limit }
};

export const getProductById = async (id) => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};

export const createProduct = async (payload) => {
  const { data } = await api.post('/products', payload);
  return data;
};

export const updateProduct = async (id, payload) => {
  const { data } = await api.put(`/products/${id}`, payload);
  return data;
};

export const deleteProduct = async (id) => {
  const { data } = await api.delete(`/products/${id}`);
  return data;
};
