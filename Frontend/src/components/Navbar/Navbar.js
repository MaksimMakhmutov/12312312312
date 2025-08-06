import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../bff/AuthContext';

export const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
      <Link to="/">Главная</Link>
      <Link to="/products">Товары</Link>
      <Link to="/cart">Корзина</Link>
      {user?.role === 'admin' && <Link to="/admin">Админка</Link>}
      {user ? (
        <button onClick={logout}>Выйти</button>
      ) : (
        <>
          <Link to="/login">Вход</Link> |{' '}
          <Link to="/register">Регистрация</Link>
        </>
      )}
    </nav>
  );
};
