import React from "react";
import { FaFacebookF, FaYoutube, FaInstagram } from "react-icons/fa"; // Importa los íconos de FontAwesome para redes sociales
import { HashLink } from "react-router-hash-link"; // Importa el componente HashLink para navegación interna con hash
import { NavLink } from "react-router-dom"; // Importa el componente NavLink para navegación

const Footer = () => {
  return (
    <>
      <footer>
        <div className="footer">
          {/* Sección de enlaces de navegación */}
          <div className="footer-links">
            <h3>Links</h3>
            <ul>
              <li>
                <NavLink to={"/"}>Home</NavLink>
              </li>
              <li>
                <NavLink to={"/doctors"}>Doctors</NavLink>
              </li>
              <li>
                <NavLink to={"/appointments"}>Appointments</NavLink>
              </li>
              <li>
                <NavLink to={"/notifications"}>Notifications</NavLink>
              </li>
              <li>
                <HashLink to={"/#contact"}>Contact Us</HashLink>
              </li>
              <li>
                <NavLink to={"/profile"}>Profile</NavLink>
              </li>
            </ul>
          </div>
          {/* Sección de enlaces a redes sociales */}
          <div className="social">
            <h3>Social links</h3>
            <ul>
              <li className="facebook">
                <a
                  href="https://www.facebook.com/"
                  target={"_blank"}
                  rel="noreferrer"
                >
                  <FaFacebookF />
                </a>
              </li>
              <li className="youtube">
                <a
                  href="https://www.youtube.com/"
                  target={"_blank"}
                  rel="noreferrer"
                >
                  <FaYoutube />
                </a>
              </li>
              <li className="instagram">
                <a
                  href="https://www.instagram.com/"
                  target={"_blank"}
                  rel="noreferrer"
                >
                  <FaInstagram />
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* Sección de pie de página */}
        <div className="footer-bottom">
          Made by MLRC © {new Date().getFullYear()}
        </div>
      </footer>
    </>
  );
};

export default Footer; // Exporta el componente Footer como el valor por defecto de este módulo
