const API_URL = 'http://localhost:3001/users';

// Получить всех пользователей
export const getAllUsers = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Ошибка при загрузке пользователей');
  return res.json();
};

// Поиск по логину и паролю
export const login = async (username, password) => {
  const res = await fetch(
    `${API_URL}?username=${username}&password=${password}`
  );
  const users = await res.json();
  if (users.length === 0) throw new Error('Неверные учетные данные');
  const { id, username: name, role } = users[0];
  return { id, username: name, role };
};

// Регистрация пользователя
export const register = async (username, password) => {
  // Проверка наличия такого пользователя
  const existing = await fetch(`${API_URL}?username=${username}`);
  const found = await existing.json();
  if (found.length > 0) throw new Error('Пользователь уже существует');

  const newUser = {
    username,
    password,
    role: 'user',
  };

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser),
  });

  if (!res.ok) throw new Error('Ошибка при регистрации');
  const created = await res.json();
  return { id: created.id, username: created.username, role: created.role };
};

// Получить пользователя по ID
export const getUserById = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error('Пользователь не найден');
  const user = await res.json();
  return { id: user.id, username: user.username, role: user.role };
};
