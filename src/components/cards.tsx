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
}

function CardsPokemon({ selectedTypes }: CardsPokemonProps) {
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'grass':
        return 'grass-pokemon-color';
      case 'fire':
        return 'fire-pokemon-color';
      case 'water':
        return 'water-pokemon-color';
      case 'electric':
        return 'electric-pokemon-color';
      case 'ice':
        return 'ice-pokemon-color';
      case 'fighting':
        return 'fighting-pokemon-color';
      case 'poison':
        return 'poison-pokemon-color';
      case 'ground':
        return 'ground-pokemon-color';
      case 'flying':
        return 'flying-pokemon-color';
      case 'psychic':
        return 'phychic-pokemon-color';
      case 'bug':
        return 'bug-pokemon-color';
      case 'rock':
        return 'rock-pokemon-color';
      case 'ghost':
        return 'ghost-pokemon-color';
      case 'dark':
        return 'dark-pokemon-color';
      case 'dragon':
        return 'dragon-pokemon-color';
      case 'steel':
        return 'steel-pokemon-color';
      case 'fairy':
        return 'fairy-pokemon-color';
      case 'normal':
        return 'normal-pokemon-color';
      default:
        return 'normal-pokemon-color'; // Color por defecto si no se encuentra el tipo
    }
  };

  // Filtrar los Pokémon por los tipos seleccionados
  const filteredPokemonList = selectedTypes.length
    ? pokemonList.filter((pokemon) =>
        pokemon.types.some((typeInfo) =>
          selectedTypes.includes(typeInfo.type.name)
        )
      )
    : pokemonList;

  return (
    <section>
      <h1>Cards Pokemon</h1>
      <div className="cards-container">
        {filteredPokemonList.map((pokemon) => (
          <div className="card" key={pokemon.id}>
            <div className={`image-pokemon ${getTypeColor(pokemon.types[0].type.name)}`}>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            </div>

            <div className="info-pokemon">
              <p>{pokemon.name}</p>

              {pokemon.types.map((typeInfo) => (
                <div
                  key={typeInfo.type.name}
                  className={`type-pokemon ${getTypeColor(typeInfo.type.name)}`}
                >
                  <p>{typeInfo.type.name}</p>
                </div>
              ))}
            </div>

            <div className="more-details">
              <a href="" target="_blank">
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
