import axios from "axios";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { baseURL } from "../../config";

const UserRegister = (props) => {
    const [data, setData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password2: ''
    });
    const [errors, setErrors] = useState({});

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
        if (!checkPasswords()) return;

        axios.post(`${baseURL}/users/register`, data)
            .then((response) => {
                setData({
                    first_name: '',
                    last_name: '',
                    email: '',
                    password: '',
                    password2: ''
                });
                setErrors({});
                console.log("Success");
                // alert("Usuario creado exitosamente");
            })
            .catch((error) => {
                setErrors(error.response?.data?.error || { message: "Error al registrar usuario" });
            });
    };

    const changeHandler = (e) => {
        let new_data = {
            ...data,
            [e.target.name]: e.target.value
        };
        setData(new_data);
    };

    return (
        <form onSubmit={createUser}>
            <h1>Registrar</h1>
            <div className="form-text text-danger fw-bold fs-5">{errors["message"]}</div>
            <div className="mt-3 px-2">
                <label className="form-label">First Name</label>
                <input required className="form-control" type="text" name="first_name" value={data["first_name"]} onChange={changeHandler} />
                <div className="form-text text-danger fw-bold">{errors["first_name"]}</div>
            </div>
            <div className="mt-3 px-2">
                <label className="form-label">Last Name</label>
                <input required className="form-control" type="text" name="last_name" onChange={changeHandler} value={data["last_name"]} />
                <div className="form-text text-danger fw-bold">{errors["last_name"]}</div>
            </div>
            <div className="mt-3 px-2">
                <label className="form-label">Email</label>
                <input required className="form-control" type="email" name="email" onChange={changeHandler} value={data["email"]} />
                <div className="form-text text-danger fw-bold">{errors["email"]}</div>
            </div>
            <div className="mt-3 px-2">
                <label className="form-label">Password</label>
                <input required className="form-control" type="password" name="password" onChange={changeHandler} value={data["password"]} />
                <div className="form-text text-danger fw-bold">{errors["password"]}</div>
            </div>
            <div className="mt-3 px-2">
                <label className="form-label">Repeat Password</label>
                <input required className="form-control" type="password" name="password2" onChange={changeHandler} value={data["password2"]} />
                <div className="form-text text-danger fw-bold">{errors["password2"]}</div>
            </div>
            <div className="mt-3">
                <Button type="submit" className="submit-button">Register</Button>
            </div>
        </form>
    );
};

export default UserRegister;
