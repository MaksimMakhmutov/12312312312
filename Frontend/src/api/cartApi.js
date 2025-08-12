const API = 'http://localhost:3001/carts';

export const getCartByUserId = async (userId) => {
  const res = await fetch(`${API}?userId=${userId}`);
  const data = await res.json();
  return data[0] || { userId, items: [] };
};

export const getCart = async (userId, page = 1, limit = 6) => {
  const res = await fetch(
    `${API}?userId=${userId}&_page=${page}&_limit=${limit}`
  );
  const data = await res.json();
  const total = res.headers.get('X-Total-Count');
  return { data, total: Number(total) };
};

export const updateCart = async (userId, items) => {
  const cart = await getCartByUserId(userId);
  if (cart.id) {
    const res = await fetch(`${API}/${cart.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...cart, items }),
    });
    return res.json();
  } else {
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, items }),
    });
    return res.json();
  }
};

export const clearCart = async (userId) => {
  return await updateCart(userId, []);
};
