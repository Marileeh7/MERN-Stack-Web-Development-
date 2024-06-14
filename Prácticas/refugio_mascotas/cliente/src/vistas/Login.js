// cliente/src/vistas/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/v1/login', form)
      .then(res => {
        if (res.data.token) {
          localStorage.setItem('token', res.data.token);
          navigate('/');
        }
      })
      .catch(err => setError('Invalid credentials'));
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={onSubmitHandler}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            onChange={onChangeHandler}
            value={form.email}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            onChange={onChangeHandler}
            value={form.password}
            required
          />
        </div>
        {error && <span className="text-danger">{error}</span>}
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;
