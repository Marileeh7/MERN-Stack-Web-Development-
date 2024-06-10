import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleDelete = () => {
    axios.delete(`http://localhost:8000/api/products/${id}`)
      .then(() => navigate("/"))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h1>Product Details</h1>
      {product && (
        <>
          <p>Title: {product.title}</p>
          <p>Price: {product.price}</p>
          <p>Description: {product.description}</p>
          <Link to={`/products/${id}/edit`}>Edit</Link>
          <br />
          <button className="delete-button" onClick={handleDelete}>Borrar</button>
        </>
      )}
    </div>
  );
};

export default ProductDetail;

