// src/components/ProductForm.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from 'prop-types';

// Defino el componente ProductForm, que se utiliza para crear y editar productos
const ProductForm = ({ addProduct, updateProduct, product, editMode }) => {
  // Defino estados para los campos del formulario y para los posibles errores
  const [title, setTitle] = useState(product ? product.title : '');
  const [price, setPrice] = useState(product ? product.price : '');
  const [description, setDescription] = useState(product ? product.description : '');
  const [error, setError] = useState(null);
  const URL_BASE = "http://localhost:8000/api";

  // Utilizo useEffect para actualizar los estados cuando recibo un producto para editar
  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setPrice(product.price);
      setDescription(product.description);
    }
  }, [product]);

  // Manejo el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevenir el comportamiento por defecto del formulario
    const newProduct = { title, price, description };  // Creo un nuevo objeto de producto con los valores del formulario

    try {
      let response;
      // Si estoy en modo edición, hago una solicitud PUT
      if (editMode) {
        response = await axios.put(`${URL_BASE}/products/${product._id}`, newProduct, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        updateProduct(response.data);  // Llamo a la función updateProduct para actualizar el producto en la lista
      } else {
        // Si no, hago una solicitud POST
        response = await axios.post(`${URL_BASE}/products`, newProduct, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        addProduct(response.data);  // Llamo a la función addProduct para agregar el nuevo producto a la lista
      }

      // Limpio los campos del formulario y reseteo errores
      setTitle('');
      setPrice('');
      setDescription('');
      setError(null);
    } catch (err) {
      // Manejo los errores posibles de la solicitud
      if (err.response) {
        setError(`Error ${err.response.status}: ${err.response.data.message || err.response.data}`);
      } else if (err.request) {
        setError('No se recibió respuesta del servidor.');
      } else {
        setError('Error al enviar los datos.');
      }
    }
  };

  // Renderizo el formulario
  return (
    <div className="form-container">
      <h2 className='titlee'>{editMode ? 'Edit Product' : 'New Product'}</h2>
      <form onSubmit={handleSubmit}>   
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}  // Actualizo el estado del título cuando cambia el valor del input
            placeholder="Enter product title"
            required
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}  // Actualizo el estado del precio cuando cambia el valor del input
            placeholder="Enter product price"
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}  // Actualizo el estado de la descripción cuando cambia el valor del input
            placeholder="Enter product description"
            required
          />
        </div>
        <button type="submit" className="submit-button">
          {editMode ? 'Update' : 'Create'} {/* Renderizo el botón de enviar */}
        </button>
        {error && <p className="error">{error}</p>} {/* Si hay un error, lo muestro */}
      </form>
    </div>
  );
};

ProductForm.propTypes = {
  addProduct: PropTypes.func.isRequired,
  updateProduct: PropTypes.func.isRequired,
  product: PropTypes.shape({
    title: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
    _id: PropTypes.string
  }),
  editMode: PropTypes.bool
};

export default ProductForm;
