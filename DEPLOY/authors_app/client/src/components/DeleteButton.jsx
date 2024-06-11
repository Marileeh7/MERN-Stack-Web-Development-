import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const DeleteButton = ({ author, changeStyle, removeAuthorFromList }) => {
    const deleteAuthor = (authorID) => {
        axios.delete(`https://my-authors.vercel.app/api/authors/${authorID}`)
            .then(res => {
                removeAuthorFromList(authorID);
                console.log(res);
            })
            .catch(err => console.log(err));
    };

    return (
        <button
            className={changeStyle ? "mx-2 btn btn-outline-danger" : "mx-1 btn btn-outline-danger btn-sm py-0"}
            onClick={() => deleteAuthor(author._id)}
        >
            Delete
        </button>
    );
};

DeleteButton.propTypes = {
    author: PropTypes.object.isRequired,
    changeStyle: PropTypes.bool.isRequired,
    removeAuthorFromList: PropTypes.func.isRequired
};

export default DeleteButton;
