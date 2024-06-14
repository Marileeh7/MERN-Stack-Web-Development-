import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

const container = document.getElementById('root');
const root = createRoot(container); // crea una raíz utilizando el contenedor

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
