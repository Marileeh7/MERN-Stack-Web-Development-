import './App.css';
import Boton from './componentes/boton';
import freecodecamplogo from './imagenes/FreeCodeCamp_logo.png';
import Contador from './componentes/contador';
import { useState} from 'react';

function App() {

  const [ numeroDeClick, SetnumeroDeClick ] = useState (0);

  const manejarClick = () => {
    SetnumeroDeClick( numeroDeClick + 1 );
  };
  
  const reiniciarContador = ()=> {
    SetnumeroDeClick (0);  };

  return (
    <div className='App'>
      <div className='freecodecamp-logo-contenedor'>

        <img 
        className='freecodecamp-logo'
        src={freecodecamplogo} 
        alt='Logo de freeCodecamp' 
        />
      </div>

      <div className='contenedor-principal'>
        <Contador numeroDeClick={numeroDeClick} />

        <Boton 
        texto='Click'
        esBotonDeClick={true}
        manejarClick={manejarClick} />

        <Boton 
        texto='Reiniciar'
        esBotonDeClick={false}
        manejarClick={reiniciarContador} />
      </div>
    </div>
  );
}

export default App;
