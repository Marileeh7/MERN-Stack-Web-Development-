// cliente/src/componentes/InfoMascota.js
import React from 'react';
import { Link } from 'react-router-dom';

const BotonLink = ({ to, children, className }) => (
  <Link to={to} className={`btn ${className}`}>
    {children}
  </Link>
);

const InfoMascota = (props) => {
  const { mascota } = props;

  return (
    <tr>
      <td>{mascota.nombre}</td>
      <td>{mascota.tipo}</td>
      <td>
        <BotonLink to={`/mascotas/${mascota._id}`} className="btn-primary view-btn">Ver</BotonLink>
        <BotonLink to={`/mascotas/actualizar/${mascota._id}`} className="btn-primary update-btn">Editar</BotonLink>
      </td>
    </tr>
  );
};

export default InfoMascota;
