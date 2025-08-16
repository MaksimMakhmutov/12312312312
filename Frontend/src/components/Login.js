import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styled from 'styled-components';

const Box = styled.form`
  max-width: 360px;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  input {
    padding: 8px 10px;
    border: 1px solid #ddd;
    border-radius: 6px;
  }
  button {
    padding: 8px 12px;
    background: #2563eb;
    color: #fff;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();
  const [err, setErr] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      const user = await login(email, password);
      const redirectTo =
        loc.state?.from?.pathname || (user.role === 'admin' ? '/admin' : '/');
      nav(redirectTo);
    } catch (e) {
      setErr(e?.response?.data?.message || e.message || 'Login error');
    }
  };

  return (
    <Box onSubmit={onSubmit}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {err && <div style={{ color: 'crimson' }}>{err}</div>}
      <button type="submit">Login</button>
    </Box>
  );
};

export default Login;
