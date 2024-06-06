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
    <button onClick={deleteProduct}>
      Delete
    </button>
  );
};

export default DeleteButton;
