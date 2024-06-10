import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import DeleteButton from './DeleteButton';

// Defino el componente ProductList, que muestra una lista de productos
const ProductList = ({ products, removeProduct }) => {
  // Renderizo la lista de productos
  return (
    <div className="lower-section">
      {products.map((product, i) => {
        // Valido que el producto tenga los campos necesarios
        if (!product.title || !product.price || !product.description || !product._id) {
          return (
            <div key={i} className="card">
              <h1>Invalid Product</h1>
              <p>Missing required product information.</p>
            </div>
          );
        }

        return (
          <div key={i} className="card">
            <h1>{product.title}</h1>
            <Link to={`/products/${product._id}`}>
              {product.title}
            </Link>
            <p className="description">{product.description}</p>
            <p className="price">${product.price}</p>
            <DeleteButton onClick={() => removeProduct(product._id)} />  {/* Botón para eliminar el producto */}
          </div>
        );
      })}
    </div>
  );
};

// Defino los tipos de propiedades que espera el componente ProductList
ProductList.propTypes = {
  // products debe ser un array de objetos que tienen las siguientes propiedades
  products: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired
  })).isRequired,
  // removeProduct debe ser una función y es requerida
  removeProduct: PropTypes.func.isRequired
};

export default ProductList;
