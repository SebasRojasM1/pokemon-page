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

interface CardsPokemonProps {
  selectedTypes: string[];
  searchTerm: string;
}

function CardsPokemon({ selectedTypes, searchTerm }: CardsPokemonProps) {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const promises = [];
        for (let i = 1; i <= 80; i++) {
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

  // Filtrar los Pokémon por los tipos seleccionados y por su nombre
  const filteredPokemonList = pokemonList.filter((pokemon) => {
    const matchesType = selectedTypes.length
      ? pokemon.types.some((typeInfo) =>
          selectedTypes.includes(typeInfo.type.name)
        )
      : true;

    const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesType && matchesSearch;
  });

  return (
    <section className="cards-section">
      <h1>Pokemon Cards</h1>
      <div className="cards-container">
        {filteredPokemonList.map((pokemon) => {
          const primaryType = pokemon.types[0].type.name;

          return (
            <div className={`card ${primaryType}`} key={pokemon.id}>
              <div className={`image-pokemon ${primaryType}`}>
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              </div>

              <div className="info-pokemon">
                <p id='pokemon-name'>{pokemon.name}</p>

                {pokemon.types.map((typeInfo) => (
                  <div
                    key={typeInfo.type.name}
                    className={`type-pokemon ${typeInfo.type.name}`}
                  >
                    <p>{typeInfo.type.name}</p>
                  </div>
                ))}
              </div>

              <div className="more-details">
                <a href={`/details/${pokemon.id}`} target="self">
                  Ver detalles
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default CardsPokemon;
