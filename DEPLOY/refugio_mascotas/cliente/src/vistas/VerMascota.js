// cliente/src/vistas/VerMascota.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

const BotonLink = ({ to, children, className }) => (
  <Link to={to} className={`btn ${className}`}>
    {children}
  </Link>
);

const VerMascota = () => {
  const { _id } = useParams();
  const [mascota, setMascota] = useState({});
  const [likes, setLikes] = useState(0);
  const [likeDisabled, setLikeDisabled] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/mascotas/${_id}`)
      .then(res => setMascota(res.data.mascota))
      .catch(err => console.log(err));
  }, [_id]);

  const adoptarMascota = () => {
    axios.delete(`http://localhost:8000/api/mascotas/eliminar/${_id}`)
      .then(res => {
        setMessage(`Has adoptado a ${mascota.nombre}`);
        setTimeout(() => navigate("/"), 3000);  // Navega a la página principal después de 3 segundos
      })
      .catch(err => {
        setMessage('Falló en el proceso de adopción');
      });
  };

  const incrementarLikes = () => {
    setLikes(likes + 1);
    setLikeDisabled(true);
  };

  return (
    <div>
      <h2>Detalles sobre: {mascota.nombre}</h2>
      <p>Tipo: {mascota.tipo}</p>
      <p>Descripción: {mascota.descripcion}</p>
      <p>Habilidades: {mascota.habilidadUno} {mascota.habilidadDos} {mascota.habilidadTres}</p>
      <button className="btn btn-success" onClick={adoptarMascota}>Adoptar a {mascota.nombre}</button>
      <button className="btn btn-danger" onClick={incrementarLikes} disabled={likeDisabled}>Me gusta {mascota.nombre} ({likes} Me gusta)</button>
      <BotonLink to="/" className="btn btn-primary">Volver a la lista</BotonLink>
      {message && <div className={`message ${message.includes('adoptado') ? 'success' : 'error'}`}>{message}</div>}
    </div>
  );
};

export default VerMascota;
