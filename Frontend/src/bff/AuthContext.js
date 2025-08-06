import React, { createContext, useState, useEffect } from 'react';
import * as api from './api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // При загрузке приложения проверяем сессию из localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Логин
  const login = async (username, password) => {
    const userData = await api.login(username, password);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Регистрация
  const register = async (username, password) => {
    const userData = await api.register(username, password);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Выход
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
