import { useState } from "react";
import axios from "axios";
import { baseURL } from "../../config";
import "../../App.css"; // Asegúrate de importar los estilos globales

const UserRegister = (props) => {
    const [data, setData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password2: ""
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState(""); // Estado para el mensaje de éxito

    const checkPasswords = () => {
        const { password, password2 } = data;
        if (password === password2) {
            let tmp = { ...errors };
            delete tmp["password2"];
            setErrors(tmp);
            return true;
        } else {
            setErrors({
                ...errors,
                password2: "Las passwords no coinciden"
            });
            return false;
        }
    };

    const createUser = (e) => {
        e.preventDefault();
        if (!checkPasswords()) {
            return;
        }
        axios.post(`${baseURL}/users/register`, data)
            .then((response) => {
                setData({
                    first_name: "",
                    last_name: "",
                    email: "",
                    password: "",
                    password2: ""
                });
                setErrors({});
                setSuccessMessage("Usuario registrado exitosamente"); // Establecer el mensaje de éxito
                console.log("Usuario creado exitosamente");
            })
            .catch((error) => {
                setSuccessMessage(""); // Limpiar el mensaje de éxito en caso de error
                if (error.response && error.response.data) {
                    setErrors(error.response.data.error);
                } else {
                    console.error("Error de respuesta del servidor:", error);
                    setErrors({ message: "Error al procesar la solicitud. Por favor, inténtalo nuevamente más tarde." });
                }
            });
    };

    const changeHandler = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    return (
        <form onSubmit={createUser}>
            <h1>Registrar</h1>
            {successMessage && <div className="form-text text-success fw-bold fs-5">{successMessage}</div>} {/* Mostrar el mensaje de éxito */}
            <div className="form-text text-danger fw-bold fs-5">{errors?.message}</div>
            <div className="mt-3 px-2">
                <label className="form-label">First Name</label>
                <input required className="form-control" type="text" name="first_name" value={data["first_name"]} onChange={changeHandler} />
                <div className="form-text text-danger fw-bold">{errors?.first_name}</div>
            </div>
            <div className="mt-3 px-2">
                <label className="form-label">Last Name</label>
                <input required className="form-control" type="text" name="last_name" onChange={changeHandler} value={data["last_name"]} />
                <div className="form-text text-danger fw-bold">{errors?.last_name}</div>
            </div>
            <div className="mt-3 px-2">
                <label className="form-label">Email</label>
                <input required className="form-control" type="email" name="email" onChange={changeHandler} value={data["email"]} />
                <div className="form-text text-danger fw-bold">{errors?.email}</div>
            </div>
            <div className="mt-3 px-2">
                <label className="form-label">Password</label>
                <input required className="form-control" type="password" name="password" onChange={changeHandler} value={data["password"]} />
                <div className="form-text text-danger fw-bold">{errors?.password}</div>
            </div>
            <div className="mt-3 px-2">
                <label className="form-label">Repeat Password</label>
                <input required className="form-control" type="password" name="password2" onChange={changeHandler} value={data["password2"]} />
                <div className="form-text text-danger fw-bold">{errors?.password2}</div>
            </div>
            <div className="mt-3">
                <button type="submit" className="btn btn-primary submit-button">Register</button>
            </div>
        </form>
    );
};

export default UserRegister;
