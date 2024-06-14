import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [inputs, setInputs] = useState({ correo: "", contraseña: "" });
  const [mensaje, setMensaje] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { correo, contraseña } = inputs;

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (correo !== "" && contraseña !== "") {
      const usuario = { correo, contraseña };
      setLoading(true);
      await axios
        .post("http://localhost:4000/login", usuario)
        .then((res) => {
          const { data } = res;
          setMensaje(data.mensaje);
          setTimeout(() => {
            setMensaje("");
            localStorage.setItem("token", data?.usuario.token);
            navigate(`/welcome`);
          }, 1500);
        })
        .catch((error) => {
          console.error(error);
          setMensaje("Correo o contraseña incorrecta");
          setTimeout(() => setMensaje(""), 1500);
        });
      setInputs({ correo: "", contraseña: "" });
      setLoading(false);
    }
  };

  return (
    <div className="formContainer">
      <h3>Bienvenido a la página</h3>
      <h2>De Inicio de Sesión!</h2>
      <form onSubmit={onSubmit}>
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
          {loading ? "Cargando..." : "Iniciar Sesión"}
        </button>
        <p>
          ¿Aún no tienes cuenta?{" "}
          <b onClick={() => navigate("/")}>¡Regístrate!</b>
        </p>
      </form>
      {mensaje && <div className="toast">{mensaje}</div>}
    </div>
  );
};

export default Login;
