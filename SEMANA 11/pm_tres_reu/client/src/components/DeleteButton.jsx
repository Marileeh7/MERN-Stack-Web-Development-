import React from 'react';
import PropTypes from 'prop-types';

// Defino un componente reutilizable para el botón de eliminar
const DeleteButton = ({ onClick }) => {
  return (
    // Renderizo un botón que ejecuta la función onClick cuando se hace clic
    <button className="delete-button" onClick={onClick}>Borrar</button>
  );
};

DeleteButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default DeleteButton;
