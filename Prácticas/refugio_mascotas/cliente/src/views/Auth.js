import React, { useState } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';
import '../Styles/Auth.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-container">
      <div className="auth-forms">
        <div className={`form-container ${isLogin ? 'active' : ''}`}>
          <Login />
        </div>
        <div className={`form-container ${!isLogin ? 'active' : ''}`}>
          <Register />
        </div>
      </div>
      <div className="toggle-container">
        <button onClick={() => setIsLogin(true)} className={isLogin ? 'active' : ''}>Login</button>
        <button onClick={() => setIsLogin(false)} className={!isLogin ? 'active' : ''}>Register</button>
      </div>
    </div>
  );
};

export default Auth;
