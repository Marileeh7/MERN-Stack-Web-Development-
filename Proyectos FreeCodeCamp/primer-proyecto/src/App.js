import './App.css';
import Testimonio from './componentes/Testimonio';

function App() {
  return (
    <div className='App'>
      <div className='contenedor-principal'>
        <h1>Esto es lo que dicen nuestros alumnos sobre freeCodeCamp:</h1>
        <Testimonio 
        nombre='Emma Bostial'
        pais=' Suecia'
        imagen='emma'
        cargo=' Ingeniera de Software'
        empresa=' Spotify'
        testimonio='Siempre he tenido problemas para aprender JavaScript. Esta plataforma me ha ayudado a aprender y fijar mis conocimientos.' />
        <Testimonio 
        nombre='Sarah Chima'
        pais=' Nigeria'
        imagen='sarah' 
        cargo=' Ingeniera de Software'
        empresa=' ChatDesk'
        testimonio='freeCodeCamp fue la entrada al mundo de la Tecnologia. Me devolvio la confianza en mi que crei perdida' />
        <Testimonio 
        nombre='Shawn Wang'
        pais=' Singapur'
        imagen='Shawn' 
        cargo=' Ingeniera de Software'
        empresa=' Amazon'
        testimonio='Da miedo cambiar de carrera y dejar atras todo lo que creia que sabias pero no te sirva al final del dia' />
      </div>
    </div>
  );
}

export default App;
