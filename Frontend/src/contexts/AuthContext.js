import { createContext, useContext, useEffect, useState } from 'react';
import { loginUser, registerUser } from '../api/authApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const raw = localStorage.getItem('auth');
    return raw ? JSON.parse(raw) : { token: null, user: null };
  });

  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify(auth));
  }, [auth]);

  const login = async (email, password) => {
    const data = await loginUser(email, password);
    setAuth(data);
    return data.user;
  };

  const register = async (email, password) => {
    const data = await registerUser(email, password);
    setAuth(data);
    return data.user;
  };

  const logout = () => setAuth({ token: null, user: null });

  return (
    <AuthContext.Provider value={{ token: auth.token, user: auth.user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
