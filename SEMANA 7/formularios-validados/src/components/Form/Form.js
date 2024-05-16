import React, { useReducer } from 'react';
import './Form.css';

const initialState = {
    firstName: { value: '', error: null },
    lastName: { value: '', error: null },
    email: { value: '', error: null }
};

function reducer(state, action) {
    switch (action.type) {
        case 'SET_VALUE':
            return {
                ...state,
                [action.field]: { ...state[action.field], value: action.payload }
            };
        case 'SET_ERROR':
            return {
                ...state,
                [action.field]: { ...state[action.field], error: action.payload }
            };
        default:
            return state;
    }
}

const validateEmail = email => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email) ? null : 'El correo no es válido';
};

const isRequired = value => (value ? null : 'Este campo es requerido');

function Form() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch({ type: 'SET_VALUE', field: name, payload: value });
        
        let error = isRequired(value);
        if (name === 'email') error = validateEmail(value);
        dispatch({ type: 'SET_ERROR', field: name, payload: error });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(state);
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <input
                className="form-input"
                name="firstName"
                value={state.firstName.value}
                onChange={handleChange}
                placeholder="Nombre"
            />
            {state.firstName.error && <p className="error">{state.firstName.error}</p>}
            
            <input
                className="form-input"
                name="lastName"
                value={state.lastName.value}
                onChange={handleChange}
                placeholder="Apellido"
            />
            {state.lastName.error && <p className="error">{state.lastName.error}</p>}
            
            <input
                className="form-input"
                name="email"
                value={state.email.value}
                onChange={handleChange}
                placeholder="Correo electrónico"
            />
            {state.email.error && <p className="error">{state.email.error}</p>}
            
            <button type="submit" className="form-button">Enviar</button>
        </form>
    );
}

export default Form;
