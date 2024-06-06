import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import DeleteButton from "../components/DeleteButton";
import ProductForm from "../components/ProductForm";

// Este componente maneja la actualización de un producto
const Update = () => {
    const { id } = useParams(); // Extrae el parámetro 'id' de la URL
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate(); // Hook para navegar programáticamente

    useEffect(() => {
        // Obtiene los datos del producto por id
        axios.get(`http://localhost:8000/api/products/${id}`)
            .then(res => {
                setTitle(res.data.title);
                setPrice(res.data.price);
                setDescription(res.data.description);
                setLoaded(true);
            })
            .catch(err => console.log(err));
    }, [id]); // La dependencia 'id' asegura que este efecto se ejecute cuando cambie el id

    const updating = (product) => {
        // Envía una solicitud PUT para actualizar el producto
        axios.put(`http://localhost:8000/api/products/${id}`, product)
            .then(res => {
                console.log(res);
                navigate("/products"); // Navega a la lista de productos después de la actualización
            });
    }

    return (
        <div>
            <h1>Edit Product Details</h1>
            {/* Muestra el formulario solo cuando los datos han sido cargados */}
            {loaded && <ProductForm titleIn={title} priceIn={price} descriptionIn={description} submitProduct={updating} />}
            <DeleteButton productId={id} removingDOM={() => navigate("/products")} />
        </div>
    );
}

export default Update;
