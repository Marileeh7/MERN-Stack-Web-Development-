import './App.css';
import Pokemon from './components/Pokemon';
import { useState } from 'react';
import pokeballIcon from './assets/pngwing.com.png'; // Importar la imagen local

function App() {
  const [nombresPokemon, setNombresPokemon] = useState([]);
  const [error, setError] = useState(null);

  return (
    <div className="App">
      <h1 className="title">Elige tu Pokemon</h1>
      <Pokemon setNombresPokemon={setNombresPokemon} setError={setError} />
      {error && <p>{error}</p>}
      <ul id="pokemons">
        {nombresPokemon.map((pokemon, index) => (
          <li key={index} className="card">
            <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />
            <span className="card_name">{pokemon.name}</span>
            <img src={pokeballIcon} alt="Pokeball Icon" className="pokeball-icon" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
