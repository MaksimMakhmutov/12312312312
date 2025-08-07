import { API_BASE_URL } from '../components/constants';

export const loginUser = async (email, password) => {
  const res = await fetch(
    `${API_BASE_URL}/users?email=${email}&password=${password}`
  );
  const users = await res.json();
  return users.length > 0 ? users[0] : null;
};
