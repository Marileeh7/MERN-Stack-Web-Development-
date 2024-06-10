import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail';
import axios from 'axios';

// Defino el componente ProductManager, que gestiona el estado de los productos y las rutas
const ProductManager = () => {
  const [products, setProducts] = useState([]);  // Defino el estado para la lista de productos
  const [loaded, setLoaded] = useState(false);  // Defino el estado para controlar si los productos se han cargado

  // Utilizo useEffect para obtener la lista de productos cuando el componente se monta
  useEffect(() => {
    axios.get('http://localhost:8000/api/products')
      .then(res => {
        setProducts(res.data);  // Actualizo el estado de productos con los datos recibidos
        setLoaded(true);  // Cambio el estado a cargado
      })
      .catch(err => console.error(err));
  }, []);

  // Función para agregar un nuevo producto a la lista
  const addProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  // Función para eliminar un producto de la lista
  const removeProduct = (id) => {
    axios.delete(`http://localhost:8000/api/products/${id}`)
      .then(() => {
        setProducts(products.filter(product => product._id !== id));
      })
      .catch(err => console.error(err));
  };

  // Renderizo las rutas y componentes principales
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
