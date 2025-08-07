const API = 'http://localhost:3001/products';

export const getProducts = async () => {
  const res = await fetch(API);
  return await res.json();
};

export const getProductById = async (id) => {
  const res = await fetch(`${API}/${id}`);
  return await res.json();
};

export const addProduct = async (product) => {
  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product)
  });
  return await res.json();
};