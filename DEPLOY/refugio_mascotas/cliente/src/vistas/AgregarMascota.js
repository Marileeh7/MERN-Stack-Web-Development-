// cliente/src/vistas/AgregarMascota.js
import React, { useState } from 'react';
import axios from 'axios';  // Importación de Axios
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
      .catch(err => {
        console.log("Detalles del error:", err.response);
        if (err.response && err.response.data && err.response.data.error) {
          setError(err.response.data.error);
        } else if (err.response && err.response.data && err.response.data.mensaje) {
          setError({ mensaje: err.response.data.mensaje });
        } else {
          setError({ mensaje: "Ocurrió un error. Inténtalo de nuevo más tarde." });
        }
      });
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
