import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';  // Importo el CSS combinado
import ProductManager from './components/ProductManager';

// Renderizo la aplicación principal dentro del elemento con id 'root'
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ProductManager />
  </React.StrictMode>
);
