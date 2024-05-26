import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

const People = () => {
  const [people, setPeople] = useState({});
  const [homeworldName, setHomeworldName] = useState("");
  const [homeworldId, setHomeworldId] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const peopleResponse = await axios.get(`https://swapi.dev/api/people/${id}`);
        const person = peopleResponse.data;
        setPeople(person);

        const homeworldUrl = person.homeworld;
        const homeworldId = Number(homeworldUrl.match(/\d+/)[0]);
        setHomeworldId(homeworldId);

        const homeworldResponse = await axios.get(homeworldUrl);
        setHomeworldName(homeworldResponse.data.name);
      } catch (err) {
        console.error(err);
        navigate('/error');
      }
    };

    fetchData();
  }, [id, navigate]);

  return (
    <div>
      <h2>{people.name}</h2>
      <p>Height: {people.height}</p>
      <p>Hair Color: {people.hair_color}</p>
      <p>Birth Year: {people.birth_year}</p>
      <p>Homeworld: <Link to={`/planets/${homeworldId}`}>{homeworldName}</Link></p>
    </div>
  );
};

export default People;
