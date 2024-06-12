// cliente/src/App.js
import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Principal from './vistas/Principal';
import AgregarMascota from './vistas/AgregarMascota';
import VerMascota from './vistas/VerMascota';
import ActualizarMascota from './vistas/ActualizarMascota';
import io from 'socket.io-client';
import axios from 'axios';

// Configura Axios para enviar credenciales
axios.defaults.withCredentials = true;

// Asegúrate de que la URL del servidor Socket.IO sea correcta
const socket = io('http://localhost:8000', {
  transports: ['websocket'],
  pingInterval: 25000,
  pingTimeout: 20000,
  withCredentials: true
});

const BotonLink = ({ to, children, className }) => (
  <Link to={to} className={`btn ${className}`}>
    {children}
  </Link>
);

const App = () => {
  const [mascotas, setMascotas] = useState([]);

  useEffect(() => {
    // Configuración de los eventos de Socket.IO
    socket.on('connect', () => {
      console.log('Conectado a Socket.IO');
    });

    socket.on('disconnect', () => {
      console.log('Desconectado de Socket.IO');
    });

    socket.on('nueva_mascota', (nuevaMascota) => {
      setMascotas(prevMascotas => [...prevMascotas, nuevaMascota]);
    });

    socket.on('actualizar_mascota', (mascotaActualizada) => {
      setMascotas(prevMascotas =>
        prevMascotas.map(mascota =>
          mascota._id === mascotaActualizada._id ? mascotaActualizada : mascota
        )
      );
    });

    socket.on('mascota_eliminada', (idMascota) => {
      setMascotas(prevMascotas =>
        prevMascotas.filter(mascota => mascota._id !== idMascota)
      );
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('nueva_mascota');
      socket.off('actualizar_mascota');
      socket.off('mascota_eliminada');
    };
  }, []);

  return (
    <Router>
      <div className="nav">
        <h1 className="site-title">Refugio de Mascotas</h1>
        <BotonLink to="/mascotas/nueva" className="btn-primary create-btn">Agregar una Mascota</BotonLink>
      </div>
      <Routes>
        <Route path="/" element={<Principal mascotas={mascotas} setMascotas={setMascotas} />} />
        <Route path="/mascotas/nueva" element={<AgregarMascota />} />
        <Route path="/mascotas/:_id" element={<VerMascota />} />
        <Route path="/mascotas/actualizar/:_id" element={<ActualizarMascota />} />
      </Routes>
    </Router>
  );
};

export default App;
