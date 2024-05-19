import './App.css'; 
import Pokemon from './components/Pokemon'; 
import { useState } from 'react';

function App() {
  const [pokemonNames, setPokemonNames] = useState([]); // Estado para almacenar los nombres de los Pokémon.
  const [error, setError] = useState(null); // Estado para manejar errores.

  return (
    <div className="App">
      <h1>Generador de Nombres de Pokémon</h1>
      <Pokemon setPokemonNames={setPokemonNames} setError={setError} /> {/* Pasa las funciones de actualización como props. */}
      {error && <p>{error}</p>} {/* Muestra el error si existe. */}
      <ul>
        {pokemonNames.map((name, index) => (
          <li key={index}>{name}</li> // Muestra la lista de nombres de Pokémon.
        ))}
      </ul>
    </div>
  );
}

export default App;
