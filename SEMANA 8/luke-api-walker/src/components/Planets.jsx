import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Planets = () => {
  const [planet, setPlanet] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchPlanet = async () => {
      try {
        const response = await axios.get(`https://swapi.dev/api/planets/${id}`);
        setPlanet(response.data);
      } catch (err) {
        console.error(err);
        navigate('/error');
      }
    };

    fetchPlanet();
  }, [id, navigate]);

  return (
    <div>
      <h2>{planet.name}</h2>
      <p>Climate: {planet.climate}</p>
      <p>Terrain: {planet.terrain}</p>
      <p>Population: {planet.population}</p>
      <p>Days per Year: {planet.orbital_period}</p>
    </div>
  );
};

export default Planets;
