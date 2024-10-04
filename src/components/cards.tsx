import { useEffect, useState } from 'react';
import axios from 'axios';
import "../assets/styles/cards.scss";

interface Pokemon {
  id: number;
  name: string;
  url: string;
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

  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonPerPage] = useState(12);


  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        /* Obtiene la lista de Pokemones, por medio del name y URL 
          (La URL contiene toda la info especifica) del pokemon*/
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=150`);
        const pokemonListData: Pokemon[] = response.data.results;

        const pokemonDetailsPromises = pokemonListData.map((pokemon: Pokemon) =>
          axios.get(pokemon.url)
        );


        /*Ejecuta todos los datos (promesas) de cada pokemon, y luego los extrae*/
        const pokemonDetails = await Promise.all(pokemonDetailsPromises);
        const pokemonData = pokemonDetails.map((detail) => detail.data);

        setPokemonList(pokemonData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    };

    fetchPokemonData();
  }, []);



  // Filtrar los Pokémon por los tipos seleccionados y por su nombre

  /*Verifica si hay valores seleccionados por su tipo */
  const filteredPokemonList = pokemonList.filter((pokemon) => {
    const matchesType = selectedTypes.length
      ? pokemon.types.some((typeInfo) => //Verifica si alguno de los tipos seleccionados está en la lista de tipos de la API
          selectedTypes.includes(typeInfo.type.name)
        )
      : true;

    /*Filtra por medio del valor escrito en el input */
    const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesType && matchesSearch;
  });


  // Calcular el índice de los Pokémon que se van a mostrar en la página actual
  const indexOfLastPokemon = currentPage * pokemonPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
  const currentPokemonList = filteredPokemonList.slice(indexOfFirstPokemon, indexOfLastPokemon);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(filteredPokemonList.length / pokemonPerPage);

  // Funciones para cambiar de página
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  
  if (loading) {
    return <section className="cards-section">
              <h1>Loading pokémon...</h1>
          </section>;
  }

  return (
    <section className="cards-section">
      <h1>Pokemon Cards</h1>
      <div className="cards-container">
        {currentPokemonList.map((pokemon) => {

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

                <a href={`/details/${pokemon.id}`} target="self" className="more-details">
                  See details
                </a>
            </div>
          );
        })}
      </div>


      <div className="pagination">
        <button onClick={previousPage} disabled={currentPage === 1}>
          Previous
        </button>

        <span>
          {currentPage} / {totalPages}
        </span>

        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next page
        </button>
      </div>
    </section>
  );
}

export default CardsPokemon;
