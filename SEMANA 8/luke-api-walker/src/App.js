import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import obiWanImage from './Assets/obi-wan.jpg'; // Importa la imagen

const App = () => {
  const [searchType, setSearchType] = useState('people');
  const [searchId, setSearchId] = useState(1);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    const maxId = searchType === 'people' ? 82 : 60;
    if (searchId < 1 || searchId > maxId) {
      setError(`Please enter a valid ID between 1 and ${maxId}`);
      setResult(null);
      return;
    }

    try {
      const response = await axios.get(`https://swapi.dev/api/${searchType}/${searchId}`);
      setResult(response.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("These aren't the droids you're looking for.");
      setResult(null);
    }
  };

  return (
    <div className="App">
      <form className='search' onSubmit={handleSearch} method='GET'>
        <div className='searchSelect'>
          <label htmlFor="searchType">Search for:</label>
          <select name='searchType' value={searchType} onChange={(e) => setSearchType(e.target.value)}>
            <option value="people">People (Enter a number from 1 to 82)</option>
            <option value="planets">Planets (Enter a number from 1 to 60)</option>
          </select>
        </div>
        <div className='searchId'>
          <label htmlFor="id">ID:</label>
          <input name='id' type="number" min="1" value={searchId} onChange={(e) => setSearchId(Number(e.target.value))} />
        </div>
        <input type='submit' value='Search' />
      </form>
      <div className="results">
        {error && (
          <div className="error">
            <p>{error}</p>
            <img src={obiWanImage} alt="Obi-Wan Kenobi" />
          </div>
        )}
        {result && (
          <div className="result">
            {searchType === 'people' && (
              <>
                <h2>{result.name}</h2>
                <p>Height: {result.height}</p>
                <p>Hair Color: {result.hair_color}</p>
                <p>Birth Year: {result.birth_year}</p>
                {result.homeworld && (
                  <p>Homeworld: <a href={result.homeworld}>{result.homeworld}</a></p>
                )}
              </>
            )}
            {searchType === 'planets' && (
              <>
                <h2>{result.name}</h2>
                <p>Climate: {result.climate}</p>
                <p>Terrain: {result.terrain}</p>
                <p>Population: {result.population}</p>
                <p>Days per Year: {result.orbital_period}</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
