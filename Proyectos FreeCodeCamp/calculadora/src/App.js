import './App.css';
import freeCodeCampLogo from './imagenes/FreeCodeCamp_logo.png';
import Botones from './Componentes/Botones';
import Pantalla from './Componentes/Pantalla';
import BotonClear from './Componentes/BotonClear';
import { useState } from 'react';
import {evaluate} from 'mathjs';

function App() {

  const [input, setInput] = useState ('');

  const agregarInput = val => {
    setInput (input + val);
  };

  const calcularResultado = () => {
    if (input) {
      setInput( evaluate (input));
    } else {
      alert('Ingrese valores validos');
    }
  };

  return(
    <div className="App">
      <div className='freeCodeCamp-logo-contenedor'>
        <img
          src={freeCodeCampLogo} 
          className='freeCodeCamp-logo'
          alt='Logo de freeCodeCamp' />  
      </div>
      <div className='contenedor-calculadora'>
        <Pantalla input={input} /> 
        <div className='fila'>
          <Botones manejarClic= {agregarInput} >1</Botones>
          <Botones manejarClic= {agregarInput} >2</Botones>
          <Botones manejarClic= {agregarInput} >3</Botones>
          <Botones manejarClic= {agregarInput} >+</Botones>
        </div>
        <div className='fila'>
          <Botones manejarClic= {agregarInput} >4</Botones>
          <Botones manejarClic= {agregarInput} >5</Botones>
          <Botones manejarClic= {agregarInput} >6</Botones>
          <Botones manejarClic= {agregarInput} >-</Botones>
          </div>
        <div className='fila'>
          <Botones manejarClic= {agregarInput} >7</Botones>
          <Botones manejarClic= {agregarInput} >8</Botones>
          <Botones manejarClic= {agregarInput} >9</Botones>
          <Botones manejarClic= {agregarInput} >*</Botones>
          </div>
        <div className='fila'>  
          <Botones manejarClic= {calcularResultado} > = </Botones>
          <Botones manejarClic= {agregarInput} >0</Botones>
          <Botones manejarClic= {agregarInput} >.</Botones>
          <Botones manejarClic= {agregarInput} >/</Botones>
        </div> 
          <div className='fila'> 
          <BotonClear manejarClear={() => setInput('')}> 
          Clear 
          </BotonClear>
        </div>
      </div>
    </div>
  );
}
export default App;
