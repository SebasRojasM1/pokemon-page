import { useEffect, useState } from 'react';
import axios from 'axios';
import "../assets/styles/cards.scss";

interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
  
}

function CardsPokemon() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const promises = [];
        for (let i = 1; i <= 12; i++) { 
          promises.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`));
        }
        const results = await Promise.all(promises);
        const pokemonData = results.map((result) => result.data);
        setPokemonList(pokemonData);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    };

    fetchPokemonData();
  }, []);

  return (
    <section>
      <h1>Cards Pokemon</h1>
      <div className="cards-container">
        {pokemonList.map((pokemon) => (
          <div className="card" key={pokemon.id}>
            <div className="image-pokemon">
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            </div>

            <div className="info-pokemon">
              <img 
                src="" 
                alt=""
              />
              <p>{pokemon.name}</p>
            </div>

            <div className="more-details">
              <a href="" target="_blank" rel="">
                Ver detalles
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CardsPokemon;
