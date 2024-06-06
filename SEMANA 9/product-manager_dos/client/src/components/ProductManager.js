import React, { useState, useEffect } from 'react';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import axios from 'axios';
import './styles.css';

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8000/api/products')
      .then(res => {
        setProducts(res.data);
        setLoaded(true);
      })
      .catch(err => console.error(err));
  }, []);

  const submitProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  return (
    <div className="container">
      <h1>Product Manager</h1>
      <div className="upper-section">
        <ProductForm submitProduct={submitProduct} /> {/* Formulario para crear un nuevo producto */}
      </div>
      <hr />
      <div className="lower-section">
        {loaded && <ProductList products={products} />}
      </div>
    </div>
  );
};

export default ProductManager;
