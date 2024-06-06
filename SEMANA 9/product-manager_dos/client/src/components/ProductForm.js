import React, { useState } from "react";
import axios from "axios";

const ProductForm = ({ submitProduct }) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  const ProcessProduct = (e) => {
    e.preventDefault();
    const newProduct = { title, price, description };
    axios.post('http://localhost:8000/api/products', newProduct)
      .then(res => {
        submitProduct(res.data); // Añade el nuevo producto a la lista
        setTitle("");
        setPrice("");
        setDescription("");
        setError(null);
      })
      .catch(err => {
        console.error(err);
        setError(err.response ? err.response.data.message : "Error al enviar los datos.");
      });
  };

  return (
    <div className="form-container">
      <h1>Product Manager</h1>
      <form onSubmit={ProcessProduct}>
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
        <input type="submit" value="Create" />
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default ProductForm;
