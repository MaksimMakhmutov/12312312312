import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav
      style={{
        display: 'flex',
        gap: '1rem',
        padding: '1rem',
        borderBottom: '1px solid gray',
      }}
    >
      <Link to="/">Home</Link>
      <Link to="/cart">Cart</Link>
      {user ? (
        <>
          {user.role === 'admin' && <Link to="/admin">Admin</Link>}
          <span>{user.email}</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};
export default Navbar;
