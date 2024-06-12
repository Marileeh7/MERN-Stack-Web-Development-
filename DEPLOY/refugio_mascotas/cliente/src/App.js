// cliente/src/App.js
import React, { useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Principal from './vistas/Principal';
import AgregarMascota from './vistas/AgregarMascota';
import VerMascota from './vistas/VerMascota';
import ActualizarMascota from './vistas/ActualizarMascota';
import io from 'socket.io-client';

const socket = io("http://localhost:8000");

const BotonLink = ({ to, children, className }) => (
  <Link to={to} className={`btn ${className}`}>
    {children}
  </Link>
);

const App = () => {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Conectado a Socket.io");
    });
    socket.on("disconnect", () => {
      console.log("Desconectado de Socket.io");
    });
    socket.on("nueva_mascota", (nuevaMascota) => {
      console.log("Nueva mascota agregada:", nuevaMascota);
    });
    socket.on("mascota_eliminada", (idMascota) => {
      console.log("Mascota eliminada:", idMascota);
    });
  }, []);

  return (
    <Router>
      <div className="nav">
        <h1 className="site-title">Refugio de Mascotas</h1>
        <BotonLink to="/mascotas/nueva" className="btn-primary create-btn">Agregar una Mascota</BotonLink>
      </div>
      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/mascotas/nueva" element={<AgregarMascota />} />
        <Route path="/mascotas/:_id" element={<VerMascota />} />
        <Route path="/mascotas/actualizar/:_id" element={<ActualizarMascota />} />
      </Routes>
    </Router>
  );
};

export default App;
