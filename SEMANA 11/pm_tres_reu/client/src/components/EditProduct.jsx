// src/components/EditProduct.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductForm from './ProductForm';
import axios from 'axios';

const EditProduct = ({ updateProduct }) => {
  const { id } = useParams(); // Obtengo el id del producto de los parámetros de la URL
  const navigate = useNavigate(); // Utilizo useNavigate para redireccionar
  const [product, setProduct] = React.useState(null);
  const [loaded, setLoaded] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    // Obtengo los detalles del producto cuando el componente se monta
    axios.get(`http://localhost:8000/api/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setLoaded(true);
      })
      .catch(err => {
        console.error(err);
        setError('Error al cargar el producto');
      });
  }, [id]);

  const handleUpdateProduct = (updatedProduct) => {
    axios.put(`http://localhost:8000/api/products/${id}`, updatedProduct)
      .then(res => {
        updateProduct(res.data); // Actualizo el producto en la lista
        navigate(`/products/${id}`); // Redirecciono a la página de detalles del producto después de la actualización
      })
      .catch(err => {
        console.error(err);
        setError('Error al actualizar el producto');
      });
  };

  return (
    <div>
      {error && <p>{error}</p>}
      {loaded && product ? (
        <ProductForm
          addProduct={() => {}} // No necesito agregar un nuevo producto
          updateProduct={handleUpdateProduct} // Paso la función de actualización al formulario
          product={product}
          editMode={true}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditProduct;
