// cliente/src/vistas/Principal.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfoMascota from '../componentes/InfoMascota';

const Principal = () => {
  const [mascotas, setMascotas] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/mascotas")
      .then(res => setMascotas(res.data.mascotas))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h2>Lista de mascotas:</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Nombre:</th>
            <th>Tipo:</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {mascotas.map((mascota, index) => (
            <InfoMascota key={index} mascota={mascota} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Principal;
