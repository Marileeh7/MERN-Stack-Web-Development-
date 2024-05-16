// src/componentes/Form.js
import React, { useContext } from 'react';
import UserContext from './UserContext';
import './Formulario.css';

const Form = () => {
  const { name, setName } = useContext(UserContext);

  const inputHandler = (e) => {
    setName(e.target.value); // Actualiza el nombre en tiempo real
  };

  return (
    <div className="formulario">
      <label htmlFor="nombre">Tu Nombre:</label>
      <input
        type="text"
        id="nombre"
        className="form-control"
        onChange={inputHandler}
        value={name}
      />
    </div>
  );
};

export default Form;
