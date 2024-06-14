// cliente/src/vistas/ActualizarMascota.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormularioMascota from '../componentes/FormularioMascota';
import { useNavigate, useParams } from 'react-router-dom';

const ActualizarMascota = () => {
  const { _id } = useParams();
  const [form, setForm] = useState({
    nombre: '',
    tipo: '',
    descripcion: '',
    habilidadUno: '',
    habilidadDos: '',
    habilidadTres: '',
  });

  const [error, setError] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/mascotas/${_id}`)
      .then(res => setForm(res.data.mascota))
      .catch(err => console.log(err));
  }, [_id]);

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8000/api/mascotas/actualizar/${_id}`, form)
      .then(res => {
        console.log(res);
        if (res.data.error) {
          setError(res.data.error.errors);
        } else {
          navigate('/');
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h2>Actualizar Mascota</h2>
      <FormularioMascota
        form={form}
        onChangeHandler={onChangeHandler}
        onSubmitHandler={onSubmitHandler}
        error={error}
      />
    </div>
  );
};

export default ActualizarMascota;
