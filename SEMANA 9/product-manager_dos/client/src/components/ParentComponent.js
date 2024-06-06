// src/components/ParentComponent.js
import React, { useState } from "react";
import ProductForm from './ProductForm';

const ParentComponent = () => {
  const [products, setProducts] = useState([]);

  const submitProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  return (
    <div className="App">
      <h1>Product Management</h1>
      <ProductForm 
        titleIn="" 
        priceIn={0} 
        descriptionIn="" 
        submitProduct={submitProduct} 
      />
      <div className="product-list">
        {products.map((product, index) => (
          <div key={index} className="product-item">
            <p>{product.title} - ${product.price}</p>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParentComponent;
