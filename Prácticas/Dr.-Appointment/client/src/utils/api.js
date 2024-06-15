// src/utils/api.js
import axios from 'axios';

// Configuración de axios
const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_DOMAIN || 'http://localhost:5000',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

// Función para obtener datos
async function fetchData(url) {
  try {
    const response = await instance.get(url);

    // Verifica el estado de respuesta exitoso (generalmente 200-299)
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(`Error fetching data: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Relanza el error para manejarlo en el componente
  }
}

export default axios; // Exporta axios como valor por defecto
export { fetchData };
