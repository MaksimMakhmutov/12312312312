// src/api/fakeServer.js
const API_URL = 'http://localhost:3001';

// ====== 📌 Продукты ======
export const fetchProducts = async () => {
  const res = await fetch(`${API_URL}/products`);
  if (!res.ok) throw new Error('Failed to load products');
  return res.json();
};

export const getProductsFromFakeServer = async ({
  page = 1,
  limit = 6,
  sortBy = 'name',
  order = 'asc',
  category = '',
  search = ''
}) => {
  let data = await fetchProducts();

  if (category) {
    data = data.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    const query = search.toLowerCase();
    data = data.filter(p => p.name.toLowerCase().includes(query));
  }

  data.sort((a, b) => {
    if (sortBy === 'price') {
      return order === 'asc' ? a.price - b.price : b.price - a.price;
    }
    return order === 'asc'
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name);
  });

  const total = data.length;
  const start = (page - 1) * limit;
  const paginated = data.slice(start, start + limit);

  return { data: paginated, total };
};

export const addProduct = async (product) => {
  const res = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product)
  });
  return res.json();
};

export const deleteProduct = async (id) => {
  await fetch(`${API_URL}/products/${id}`, { method: 'DELETE' });
};

// ====== 📌 Пользователи ======
export const fetchUsers = async () => {
  const res = await fetch(`${API_URL}/users`);
  return res.json();
};

export const registerUserFake = async (email, password) => {
  const users = await fetchUsers();
  if (users.some(u => u.email === email)) {
    throw new Error('Email already exists');
  }
  const newUser = { email, password, role: 'user' };
  const res = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser)
  });
  return res.json();
};

export const loginUserFake = async (email, password) => {
  const users = await fetchUsers();
  return users.find(u => u.email === email && u.password === password) || null;
};

export const updateUserRole = async (id, role) => {
  await fetch(`${API_URL}/users/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role })
  });
};

// ====== 📌 Корзина ======
export const fetchCart = async (userId) => {
  const res = await fetch(`${API_URL}/cart?userId=${userId}`);
  return res.json();
};

export const addToCartFake = async (userId, item) => {
  const res = await fetch(`${API_URL}/cart`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...item, userId })
  });
  return res.json();
};

export const updateCartItemQuantity = async (cartItemId, quantity) => {
  await fetch(`${API_URL}/cart/${cartItemId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantity })
  });
};

export const removeFromCartFake = async (cartItemId) => {
  await fetch(`${API_URL}/cart/${cartItemId}`, { method: 'DELETE' });
};

export const clearCartFake = async (userId) => {
  const items = await fetchCart(userId);
  await Promise.all(items.map(i => removeFromCartFake(i.id)));
};