import React from "react";
import { Link } from "react-router-dom";
import DeleteButton from "./DeleteButton";

const ProductList = (props) => {
    const { removingDOM, products } = props;
    return (
        <div>
            {products.map((product, i) => (
                <div key={i}>
                    <p>
                        <Link to={`/products/${product._id}`}>
                            {product.title}
                        </Link>
                        {" | "}
                        <DeleteButton productId={product._id} removingDOM={() => removingDOM(product._id)} />
                    </p>
                </div>
            ))}
        </div>
    );
}

export default ProductList;
