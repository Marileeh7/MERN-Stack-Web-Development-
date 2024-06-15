// cliente/src/vistas/Register.js
// cliente/src/vistas/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/v1/register', form)
      .then(res => {
        if (res.status === 201) {
          navigate('/login');
        }
      })
      .catch(err => {
        if (err.response && err.response.data && err.response.data.msg) {
          setError(err.response.data.msg);
        } else {
          setError('Registration failed. Please try again.');
        }
      });
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={onSubmitHandler}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            className="form-control"
            onChange={onChangeHandler}
            value={form.username}
            required
          />
        </div>
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
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default Register;
