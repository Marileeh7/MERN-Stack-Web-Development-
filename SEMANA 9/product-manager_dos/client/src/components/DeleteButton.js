import React from 'react';
import axios from 'axios';

const DeleteButton = ({ productId, removingDOM }) => {
  const deleteProduct = () => {
    axios.delete(`http://localhost:8000/api/products/${productId}`)
      .then(res => {
        removingDOM();
      })
      .catch(err => console.error(err));
  };

  return (
    <button className="delete-button" onClick={deleteProduct}>Borrar</button>
  );
};

export default DeleteButton;
