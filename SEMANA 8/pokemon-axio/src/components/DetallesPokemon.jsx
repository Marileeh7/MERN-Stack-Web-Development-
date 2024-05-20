import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const DetallesPokemon = ({ urlPokemon }) => {
  const [pokemon, setPokemon] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetallesPokemon = async () => {
      setCargando(true);
      try {
        const response = await axios.get(urlPokemon);
        setPokemon(response.data);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setCargando(false);
      }
    };

    if (urlPokemon) {
      fetchDetallesPokemon();
    }
  }, [urlPokemon]);

  if (cargando) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    pokemon && (
      <div className="detalles-pokemon">
        <h2>{pokemon.name}</h2>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <p>Altura: {pokemon.height}</p>
        <p>Peso: {pokemon.weight}</p>
        <p>Experiencia Base: {pokemon.base_experience}</p>
        <h3>Habilidades:</h3>
        <ul>
          {pokemon.abilities.map(ability => (
            <li key={ability.ability.name}>{ability.ability.name}</li>
          ))}
        </ul>
      </div>
    )
  );
};

export default DetallesPokemon;
