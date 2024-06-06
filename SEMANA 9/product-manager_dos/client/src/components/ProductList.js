import React from "react";
import { Link } from "react-router-dom";
import DeleteButton from "./DeleteButton";

const ProductList = (props) => {
    const { removingDOM, products } = props;
    return (
            products.map((product, i) => (
                
                <div key={i} className="card">
                    <h1>{product.title}</h1>
                    <Link to={`/products/${product._id}`}>
                        {product.title}
                    </Link>
                    <p className="description">{product.description}</p>
                    <p className="price">${product.price}</p>
                    <DeleteButton productId={product._id} removingDOM={() => removingDOM(product._id)} />
                </div>
            ))
    );
}

export default ProductList;
