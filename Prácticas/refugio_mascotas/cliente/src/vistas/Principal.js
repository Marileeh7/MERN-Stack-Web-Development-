// cliente/src/vistas/Principal.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfoMascota from '../componentes/InfoMascota';

const Principal = ({ mascotas, setMascotas }) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    axios.get('http://localhost:8000/api/mascotas')
      .then(res => setMascotas(res.data.mascotas.sort((a, b) => a.tipo.localeCompare(b.tipo))))
      .catch(err => console.log(err));
  }, [setMascotas]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const filteredMascotas = mascotas.filter(mascota =>
    mascota.nombre.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h2>Lista de mascotas:</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar mascota por nombre..."
          value={query}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredMascotas.map((mascota, index) => (
            <InfoMascota key={index} mascota={mascota} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Principal;
