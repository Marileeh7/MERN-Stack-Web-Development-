// src/componentes/Navbar.js
import React, { useContext } from 'react';
import UserContext from './UserContext';
import './Navbar.css';

const Navbar = () => {
  const { name } = useContext(UserContext);

  return (
    <nav className="navbar">
      <h1>¡Hola, {name}!</h1>
    </nav>
  );
};

export default Navbar;
