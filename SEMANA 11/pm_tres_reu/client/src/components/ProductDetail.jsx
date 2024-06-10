import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DeleteButton from './DeleteButton';

// Defino el componente ProductDetail, que muestra los detalles de un producto específico
const ProductDetail = () => {
  const navigate = useNavigate();  // Utilizo useNavigate para redireccionar
  const { id } = useParams();  // Obtengo el id del producto de los parámetros de la URL
  const [product, setProduct] = useState(null);  // Defino el estado del producto

  // Utilizo useEffect para obtener los detalles del producto cuando el componente se monta
  useEffect(() => {
    axios.get(`http://localhost:8000/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [id]);

  // Manejo la eliminación del producto
  const handleDelete = () => {
    axios.delete(`http://localhost:8000/api/products/${id}`)
      .then(() => navigate("/"))  // Redirecciono a la página principal después de eliminar el producto
      .catch(err => console.error(err));
  };

  // Renderizo los detalles del producto
  return (
    <div>
      <h1>Product Details</h1>
      {product && (
        <>
          <p>Title: {product.title}</p>
          <p>Price: {product.price}</p>
          <p>Description: {product.description}</p>
          <Link to={`/products/${id}/edit`}>Edit</Link>  {/* Enlace para editar el producto */}
          <br />
          <DeleteButton onClick={handleDelete} />  {/* Botón para eliminar el producto */}
        </>
      )}
    </div>
  );
};

export default ProductDetail;
