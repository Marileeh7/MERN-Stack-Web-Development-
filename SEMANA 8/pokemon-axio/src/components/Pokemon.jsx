import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

const Pokemon = ({ setNombresPokemon, setError }) => {
  const [offset, setOffset] = useState(0);
  const [limit] = useState(807); // Establecer el límite a 807 para obtener todos los Pokémon

  const fetchPokemon = async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
      const listaPokemon = await Promise.all(
        response.data.results.map(async (pokemon) => {
          const res = await axios.get(pokemon.url);
          return {
            name: pokemon.name,
            url: pokemon.url,
            image: res.data.sprites.front_default,
          };
        })
      );
      setNombresPokemon(listaPokemon);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="boton-centro">
      <button onClick={fetchPokemon} className="boton-pokemon">Obtener Pokémon</button>
    </div>
  );
};

export default Pokemon;
