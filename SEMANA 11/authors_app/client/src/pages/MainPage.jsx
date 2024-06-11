import React from 'react';
import { Link } from "react-router-dom";
import AuthorTable from '../components/AuthorTable';

const MainPage = () => {
    return (
        <main className="container mt-3">
            <h2>Favorite Authors</h2>
            <Link to="/new" className="link-button">Add an author</Link>
            <p>We have quotes by:</p>
            <AuthorTable />
        </main>
    );
};

export default MainPage;
