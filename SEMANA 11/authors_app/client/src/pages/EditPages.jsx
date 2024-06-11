import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import AuthorForm from '../components/AuthorForm';

const EditPage = () => {
    const [author, setAuthor] = useState({ name: '', lastName: '', quote: '' });
    const [authorExist, setAuthorExist] = useState(false);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/authors/${params.id}`)
            .then(res => {
                setAuthor(res.data);
                setAuthorExist(true);
            })
            .catch(err => {
                console.log(err);
                setAuthorExist(false);
            });
    }, [params.id]);

    return (
        <main className="container mt-3">
            {authorExist ? (
                <>
                    <h2>Favorite Authors</h2>
                    <Link to="/" className="link-button">Home</Link>

                    <AuthorForm formType={"update"} author={author} setAuthor={setAuthor} />
                </>
            ) : (
                <>
                    <p>We're sorry, but we could not find the author you are looking for. Would you like to add an author to our database?</p>
                    <Link to="/new" className="link-button">Add New Author</Link>
                </>
            )}
        </main>
    );
};

export default EditPage;
