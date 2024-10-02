import { useEffect, useState } from 'react';
import axios from 'axios';
import "../assets/styles/details.scss";
import PokemonRadarChart from "./pokemonGraph";

interface PokemonDetails {
    id: number;
    name: string;
    sprites: {
        front_default: string;
    };
    height: number;
    weight: number;
    types: Array<{
        type: {
            name: string;
        };
    }>;
    abilities: Array<{
        ability: {
            name: string;
        };
    }>;
    stats: Array<{
        base_stat: number;
    }>;
}

interface PokemonCard {
    name: string;
    images: {
        large: string;
    };
    types: string[];
}

interface DetailsProps {
    pokemonId: string | undefined;
}

function Details({ pokemonId }: DetailsProps) {
    const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(null);
    const [cards, setCards] = useState<PokemonCard[]>([]);
    const [evolutionSpecies, setEvolutionSpecies] = useState<string | null>(null);

    // Función para obtener el Pokémon y su cadena evolutiva
    const fetchEvolutionChain = async (speciesUrl: string) => {
        try {
            const speciesResponse = await axios.get(speciesUrl);
            const evolutionChainUrl = speciesResponse.data.evolution_chain.url;

            const evolutionResponse = await axios.get(evolutionChainUrl);
            const chain = evolutionResponse.data.chain;

            // Función para obtener la última evolución de la cadena
            let mostAdvancedEvolution = chain.species.name;
            let evolvesTo = chain.evolves_to;

            while (evolvesTo.length > 0) {
                mostAdvancedEvolution = evolvesTo[0].species.name;
                evolvesTo = evolvesTo[0].evolves_to;
            }

            setEvolutionSpecies(mostAdvancedEvolution);

            // Llamar a la API de Pokémon TCG para buscar cartas
            fetchPokemonCards(mostAdvancedEvolution);
        } catch (error) {
            console.error('Error fetching evolution chain:', error);
        }
    };

    // Función para obtener las cartas de la Pokémon TCG API
    const fetchPokemonCards = async (pokemonName: string) => {
        try {
            const response = await axios.get(`https://api.pokemontcg.io/v2/cards?q=name:${pokemonName}`);
            setCards(response.data.data);
        } catch (error) {
            console.error('Error fetching Pokémon cards:', error);
        }
    };

    useEffect(() => {
        const fetchPokemonDetails = async () => {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
                setPokemonDetails(response.data);

                const speciesUrl = response.data.species.url;
                fetchEvolutionChain(speciesUrl);
            } catch (error) {
                console.error('Error fetching Pokémon details:', error);
            }
        };

        fetchPokemonDetails();
    }, [pokemonId]);

    if (!pokemonDetails) {
        return <div>Loading...</div>;
    }

    const pokemonStats = pokemonDetails.stats.map((stat) => stat.base_stat);

    return (
        <section className="details">
            <div className="pokemon-name">
                <p>{pokemonDetails.name} #{pokemonDetails.id}</p>
            </div>

            <div className="principal-info">
                <div className="pokemon-image-container">
                    <div className="pokemon-image">
                        <img src={pokemonDetails.sprites.front_default} alt={pokemonDetails.name} />
                    </div>
                </div>

                <div className="pokemon-profile-container">
                    <div className="pokemon-profile">
                        <div className="type-pokemon">
                            <h3>Type</h3>
                            <div className="types">
                                {pokemonDetails.types.map((typeInfo) => (
                                    <p key={typeInfo.type.name}>{typeInfo.type.name}</p>
                                ))}
                            </div>
                        </div>

                        <div className="height-pokemon">
                            <h3>Height</h3>
                            <p>{pokemonDetails.height} m</p>
                        </div>

                        <div className="weight-pokemon">
                            <h3>Weight</h3>
                            <p>{pokemonDetails.weight} kg</p>
                        </div>
                    </div>

                    <div className="pokemon-special">
                        <div className="specie-pokemon">
                            <h3>Species</h3>
                            <p>Dragon</p>
                        </div>

                        <div className="specie-pokemon">
                            <h3>Abilities</h3>
                            <ul>
                                {pokemonDetails.abilities.map((abilityInfo) => (
                                    <li key={abilityInfo.ability.name}>{abilityInfo.ability.name}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="secundary-info">
                <div className="stats">
                    <h4>Pokemon stats</h4>
                    <PokemonRadarChart stats={pokemonStats} />
                </div>

                <div className="cards-container">
                    <h3>Pokemon Cards</h3>
                    {cards.length > 0 ? (
                        <div className="cards">
                            {cards.map((card) => (
                                <div key={card.name} className="card-item">
                                    <h4>{card.name}</h4>
                                    <img src={card.images.large} alt={card.name} />
                                    <p><span>Type:</span> {card.types}</p>
                                </div>
                            ))}
                        </div>
                        ) : (
                        <p>No cards available for {evolutionSpecies}</p>
                        )}
                </div>
            </div>

            
        </section>
    );
}

export default Details;
