import { API_BASE_URL } from '../components/constants';

const API = 'http://localhost:3001/users';

export const loginUser = async (email, password) => {
  const res = await fetch(
    `${API_BASE_URL}/users?email=${email}&password=${password}`
  );
  if (!res.ok) throw new Error('Failed to login');
  const users = await res.json();
  return users.length > 0 ? users[0] : null;
};

export const getUsers = async () => {
  const res = await fetch(`${API}`);
  return res.json();
};

export const deleteUser = async (id) => {
  // Удаляем пользователя
  await fetch(`${API}/${id}`, {
    method: 'DELETE',
  });

  // Удаляем корзину пользователя
  const cartRes = await fetch(`http://localhost:3001/cart?userId=${id}`);
  const carts = await cartRes.json();
  for (const cart of carts) {
    await fetch(`http://localhost:3001/cart/${cart.id}`, {
      method: 'DELETE',
    });
  }
};

export const updateUserRole = async (id, role) => {
  await fetch(`${API}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role }),
  });
};

export const registerUser = async (email, password) => {
  const newUser = { email, password, role: 'user' };
  const res = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser),
  });
  if (!res.ok) throw new Error('Failed to register');
  return res.json();
};
