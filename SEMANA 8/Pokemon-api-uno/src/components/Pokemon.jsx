import '../App.css';

const Pokemon = ({ setPokemonNames, setError }) => {
    const fetchPokemon = async () => {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=807');
            if (!response.ok) {
                throw new Error('Error al obtener la lista de Pokémon');
            }
            const data = await response.json();
            const pokemonList = data.results.map(pokemon => pokemon.name);
            setPokemonNames(pokemonList);
            setError(null);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <button onClick={fetchPokemon}>Elige tu pokemon favorito</button>
    );
};

export default Pokemon;
