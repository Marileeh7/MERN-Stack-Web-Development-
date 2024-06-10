import React from 'react';
import PropTypes from 'prop-types';

// Defino un componente reutilizable para el botón de eliminar
const DeleteButton = ({ onClick }) => {
  // Renderizo un botón que ejecuta la función onClick cuando se hace clic
  return (
    <button className="delete-button" onClick={onClick}>Borrar</button>
  );
};

// Defino los tipos de propiedades que espera el componente DeleteButton
DeleteButton.propTypes = {
  // La propiedad onClick debe ser una función y es requerida
  onClick: PropTypes.func.isRequired
};

export default DeleteButton;
