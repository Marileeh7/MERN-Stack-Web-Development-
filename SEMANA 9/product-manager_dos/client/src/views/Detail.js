import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DeleteButton from '../components/DeleteButton';

// Componente que muestra los detalles de un producto específico
const Detail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8000/api/products/${id}`)
            .then(res => setProduct(res.data))
            .catch(err => console.error(err));
    }, [id]);

    return (
        <div>
            <p>Title: {product.title}</p>
            <p>Price: {product.price}</p>
            <p>Description: {product.description}</p>
            <Link to={`/products/${id}/edit`}>Edit</Link>
            <br />
            <DeleteButton productId={product._id} removingDOM={() => navigate("/products")} />
        </div>
    );
};

export default Detail;
