// src/components/ProductManager.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail';
import EditProduct from './EditProduct';
import axios from 'axios';

// Defino el componente ProductManager, que gestiona el estado de los productos y las rutas
const ProductManager = () => {
  const [products, setProducts] = useState([]);  // Defino el estado para la lista de productos
  const [loaded, setLoaded] = useState(false);  // Defino el estado para controlar si los productos se han cargado
  const [error, setError] = useState(null);  // Defino el estado para manejar errores

  // Utilizo useEffect para obtener la lista de productos cuando el componente se monta
  useEffect(() => {
    axios.get('http://localhost:8000/api/products')
      .then(res => {
        setProducts(res.data);  // Actualizo el estado de productos con los datos recibidos
        setLoaded(true);  // Cambio el estado a cargado
        setError(null);  // Limpio cualquier error previo
      })
      .catch(err => {
        console.error(err);
        setError('Error al cargar los productos');  // Establezco un mensaje de error
      });
  }, []);

  // Función para agregar un nuevo producto a la lista
  const addProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  // Función para actualizar un producto en la lista
  const updateProduct = (updatedProduct) => {
    setProducts(products.map(product => 
      product._id === updatedProduct._id ? updatedProduct : product
    ));
  };

  // Función para eliminar un producto de la lista
  const removeProduct = (id) => {
    axios.delete(`http://localhost:8000/api/products/${id}`)
      .then(() => {
        setProducts(products.filter(product => product._id !== id));
      })
      .catch(err => {
        console.error(err);
        setError('Error al eliminar el producto');  // Establezco un mensaje de error
      });
  };

  // Renderizo las rutas y componentes principales
  return (
    <Router>
      <div>
        {error && <p>{error}</p>} {/* Muestro el mensaje de error si existe */}
        <Routes>
          <Route path="/" element={
            <>
              <ProductForm addProduct={addProduct} updateProduct={updateProduct} />
              {loaded ? <ProductList products={products} removeProduct={removeProduct} /> : <p>Loading...</p>}
            </>
          } />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/products/:id/edit" element={<EditProduct updateProduct={updateProduct} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default ProductManager;
