import { useEffect, useState } from 'react';
import axios from 'axios';
import "../assets/styles/details.scss";
import PokemonRadarChart from "./pokemonGraph";
import Modal from './modal';

interface PokemonDetails {
    id: number;
    name: string;
    sprites: {
        front_default: string;
        back_default: string;
        front_shiny: string;
        back_shiny: string;
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
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchEvolutionChain = async (speciesUrl: string) => {
        try {
            /*Obtiene las especies de la PokeAPI, y obtiene la cadena de evolucion*/
            const speciesResponse = await axios.get(speciesUrl);
            const evolutionChainUrl = speciesResponse.data.evolution_chain.url;

            /*Hace una peticion para obtener los datos de la evolucion */
            const evolutionResponse = await axios.get(evolutionChainUrl);
            /*Obtiene la expecie base de la cadena */
            const chain = evolutionResponse.data.chain;

            /*Variable para almacenar el nombre de la evolucion mas avanzada */
            let mostAdvancedEvolution = chain.species.name;
            let evolvesTo = chain.evolves_to;


            /*Recorre toda la cadena de evolucion del pokemon. 
                Actualiza el nombre a la evolucion mas avanzada 
                Pasa al siguiente pokemon*/
            while (evolvesTo.length > 0) {
                mostAdvancedEvolution = evolvesTo[0].species.name;
                evolvesTo = evolvesTo[0].evolves_to;
            }

            setEvolutionSpecies(mostAdvancedEvolution);
            fetchPokemonCards(mostAdvancedEvolution);
        } catch (error) {
            console.error('Error fetching evolution chain:', error);
        }
    };


    /*Obtiene las cartas de la API PokemonCTG según su nombre */
    const fetchPokemonCards = async (pokemonName: string) => {
        try {
            const response = await axios.get(`https://api.pokemontcg.io/v2/cards?q=name:${pokemonName}`);
            setCards(response.data.data);
        } catch (error) {
            console.error('Error fetching Pokémon cards:', error);
        }
    };

    useEffect(() => {
        /*Obtiene los pokemones según el ID, para extraer su informacion especifica */
        const fetchPokemonDetails = async () => {
            try {
                /*Extraer los detalles del pokemon */
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
                setPokemonDetails(response.data);

                /*Obtiene la cadena de evolución para obtener la especie base*/
                const speciesUrl = response.data.species.url;
                fetchEvolutionChain(speciesUrl);
            } catch (error) {
                console.error('Error fetching Pokémon details:', error);
            }
        };
        fetchPokemonDetails();
    }, [pokemonId]);


    /* En caso de que no cargue la información */
    if (!pokemonDetails) {
        return <div>Loading...</div>;
    }


    /*Array de tipo number, de las estadisticas de cada Pokemon*/
    const pokemonStats = pokemonDetails.stats.map((stat) => stat.base_stat);

    /*Encuentra el primer tipo de cada Pokemon, para luego aplicarlo en background */
    const primaryType = pokemonDetails.types[0].type.name;


    /*Funciones para abrir y cerrar el Modal de cada card */
    const openModal = (image: string) => {
        setSelectedImage(image);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImage(null);
    };

    return (
        <section className="details">
            <div className="pokemon-name">
                <p>{pokemonDetails.name} #{pokemonDetails.id}</p>
            </div>

            <div className="principal-info">
                <div className="pokemon-image-container">
                    <div className={`pokemon-image ${primaryType}`}>
                        <img src={pokemonDetails.sprites.front_default} alt={pokemonDetails.name} />
                    </div>
                </div>

                <div className="pokemon-profile-container">
                    <div className="pokemon-profile">
                        <div className="type-pokemon">
                            <h3>Type</h3>
                            <div className="types">
                                {pokemonDetails.types.map((typeInfo) => (
                                    <p key={typeInfo.type.name} className={typeInfo.type.name}>{typeInfo.type.name}</p>
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
                        <div className="abilities-pokemon">
                            <h3>Abilities</h3>
                            <ul>
                                {pokemonDetails.abilities.map((abilityInfo) => (
                                    <li key={abilityInfo.ability.name}>{abilityInfo.ability.name}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="specie-pokemon">
                            <h3>Species</h3>
                            <div className="pokemon-sprites">
                                {pokemonDetails.sprites.front_default && (
                                    <img src={pokemonDetails.sprites.front_default} alt={`${pokemonDetails.name} front`} />
                                )}
                                {pokemonDetails.sprites.back_default && (
                                    <img src={pokemonDetails.sprites.back_default} alt={`${pokemonDetails.name} back`} />
                                )}
                                {pokemonDetails.sprites.front_shiny && (
                                    <img src={pokemonDetails.sprites.front_shiny} alt={`${pokemonDetails.name} front shiny`} />
                                )}
                                {pokemonDetails.sprites.back_shiny && (
                                    <img src={pokemonDetails.sprites.back_shiny} alt={`${pokemonDetails.name} back shiny`} />
                                )}
                            </div>
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
                                <div key={card.name} className="card-item" onClick={() => openModal(card.images.large)}>
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

            <Modal isOpen={isModalOpen} onClose={closeModal} imageSrc={selectedImage || ''} altText="Selected Pokemon Card" />
        </section>
    );
}

export default Details;
