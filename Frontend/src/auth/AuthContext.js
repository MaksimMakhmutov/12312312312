import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();
const AUTO_LOGOUT_MINUTES = 30;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      const timeout = setTimeout(
        () => logout(),
        AUTO_LOGOUT_MINUTES * 60 * 1000
      );
      return () => clearTimeout(timeout);
    }
  }, [user]);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
