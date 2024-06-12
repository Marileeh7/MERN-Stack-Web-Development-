// cliente/src/componentes/FormularioMascota.js
import React from 'react';
import { Link } from 'react-router-dom';

const BotonLink = ({ to, children, className }) => (
  <Link to={to} className={`btn ${className}`}>
    {children}
  </Link>
);

const FormularioMascota = (props) => {
  const { onSubmitHandler, onChangeHandler, form, error } = props;
  return (
    <form className="form-container" onSubmit={(e) => { e.preventDefault(); onSubmitHandler(e); }}>
      <div className="form-group">
        <label htmlFor="nombre">Nombre de la Mascota</label>
        <input
          type="text"
          name="nombre"
          className="form-control"
          onChange={onChangeHandler}
          value={form.nombre}
          placeholder="Introduce el nombre de la mascota"
        />
        {error.nombre && <span className="text-danger">{error.nombre.message}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="tipo">Tipo de Mascota</label>
        <input
          type="text"
          name="tipo"
          className="form-control"
          onChange={onChangeHandler}
          value={form.tipo}
          placeholder="Introduce el tipo de mascota"
        />
        {error.tipo && <span className="text-danger">{error.tipo.message}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="descripcion">Descripción</label>
        <textarea
          name="descripcion"
          className="form-control"
          onChange={onChangeHandler}
          value={form.descripcion}
          placeholder="Introduce una descripción de la mascota"
        />
        {error.descripcion && <span className="text-danger">{error.descripcion.message}</span>}
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
