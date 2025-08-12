import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/authApi';
import { useAuth } from './AuthContext';
import { validateEmail } from '../utils/email';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const isEmailUnique = async (email) => {
    try {
      const res = await fetch(`http://localhost:3001/users?email=${encodeURIComponent(email)}`);
      const users = await res.json();
      return users.length === 0;
    } catch (err) {
      console.error('Error checking email uniqueness:', err);
      return false;
    }
  };

  const isPasswordStrong = (password) => {
    // Минимум 8 символов, хотя бы одна буква, одна цифра и один спецсимвол
    const strongPasswordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return strongPasswordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      alert('Invalid email format');
      return;
    }

    if (!isPasswordStrong(password)) {
      alert(
        'Password must be at least 8 characters long, include letters, numbers, and special characters'
      );
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const unique = await isEmailUnique(email);
    if (!unique) {
      alert('Email already exists');
      return;
    }

    const newUser = await registerUser(email, password);
    login(newUser);
    const redirectTo = newUser.role === 'admin' ? '/admin' : '/';
    navigate(redirectTo);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
        required
      />
      <p style={{ fontSize: '12px', color: '#666' }}>
        Password must be at least 8 characters, include a letter, a number, and a special
        character.
      </p>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;