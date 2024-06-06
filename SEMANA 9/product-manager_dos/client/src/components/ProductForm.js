// src/components/ProductForm.js
import React, { useState } from "react";
import axios from "axios";

const ProductForm = ({ titleIn, priceIn, descriptionIn, submitProduct }) => {
  const [title, setTitle] = useState(titleIn);
  const [price, setPrice] = useState(priceIn);
  const [description, setDescription] = useState(descriptionIn);

  // Procesa el producto y lo envía al backend
  const ProcessProduct = (e) => {
    e.preventDefault();
    const newProduct = { title, price, description };
    axios.post("http://localhost:8000/api/products", newProduct)
      .then(res => {
        submitProduct(res.data); // Añade el nuevo producto a la lista
        setTitle("");
        setPrice("");
        setDescription("");
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="form-container">
      <form onSubmit={ProcessProduct}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter product title"
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
          />
        </div>
        <input type="submit" value="Create" />
      </form>
    </div>
  );
};

export default ProductForm;
