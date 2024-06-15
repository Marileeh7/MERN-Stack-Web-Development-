import React from "react";
import {
  FaHome,
  FaList,
  FaUser,
  FaUserMd,
  FaUsers,
  FaEnvelope,
} from "react-icons/fa"; // Importa iconos de FontAwesome para la barra lateral
import { NavLink, useNavigate } from "react-router-dom"; // Importa NavLink y useNavigate para la navegación
import { MdLogout } from "react-icons/md"; // Importa el icono de logout de Material Design Icons
import { useDispatch } from "react-redux"; // Importa useDispatch de react-redux
import { setUserInfo } from "../redux/reducers/rootSlice"; // Importa la acción setUserInfo de rootSlice

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Define los elementos de la barra lateral
  const sidebar = [
    {
      name: "Home",
      path: "/",
      icon: <FaHome />,
    },
    {
      name: "Users",
      path: "/dashboard/users",
      icon: <FaUsers />,
    },
    {
      name: "Doctors",
      path: "/dashboard/doctors",
      icon: <FaUserMd />,
    },
    {
      name: "Appointments",
      path: "/dashboard/appointments",
      icon: <FaList />,
    },
    {
      name: "Applications",
      path: "/dashboard/applications",
      icon: <FaEnvelope />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <FaUser />,
    },
  ];

  // Función para manejar el cierre de sesión
  const logoutFunc = () => {
    dispatch(setUserInfo({})); // Restablece la información del usuario en el estado global
    localStorage.removeItem("token"); // Elimina el token del almacenamiento local
    navigate("/login"); // Navega a la página de inicio de sesión
  };

  return (
    <>
      <section className="sidebar-section flex-center">
        <div className="sidebar-container">
          <ul>
            {sidebar.map((ele, i) => {
              return (
                <li key={i}>
                  {ele.icon}
                  <NavLink to={ele.path}>{ele.name}</NavLink> {/* Enlace de navegación */}
                </li>
              );
            })}
          </ul>
          <div className="logout-container">
            <MdLogout />
            <p onClick={logoutFunc}>Logout</p> {/* Botón de logout */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Sidebar; // Exporta el componente Sidebar como el valor por defecto de este módulo
