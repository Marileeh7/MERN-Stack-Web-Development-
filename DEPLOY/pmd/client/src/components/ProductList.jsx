import React from 'react';
import { Link } from 'react-router-dom';
import { ProductListPropTypes } from './PropTypes';


const ProductList = ({ products, removeProduct }) => {
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
          <button className="delete-button" onClick={() => removeProduct(product._id)}>Borrar</button>
        </div>
      ))}
    </div>
  );
};

ProductList.propTypes = ProductListPropTypes;

export default ProductList;

