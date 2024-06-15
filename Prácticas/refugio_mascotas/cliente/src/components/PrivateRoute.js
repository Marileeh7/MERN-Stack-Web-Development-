import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';

const PrivateRoute = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:8000/api/auth/user', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(() => {
          setAuth(true);
          setLoading(false);
        })
        .catch(() => {
          setAuth(false);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return auth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
