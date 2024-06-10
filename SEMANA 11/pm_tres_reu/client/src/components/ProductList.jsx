import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import DeleteButton from './DeleteButton';

// Defino el componente ProductList, que muestra una lista de productos
const ProductList = ({ products, removeProduct }) => {
  // Renderizo la lista de productos
  return (
    <div className="lower-section">
      {products.map((product, i) => (
        <div key={i} className="card">
          <h1>{product.title}</h1>
          <Link to={`/products/${product._id}`}>
            {product.title}
          </Link>
          <p className="description">{product.description}</p>
          <p className="price">${product.price}</p>
          <DeleteButton onClick={() => removeProduct(product._id)} />  {/* Botón para eliminar el producto */}
        </div>
      ))}
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
    _id: PropTypes.string
  })).isRequired,
  removeProduct: PropTypes.func.isRequired
};

export default ProductList;
