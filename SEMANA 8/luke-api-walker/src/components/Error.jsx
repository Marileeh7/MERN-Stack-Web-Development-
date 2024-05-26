import React from 'react';
import obiWanImage from '../Assets/obi-wan.jpg'; // Importa la imagen

const Error = () => {
  return (
    <div>
      <h3>These aren't the droids you're looking for.</h3>
      <img 
        src={obiWanImage} 
        alt="Obi-Wan Kenobi"
      />
    </div>
  );
}

export default Error;

//Error.jsx
