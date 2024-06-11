import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AuthorList from './AuthorList';
import AuthorDetail from './AuthorDetail';
import AddPage from '../pages/AddPage';
import EditPage from '../pages/EditPage';
import axios from 'axios';
import _ from 'lodash';

const AuthorManager = () => {
    const [authors, setAuthors] = useState([]);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        axios.get('https://my-authors.vercel.app/api/authors')
            .then(res => {
                const sortedAuthors = _.orderBy(res.data, ['name'], ['asc']);
                setAuthors(sortedAuthors);
                setError(null);
            })
            .catch(err => {
                console.error(err);
                setError('Error loading authors');
            });
    }, []);

    const addAuthor = (newAuthor) => {
        setAuthors([...authors, newAuthor]);
    };

    const updateAuthor = (updatedAuthor) => {
        setAuthors(authors.map(author =>
            author._id === updatedAuthor._id ? updatedAuthor : author
        ));
    };

    const removeAuthor = (id) => {
        axios.delete(`https://my-authors.vercel.app/api/authors/${id}`)
            .then(() => {
                setAuthors(authors.filter(author => author._id !== id));
            })
            .catch(err => {
                console.error(err);
                setError('Error removing author');
            });
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredAuthors = authors.filter(author =>
        `${author.name} ${author.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Router>
            <div className="container">
                <input
                    type="text"
                    placeholder="Search for an author"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="form-control my-3"
                />
                <Routes>
                    <Route path="/" element={
                        <>
                            <AuthorList authors={filteredAuthors} removeAuthor={removeAuthor} />
                        </>
                    } />
                    <Route path="/new" element={<AddPage addAuthor={addAuthor} />} />
                    <Route path="/authors/:id" element={<AuthorDetail />} />
                    <Route path="/edit/:id" element={<EditPage updateAuthor={updateAuthor} />} />
                </Routes>
            </div>
        </Router>
    );
};

export default AuthorManager;
