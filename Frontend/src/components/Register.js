import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    background: #10b981;
    color: #fff;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }
`;

const isEmail = (v = '') => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const Register = () => {
  const { register: registerFn } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', confirm: '' });
  const [err, setErr] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    if (!isEmail(form.email)) return setErr('Invalid email');
    if (form.password.length < 6)
      return setErr('Password must be at least 6 chars');
    if (form.password !== form.confirm) return setErr('Passwords do not match');

    try {
      const user = await registerFn(form.email, form.password);
      nav(user.role === 'admin' ? '/admin' : '/');
    } catch (e) {
      setErr(e?.response?.data?.message || e.message || 'Register error');
    }
  };

  return (
    <Box onSubmit={onSubmit}>
      <h2>Register</h2>
      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Confirm password"
        value={form.confirm}
        onChange={(e) => setForm({ ...form, confirm: e.target.value })}
        required
      />
      {err && <div style={{ color: 'crimson' }}>{err}</div>}
      <button type="submit">Create account</button>
    </Box>
  );
};

export default Register;
