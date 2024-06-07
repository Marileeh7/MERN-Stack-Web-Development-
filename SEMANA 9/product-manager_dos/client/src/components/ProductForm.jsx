import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductForm = ({ addProduct, product, editMode }) => {
  const [title, setTitle] = useState(product ? product.title : '');
  const [price, setPrice] = useState(product ? product.price : '');
  const [description, setDescription] = useState(product ? product.description : '');
  const [error, setError] = useState(null);
  const URL_BASE = "http://localhost:8000/api";

  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setPrice(product.price);
      setDescription(product.description);
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = { title, price, description };

    try {
      let response;
      if (editMode) {
        response = await axios.put(`${URL_BASE}/products/${product._id}`, newProduct, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      } else {
        response = await axios.post(`${URL_BASE}/products`, newProduct, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        addProduct(response.data);
      }

      setTitle('');
      setPrice('');
      setDescription('');
      setError(null);
    } catch (err) {
      if (err.response) {
        setError(`Error ${err.response.status}: ${err.response.data.message || err.response.data}`);
      } else if (err.request) {
        setError('No se recibió respuesta del servidor.');
      } else {
        setError('Error al enviar los datos.');
      }
    }
  };

  return (
    <div className="form-container">
      <h2>{editMode ? 'Edit Product' : 'New Product'}</h2>
      <form onSubmit={handleSubmit}>   
        <div className="form-group">
        
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            onChange={(e) => setPrice(e.target.value)}
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
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter product description"
            required
          />
        </div>
        <button type="submit" className="submit-button">{editMode ? 'Update' : 'Create'}</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default ProductForm;


 /*la logica del formulario*/
