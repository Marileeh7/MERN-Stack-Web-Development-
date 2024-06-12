// cliente/src/componentes/FormularioMascota.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BotonLink = ({ to, children, className }) => (
  <Link to={to} className={`btn ${className}`}>
    {children}
  </Link>
);

const FormularioMascota = ({ onSubmitHandler, onChangeHandler, form, error }) => {
  const [touched, setTouched] = useState({
    nombre: false,
    tipo: false,
    descripcion: false
  });

  const handleBlur = (e) => {
    setTouched({
      ...touched,
      [e.target.name]: true
    });
  };

  return (
    <form className="form-container" onSubmit={(e) => { e.preventDefault(); onSubmitHandler(e); }}>
      <div className="form-group">
        <label htmlFor="nombre">Nombre de la Mascota</label>
        <input
          type="text"
          name="nombre"
          className="form-control"
          onChange={onChangeHandler}
          onBlur={handleBlur}
          value={form.nombre}
          placeholder="Introduce el nombre de la mascota"
        />
        {(error.nombre || (touched.nombre && !form.nombre)) && (
          <span className="text-danger">{error.nombre ? error.nombre.message : 'El nombre es obligatorio.'}</span>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="tipo">Tipo de Mascota</label>
        <input
          type="text"
          name="tipo"
          className="form-control"
          onChange={onChangeHandler}
          onBlur={handleBlur}
          value={form.tipo}
          placeholder="Introduce el tipo de mascota"
        />
        {(error.tipo || (touched.tipo && !form.tipo)) && (
          <span className="text-danger">{error.tipo ? error.tipo.message : 'El tipo es obligatorio.'}</span>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="descripcion">Descripción</label>
        <textarea
          name="descripcion"
          className="form-control"
          onChange={onChangeHandler}
          onBlur={handleBlur}
          value={form.descripcion}
          placeholder="Introduce una descripción de la mascota"
        />
        {(error.descripcion || (touched.descripcion && !form.descripcion)) && (
          <span className="text-danger">{error.descripcion ? error.descripcion.message : 'La descripción es obligatoria.'}</span>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="habilidadUno">Primera Habilidad (Opcional)</label>
        <input
          type="text"
          name="habilidadUno"
          className="form-control"
          onChange={onChangeHandler}
          value={form.habilidadUno}
          placeholder="Introduce la primera habilidad de la mascota"
        />
      </div>
      <div className="form-group">
        <label htmlFor="habilidadDos">Segunda Habilidad (Opcional)</label>
        <input
          type="text"
          name="habilidadDos"
          className="form-control"
          onChange={onChangeHandler}
          value={form.habilidadDos}
          placeholder="Introduce la segunda habilidad de la mascota"
        />
      </div>
      <div className="form-group">
        <label htmlFor="habilidadTres">Tercera Habilidad (Opcional)</label>
        <input
          type="text"
          name="habilidadTres"
          className="form-control"
          onChange={onChangeHandler}
          value={form.habilidadTres}
          placeholder="Introduce la tercera habilidad de la mascota"
        />
      </div>
      <div className="form-group form-btn-container">
        <input type="submit" value="Enviar" className="btn btn-primary submit-btn" />
        <BotonLink to="/" className="btn btn-primary home-btn">Todas las Mascotas</BotonLink>
      </div>
    </form>
  );
};

export default FormularioMascota;
