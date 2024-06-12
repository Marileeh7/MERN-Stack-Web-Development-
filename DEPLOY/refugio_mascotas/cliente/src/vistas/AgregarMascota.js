// cliente/src/vistas/AgregarMascota.js
import React, { useState } from 'react';
import axios from 'axios';
import FormularioMascota from '../componentes/FormularioMascota';
import { useNavigate } from 'react-router-dom';

const AgregarMascota = () => {
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

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/api/mascotas/nueva", form)
      .then(res => {
        if (res.data.error) {
          setError(res.data.error.errors);
        } else {
          setForm({
            nombre: '',
            tipo: '',
            descripcion: '',
            habilidadUno: '',
            habilidadDos: '',
            habilidadTres: '',
          });
          navigate('/');
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      
      <FormularioMascota
        form={form}
        onChangeHandler={onChangeHandler}
        onSubmitHandler={onSubmitHandler}
        error={error}
      />
    </div>
  );
};

export default AgregarMascota;
