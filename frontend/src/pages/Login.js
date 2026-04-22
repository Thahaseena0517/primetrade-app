import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Login = ({ onSwitch }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async () => {
    setError('');
    try {
      const res = await axios.post(
        'http://localhost:5000/api/v1/auth/login',
        form
      );
      login(res.data.user, res.data.token);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container">
      <h2>Welcome Back</h2>
      {error && <p className="error">{error}</p>}
      <input
        placeholder="Email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
      />
      <button onClick={handleSubmit}>Login</button>
      <div className="link">
        No account? <a onClick={onSwitch}>Register</a>
      </div>
    </div>
  );
};

export default Login;