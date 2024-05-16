import React, { useState, useEffect } from 'react';

// Componente ListaDeQuehaceres
export default function ListaDeQuehaceres() {
  // Estado inicial de las tareas, cargado desde localStorage si existe
  const [tareas, setTareas] = useState(() => {
    const tareasGuardadas = localStorage.getItem('tareas');
    return tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
  });
  const [nuevaTarea, setNuevaTarea] = useState('');

  // Persistir tareas en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem('tareas', JSON.stringify(tareas));
  }, [tareas]);

  // Manejar el envío del formulario para agregar una nueva tarea
  const manejarAgregarTarea = (e) => {
    e.preventDefault();
    if (nuevaTarea.trim()) {
      setTareas([...tareas, { texto: nuevaTarea, completada: false }]);
      setNuevaTarea('');
    }
  };

  // Manejar la eliminación de una tarea
  const manejarEliminarTarea = (index) => {
    const tareasActualizadas = tareas.filter((_, i) => i !== index);
    setTareas(tareasActualizadas);
  };

  // Manejar el cambio de estado de completado de una tarea
  const manejarAlternarTarea = (index) => {
    const tareasActualizadas = tareas.map((tarea, i) =>
      i === index ? { ...tarea, completada: !tarea.completada } : tarea
    );
    setTareas(tareasActualizadas);
  };

  return (
    <div className="contenedor-tareas">
      <h1>Lista de Pendientes</h1>
      <form onSubmit={manejarAgregarTarea}>
        <input
          type="text"
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
          placeholder="Agregar una nueva tarea"
        />
        <button type="submit">Agregar</button>
      </form>
      <ul>
        {tareas.map((tarea, index) => (
          <li key={index} className="tarea-item">
            <div className="tarea-texto">
              <span style={{ textDecoration: tarea.completada ? 'line-through' : 'none' }}>
                {tarea.texto}
              </span>
            </div>
            <div className="tarea-acciones">
              <input
                type="checkbox"
                id={`checkbox-${index}`}
                checked={tarea.completada}
                onChange={() => manejarAlternarTarea(index)}
              />
              <label htmlFor={`checkbox-${index}`}></label>
              <button onClick={() => manejarEliminarTarea(index)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
