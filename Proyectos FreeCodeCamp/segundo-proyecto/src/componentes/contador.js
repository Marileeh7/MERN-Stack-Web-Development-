import React from 'react';
import '../componentes/Hojas de estilo/Contador.css'

function Contador({ numeroDeClick }){
  return(
    <div className='contador'>
      { numeroDeClick }
    </div>

  );

}
export default Contador;
