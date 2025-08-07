import { API_BASE_URL } from '../components/constants';

export const loginUser = async (email, password) => {
  const res = await fetch(
    `${API_BASE_URL}/users?email=${email}&password=${password}`
  );
  if (!res.ok) throw new Error('Failed to login');
  const users = await res.json();
  return users.length > 0 ? users[0] : null;
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
