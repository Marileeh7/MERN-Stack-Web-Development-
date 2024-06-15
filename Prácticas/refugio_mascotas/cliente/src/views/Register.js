import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [inputs, setInputs] = useState({
    correo: "",
    nombre: "",
    contraseña: ""
  });
  const [mensaje, setMensaje] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { nombre, contraseña, correo } = inputs;

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (nombre !== "" && contraseña !== "" && correo !== "") {
      const usuario = { nombre, correo, contraseña };
      setLoading(true);
      await axios
        .post("http://localhost:8000/api/auth/register", usuario)
        .then((res) => {
          const { data } = res;
          setMensaje(data.mensaje);
          setInputs({ nombre: "", contraseña: "", correo: "" });
          setTimeout(() => {
            setMensaje("");
            navigate("/login");
          }, 1500);
        })
        .catch((error) => {
          console.error(error);
          setMensaje("Hubo un error");
          setTimeout(() => setMensaje(""), 1500);
        });

      setLoading(false);
    }
  };

  return (
    <div className="formContainer">
      <h3>Bienvenido a la página</h3>
      <h2>De Registro!</h2>
      <form onSubmit={onSubmit}>
        <div className="inputContainer">
          <div className="left">
            <label htmlFor="nombre">Nombre</label>
            <input
              onChange={handleChange}
              value={nombre}
              name="nombre"
              id="nombre"
              type="text"
              placeholder="Nombre..."
              autoComplete="off"
            />
          </div>
        </div>
        <div className="inputContainer">
          <div className="left">
            <label htmlFor="correo">Correo</label>
            <input
              onChange={handleChange}
              value={correo}
              name="correo"
              id="correo"
              type="email"
              placeholder="Correo..."
              autoComplete="off"
            />
          </div>
        </div>
        <div className="inputContainer">
          <div className="left">
            <label htmlFor="contraseña">Contraseña</label>
            <input
              onChange={handleChange}
              value={contraseña}
              name="contraseña"
              id="contraseña"
              type="password"
              placeholder="Contraseña..."
              autoComplete="off"
            />
          </div>
        </div>
        <button type="submit">
          {loading ? "Cargando..." : "Registrarme"}
        </button>
        <p>
          ¿Ya tienes una cuenta?{" "}
          <b onClick={() => navigate("/login")}>¡Inicia Sesión!</b>
        </p>
      </form>
      {mensaje && <div className="toast">{mensaje}</div>}
    </div>
  );
};

export default Register;
