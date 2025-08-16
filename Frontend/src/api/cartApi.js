import api from './axios';

export const getCart = async () => {
  const { data } = await api.get('/cart');
  return data; // { userId, items: [...] }
};

export const addToCartApi = async (productId, quantity = 1) => {
  const { data } = await api.post('/cart/add', { productId, quantity });
  return data;
};

export const updateCartItemApi = async (productId, quantity) => {
  const { data } = await api.patch(`/cart/item/${productId}`, { quantity });
  return data;
};

export const removeCartItemApi = async (productId) => {
  const { data } = await api.delete(`/cart/item/${productId}`);
  return data;
};

export const clearCartApi = async () => {
  const { data } = await api.delete('/cart/clear');
  return data;
};
