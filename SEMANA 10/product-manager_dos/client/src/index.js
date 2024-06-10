import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';  // Importar el CSS combinado
import ProductManager from './components/ProductManager';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ProductManager />
  </React.StrictMode>
);
