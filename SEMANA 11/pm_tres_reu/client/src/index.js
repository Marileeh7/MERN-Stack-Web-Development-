import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';  // Importo el CSS combinado
import ProductManager from './components/ProductManager';

// Renderizo la aplicación principal dentro del elemento con id 'root'
const container = document.getElementById('root'); // Obtengo el elemento del DOM con id 'root'
const root = createRoot(container); // Creo un root para React utilizando el contenedor obtenido

root.render(
  <React.StrictMode>
    <ProductManager /> {/* Renderizo el componente principal ProductManager */}
  </React.StrictMode>
);
