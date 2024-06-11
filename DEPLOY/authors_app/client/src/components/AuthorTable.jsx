import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';
import DeleteButton from './DeleteButton';

const AuthorTable = () => {
    const [authorsList, setAuthorsList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getAllAuthors();
    }, []);

    const getAllAuthors = async () => {
        await axios.get('https://my-authors.vercel.app/api/authors')
            .then(res => {
                setAuthorsList(_.orderBy(res.data, ['name'], ['asc']));
            })
            .catch(err => console.log(err));
    };

    const removeAuthorFromList = (authorId) => {
        setAuthorsList(authorsList.filter(author => author._id !== authorId));
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredAuthors = authorsList.filter(author =>
        `${author.name} ${author.lastName} ${author.quote} ${author._id}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="author-list">
            <input
                type="search"
                placeholder="Search for an author"
                value={searchTerm}
                onChange={handleSearch}
                className="form-control my-3"
            />
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Author</th>
                        <th>Last Name</th>
                        <th>Quote</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAuthors.map((author, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{author.name}</td>
                            <td>{author.lastName}</td>
                            <td>{author.quote}</td>
                            <td>
                                <Link className="link-button me-1" to={`/edit/${author._id}`}>Edit</Link>
                                <DeleteButton author={author} changeStyle={false} removeAuthorFromList={removeAuthorFromList} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AuthorTable;

