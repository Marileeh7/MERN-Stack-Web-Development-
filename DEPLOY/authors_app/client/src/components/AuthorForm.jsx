import React, { useState, useEffect } from "react";
// Importo React y los hooks useState y useEffect para manejar el estado y los efectos secundarios en el componente.
import axios from "axios";
// Importo axios para hacer solicitudes HTTP.
import PropTypes from 'prop-types';
// Importo PropTypes para la validación de propiedades.
import { useNavigate, useParams } from 'react-router-dom';
// Importo useNavigate y useParams de react-router-dom para manejar la navegación y los parámetros de la URL.

const AuthorForm = ({ addAuthor, updateAuthor, author, setAuthor, formType }) => {
    // Aquí defino el estado local para los mensajes de error con useState. Inicialmente, todos los mensajes de error están vacíos.
    const [errorMessages, setErrorMessages] = useState({
        name: '',
        lastName: '',
        quote: ''
    });

    // Uso useNavigate para obtener la función de navegación, que me permitirá redirigir al usuario a otras rutas.
    const navigate = useNavigate();

    // Uso useParams para obtener los parámetros de la URL. Esto es útil para obtener el ID del autor cuando estoy en modo de edición.
    const params = useParams();

    // Este useEffect se ejecuta cuando el componente se monta y cada vez que cambian formType o params.id.
    useEffect(() => {
        // Si el formType es "update" y hay un id en los parámetros, hago una solicitud GET para obtener los datos del autor y llenar el formulario.
        if (formType === "update" && params.id) {
            axios.get(`http://localhost:8000/api/authors/${params.id}`)
                .then(res => setAuthor(res.data)) // Si la solicitud es exitosa, establezco los datos del autor en el estado.
                .catch(err => console.error(err)); // Si hay un error, lo registro en la consola.
        }
    }, [formType, params.id, setAuthor]); // Los efectos secundarios dependen de formType, params.id y setAuthor.

    // Esta función se ejecuta cada vez que el usuario cambia algún valor en el formulario.
    // Actualizo el estado del autor con los nuevos valores.
    const onChangeHandler = (e) => {
        setAuthor({
            ...author, // Mantengo los valores existentes del autor.
            [e.target.name]: e.target.value // Actualizo solo el campo que ha cambiado.
        });
    };

    // Esta función se ejecuta cuando el usuario envía el formulario.
    const onSubmitHandler = async (e) => {
        e.preventDefault(); // Prevengo el comportamiento predeterminado del formulario.
        try {
            if (formType === "create") { // Si el formType es "create", hago una solicitud POST para crear un nuevo autor.
                const response = await axios.post('http://localhost:8000/api/authors', author, {
                    headers: {
                        'Content-Type': 'application/json' // Especifico que el contenido de la solicitud es JSON.
                    }
                });
                addAuthor(response.data); //Llamo a la función addAuthor con los datos del nuevo autor//
                setAuthor({ name: '', lastName: '', quote: '' }); // Restablezco el formulario.
            } else if (formType === "update") { // Si el formType es "update", hago una solicitud PUT para actualizar el autor existente.
                const response = await axios.put(`http://localhost:8000/api/authors/${params.id}`, author, {
                    headers: {
                        'Content-Type': 'application/json' // Especifico que el contenido de la solicitud es JSON.
                    }
                });
                updateAuthor(response.data); // Llamo a la función updateAuthor con los datos del autor actualizado.
            }
            setErrorMessages({}); // Restablezco los mensajes de error.
            navigate('/'); // Redirijo al usuario a la página principal.
        } catch (err) {
            // Si hay un error en la solicitud, manejo los mensajes de error del servidor.
            if (err.response && err.response.data.errors) {
                const errors = err.response.data.errors;
                setErrorMessages({
                    name: errors.name ? errors.name.message : '',
                    lastName: errors.lastName ? errors.lastName.message : '',
                    quote: errors.quote ? errors.quote.message : ''
                });
            } else {
                console.error('Error submitting data:', err); // Si hay otro tipo de error, lo registro en la consola.
            }
        }
    };

    // Aquí devuelvo el JSX que renderiza el formulario.
    // Dependiendo del formType, el encabezado muestra "Edit this author" o "Add a new author".
    return (
        <div className="form-container">
            <h2>{formType === "update" ? 'Edit this author' : 'Add a new author'}</h2>
            <form onSubmit={onSubmitHandler}>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={author.name || ''} // El valor del campo de texto es el nombre del autor, o una cadena vacía si es undefined.
                        onChange={onChangeHandler} // Manejo el evento onChange con la función onChangeHandler.
                        placeholder="Enter author's name"
                        required
                    />
                    {errorMessages.name && <div className="text-danger small">{errorMessages.name}</div>} {/*Muestro el mensaje de error si existe.*/}
                </div>
                <div className="form-group">
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="lastName"
                        value={author.lastName || ''} // El valor del campo de texto es el apellido del autor, o una cadena vacía si es undefined.
                        onChange={onChangeHandler} // Manejo el evento onChange con la función onChangeHandler.
                        placeholder="Enter author's last name"
                        required
                    />
                    {errorMessages.lastName && <div className="text-danger small">{errorMessages.lastName}</div>} {/*Muestro el mensaje de error si existe*/}
                </div>
                <div className="form-group">
                    <label>Quote:</label>
                    <input
                        type="text"
                        name="quote"
                        value={author.quote || ''} //El valor del campo de texto es la cita del autor, o una cadena vacía si es undefined.
                        onChange={onChangeHandler} //Manejo el evento onChange con la función onChangeHandler.
                        placeholder="Enter author's quote"
                        required
                    />
                    {errorMessages.quote && <div className="text-danger small">{errorMessages.quote}</div>} {/*Muestro el mensaje de error si existe*/}
                </div>
                <div className="form-actions">
                    <button type="button" className="cancel-button" onClick={() => navigate('/')}>Cancel</button> {/*botón para cancelar y redirigir a la página principal.*/}
                    <button type="submit" className="submit-button">
                        {formType === "create" ? 'Add' : 'Edit'} {/*El texto del botón depende de si estamos creando o editando un autor.*/}
                    </button>
                </div>
            </form>
        </div>
    );
};

// Aquí defino las propiedades que el componente AuthorForm espera recibir.
AuthorForm.propTypes = {
    addAuthor: PropTypes.func.isRequired, // addAuthor es una función requerida.
    updateAuthor: PropTypes.func.isRequired, // updateAuthor es una función requerida.
    author: PropTypes.shape({
        name: PropTypes.string, // El nombre del autor es una cadena.
        lastName: PropTypes.string, // El apellido del autor es una cadena.
        quote: PropTypes.string, // La cita del autor es una cadena.
        _id: PropTypes.string, // El ID del autor es una cadena.
    }).isRequired, // El objeto autor es requerido.
    setAuthor: PropTypes.func.isRequired, // setAuthor es una función requerida.
    formType: PropTypes.string.isRequired // formType es una cadena requerida.
};

// Exporto el componente AuthorForm para que pueda ser utilizado en otros archivos.
export default AuthorForm;
