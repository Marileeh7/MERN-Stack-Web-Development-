import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../redux/reducers/rootSlice";
import { FiMenu } from "react-icons/fi"; // Importa el icono de menú
import { RxCross1 } from "react-icons/rx"; // Importa el icono de cerrar
import { jwtDecode } from "jwt-decode"; // Importación correcta

const Navbar = () => {
  const [iconActive, setIconActive] = useState(false); // Estado para manejar el icono del menú
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token") || ""); // Estado para almacenar el token
  const [user, setUser] = useState(
    localStorage.getItem("token")
      ? jwtDecode(localStorage.getItem("token")) // Decodifica el token JWT correctamente
      : ""
  );

  // Función para manejar el cierre de sesión
  const logoutFunc = () => {
    dispatch(setUserInfo({})); // Restablece la información del usuario en el estado global
    localStorage.removeItem("token"); // Elimina el token del almacenamiento local
    navigate("/login"); // Navega a la página de inicio de sesión
  };

  return (
    <header>
      <nav className={iconActive ? "nav-active" : ""}>
        <h2 className="nav-logo">
          <NavLink to={"/"}>HealthBooker</NavLink> {/* Enlace al inicio */}
        </h2>
        <ul className="nav-links">
          <li>
            <NavLink to={"/"}>Home</NavLink> {/* Enlace a Home */}
          </li>
          <li>
            <NavLink to={"/doctors"}>Doctors</NavLink> {/* Enlace a Doctors */}
          </li>
          {token && user.isAdmin && (
            <li>
              <NavLink to={"/dashboard/users"}>Dashboard</NavLink> {/* Enlace a Dashboard */}
            </li>
          )}
          {token && !user.isAdmin && (
            <>
              <li>
                <NavLink to={"/appointments"}>Appointments</NavLink> {/* Enlace a Appointments */}
              </li>
              <li>
                <NavLink to={"/notifications"}>Notifications</NavLink> {/* Enlace a Notifications */}
              </li>
              <li>
                <NavLink to={"/applyfordoctor"}>Apply for doctor</NavLink> {/* Enlace a Apply for doctor */}
              </li>
              <li>
                <HashLink to={"/#contact"}>Contact Us</HashLink> {/* Enlace a Contact Us */}
              </li>
              <li>
                <NavLink to={"/profile"}>Profile</NavLink> {/* Enlace a Profile */}
              </li>
            </>
          )}
          {!token ? (
            <>
              <li>
                <NavLink className="btn" to={"/login"}>
                  Login {/* Enlace a Login */}
                </NavLink>
              </li>
              <li>
                <NavLink className="btn" to={"/register"}>
                  Register {/* Enlace a Register */}
                </NavLink>
              </li>
            </>
          ) : (
            <li>
              <span className="btn" onClick={logoutFunc}>
                Logout {/* Botón de Logout */}
              </span>
            </li>
          )}
        </ul>
      </nav>
      <div className="menu-icons">
        {!iconActive && (
          <FiMenu
            className="menu-open"
            onClick={() => {
              setIconActive(true); // Abre el menú
            }}
          />
        )}
        {iconActive && (
          <RxCross1
            className="menu-close"
            onClick={() => {
              setIconActive(false); // Cierra el menú
            }}
          />
        )}
      </div>
    </header>
  );
};

export default Navbar; // Exporta el componente Navbar como el valor por defecto de este módulo
