import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail';
import axios from 'axios';

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

  const addProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const removeProduct = (id) => {
    axios.delete(`http://localhost:8000/api/products/${id}`)
      .then(() => {
        setProducts(products.filter(product => product._id !== id));
      })
      .catch(err => console.error(err));
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={
            <>
              <ProductForm addProduct={addProduct} />
              {loaded ? <ProductList products={products} removeProduct={removeProduct} /> : <p>Loading...</p>}
            </>
          } />
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default ProductManager;
