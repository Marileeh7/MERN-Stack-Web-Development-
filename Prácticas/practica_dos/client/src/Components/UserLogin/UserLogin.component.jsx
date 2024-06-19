import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../config";
import "../../App.css"; // Asegúrate de importar los estilos globales

const UserLogin = (props) => {
    const [data, setData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const loginUser = (e) => {
        e.preventDefault();
    
        axios.post(`${baseURL}/users/login`, data, { withCredentials: true })
            .then((response) => {
                setData({ email: "", password: "" });
                setErrors({});
                props.setUser(response.data.user);
                navigate("/pirates/");
            })
            .catch((error) => {
                if (error.response && error.response.data) {
                    setErrors(error.response.data.error || { message: "Error desconocido" });
                } else {
                    console.error("Error de respuesta del servidor:", error);
                    setErrors({ message: "Error al procesar la solicitud. Por favor, inténtalo nuevamente más tarde." });
                }
            });
    }

    const changeHandler = (e) => {
        let new_data = {
            ...data,
            [e.target.name]: e.target.value
        };
        setData(new_data);
    }

    return (
        <form onSubmit={loginUser}>
            <h1>Login</h1>
            <div className="form-text text-danger fw-bold fs-5">{errors?.message}</div>
            <hr />
            <div className="mt-3 px-2">
                <label className="form-label">Email</label>
                <input required className="form-control" type="email" name="email" onChange={changeHandler} value={data.email} />
                <div className="form-text text-danger fw-bold">{errors?.email}</div>
            </div>
            <div className="mt-3 px-2">
                <label className="form-label">Password</label>
                <input required className="form-control" type="password" name="password" onChange={changeHandler} value={data.password} />
                <div className="form-text text-danger fw-bold">{errors?.password}</div>
            </div>
            <div className="mt-3">
                <button type="submit" className="btn btn-primary submit-button">Login</button>
            </div>
        </form>
    );
}

export default UserLogin;
