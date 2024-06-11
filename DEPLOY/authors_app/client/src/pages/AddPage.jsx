import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import AuthorForm from '../components/AuthorForm';

const AddPage = () => {
    const [author, setAuthor] = useState({ name: '', lastName: '', quote: '' });
    const navigate = useNavigate();

    return (
        <main className="container mt-3">
            <h2>Favorite Authors</h2>
            <button className="link-button" onClick={() => navigate('/')}>Home</button>
            <p>Add a new author:</p>
            <AuthorForm formType={"create"} author={author} setAuthor={setAuthor} />
        </main>
    );
};

export default AddPage;
