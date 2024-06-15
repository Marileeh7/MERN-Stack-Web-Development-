import { Navigate } from "react-router-dom"; // Importa el componente Navigate para la navegación
import { jwtDecode } from 'jwt-decode'; // Cambiado
 // Importa jwt-decode para decodificar el token JWT

// Componente para proteger rutas que requieren autenticación
export const Protected = ({ children }) => {
  const token = localStorage.getItem("token"); // Obtiene el token del almacenamiento local
  if (!token) {
    return (
      <Navigate to={"/"} replace={true} /> // Redirige a la página de inicio si no hay token
    );
  }
  return children; // Renderiza los hijos del componente si hay token
};

// Componente para rutas públicas
export const Public = ({ children }) => {
  const token = localStorage.getItem("token"); // Obtiene el token del almacenamiento local
  if (!token) {
    return children; // Renderiza los hijos del componente si no hay token
  }
  return (
    <Navigate to={"/"} replace={true} /> // Redirige a la página de inicio si hay token
  );
};

// Componente para proteger rutas solo accesibles por administradores
export const Admin = ({ children }) => {
  const token = localStorage.getItem("token"); // Obtiene el token del almacenamiento local
  if (!token) {
    return (
      <Navigate to={"/"} replace={true} /> // Redirige a la página de inicio si no hay token
    );
  }

  try {
    const user = jwtDecode(token); // Decodifica el token para obtener la información del usuario
    if (user.isAdmin) {
      return children; // Renderiza los hijos del componente si el usuario es administrador
    }
  } catch (error) {
    console.error("Error decoding token", error);
  }

  return (
    <Navigate to={"/"} replace={true} /> // Redirige a la página de inicio si el usuario no es administrador
  );
};
