import React, { useState, useEffect } from 'react';
import './Tabs.css';

const Tabs = ({ tabs }) => {
  const [index, setIndex] = useState(0); // Índice de la pestaña seleccionada actualmente
  const [showContent, setShowContent] = useState(false); // Controla la visualización del contenido
  const [animate, setAnimate] = useState(false); // Controla la animación JavaScript

  useEffect(() => {
    setShowContent(false); // Oculta el contenido antes de cambiar de pestaña
    setAnimate(true); // Inicia la animación JavaScript
    const timer1 = setTimeout(() => setShowContent(true), 100); // Muestra el contenido después de 100ms
    const timer2 = setTimeout(() => setAnimate(false), 500); // Finaliza la animación JavaScript después de 500ms
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [index]); // Este efecto se ejecuta cada vez que cambia el índice de la pestaña

  const tabSelected = (index, callback) => {
    setIndex(index); // Actualiza el índice de la pestaña seleccionada
    if (callback) {
      callback(); // Ejecuta la devolución de llamada opcional, si está presente
    }
  };

  return (
    <div className="tabs-container">
      <div className="tabs-header">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => tabSelected(i, tab.callback)}
            className={`button tab-${i + 1} ${i === index ? 'active' : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={`tab-content-container ${showContent ? 'show' : ''} ${animate ? 'animate' : ''} ${index === 0 ? 'tab-1-border' : ''}`}>
        <p className="px-2 py-1 font-weight-bold">
          {tabs[index].content}
        </p>
      </div>
    </div>
  );
};

export default Tabs;

