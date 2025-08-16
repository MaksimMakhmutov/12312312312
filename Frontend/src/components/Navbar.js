import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styled from 'styled-components';

const Bar = styled.nav`
  display:flex; justify-content:space-between; align-items:center;
  padding:12px 20px; background:#111827; color:#fff;
  a{color:#fff; text-decoration:none; margin-right:12px;}
  button{background:#2563eb; color:#fff; border:none; padding:6px 12px; border-radius:6px; cursor:pointer;}
  button:hover{opacity:.9;}
`;

const Navbar = () => {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const doLogout = () => { logout(); nav('/login'); };

  return (
    <Bar>
      <div>
        <Link to="/">Shop</Link>
      </div>
      <div>
        <Link to="/">Products</Link>
        {user && <Link to="/cart">Cart</Link>}
        {user?.role === 'admin' && <Link to="/admin">Admin</Link>}
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <span style={{marginRight:12}}>{user.email}</span>
            <button onClick={doLogout}>Logout</button>
          </>
        )}
      </div>
    </Bar>
  );
};

export default Navbar;
