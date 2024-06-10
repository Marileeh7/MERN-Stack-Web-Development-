import React, { useState } from 'react';
import axios from 'axios';


const ProductForm = () => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState({});

    const validate = () => {
        const errors = {};
        if (!title) errors.title = "Title is required";
        if (!price) errors.price = "Price is required";
        if (price && isNaN(price)) errors.price = "Price must be a number";
        if (!description) errors.description = "Description is required";
        return errors;
    };

    const onSubmitHandler = e => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            axios.post('http://localhost:8000/api/products', {
                title,
                price,
                description
            })
                .then(res => {
                    console.log(res);
                    setTitle("");
                    setPrice("");
                    setDescription("");
                    setErrors({});
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <form onSubmit={onSubmitHandler}>
            <h2>Product Manager</h2>
            <div className="form-container">
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        placeholder="Enter product title"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                    {errors.title && <span>{errors.title}</span>}
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input
                        type="text"
                        placeholder="Enter product price"
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                    />
                    {errors.price && <span>{errors.price}</span>}
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <input
                        type="text"
                        placeholder="Enter product description"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                    />
                    {errors.description && <span>{errors.description}</span>}
                </div>
            </div>
            <input type="submit" value="Create" />
        </form>
    );
}

export default ProductForm;
