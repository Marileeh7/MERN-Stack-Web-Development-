import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';

const Main = () => {
    // Defino los estados para los productos y para saber si los datos ya se cargaron
    const [products, setProducts] = useState([]);
    const [loaded, setLoaded] = useState(false);

    // Utilizo useEffect para cargar los productos al montar el componente
    useEffect(() => {
        axios.get('http://localhost:8000/api/products')
            .then(res => {
                setProducts(res.data);
                setLoaded(true); // Indico que los datos se han cargado
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h1>Product Manager</h1>
            <ProductForm /> {/* Formulario para crear un nuevo producto */}
            <hr />
            {loaded && <ProductList products={products} />} {/* Lista de productos cargados */}
        </div>
    );
}

export default Main;
