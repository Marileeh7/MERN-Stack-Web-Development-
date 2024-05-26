import React from 'react';
import { useParams } from 'react-router-dom';

const StyledWord = () => {
  const { word, textColor, bgColor } = useParams();

  const colors = {
    blue: '#00008B', // Azul más oscuro
    red: '#FFC0CB'  // Rojo más claro tirando a rosado
  };

  const style = {
    color: colors[textColor] || textColor,
    backgroundColor: colors[bgColor] || bgColor,
    padding: '10px',
    borderRadius: '5px'
  };

  return <h1 style={style}>{word}</h1>;
};

export default StyledWord;
