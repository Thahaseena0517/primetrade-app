import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Register = ({ onSwitch }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async () => {
    setError('');
    try {
      const res = await axios.post(
        'http://localhost:5000/api/v1/auth/register',
        form
      );
      login(res.data.user, res.data.token);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="container">
      <h2>Create Account</h2>
      {error && <p className="error">{error}</p>}
      <input
        placeholder="Full Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />
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
      <button onClick={handleSubmit}>Register</button>
      <div className="link">
        Already have an account? <a onClick={onSwitch}>Login</a>
      </div>
    </div>
  );
};

export default Register;