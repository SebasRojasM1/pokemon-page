import "../assets/styles/details.scss"
import PokemonRadarChart from "./pokemonGraph";

function Details() {
    const pikachuStats = [85, 55, 40, 50, 50, 90]; // HP, Attack, Defense, Special Attack, Special Defense, Speed

    return (
        <section className="details">
            <div className="pokemon-name">
                <p>Pikachu #123</p>
            </div>

            <div className="principal-info">
                <div className="pokemon-image-container">
                    <div className="pokemon-image">
                        <img src="https://pngimg.com/uploads/pokemon/small/pokemon_PNG9.png" alt="" />
                    </div>
                </div>

                <div className="pokemon-profile-container">
                    <div className="pokemon-profile">
                        <div className="type-pokemon">
                            <h3>Type</h3>

                            <div className="types">
                                <p>Rock</p>
                                <p>Electric</p>
                            </div>
                        </div>

                        <div className="height-pokemon">
                            <h3>Height</h3>
                            <p>2.2 m</p>
                        </div>

                        <div className="weight-pokemon">
                            <h3>Weight</h3>
                            <p>210.0 kg</p>
                        </div>
                    </div>

                    <div className="pokemon-special">
                        <div className="specie-pokemon">
                            <h3>Species</h3>
                            <p>Dragon</p>
                        </div>

                        <div className="abilities-pokemon">
                            <h3>Abilities</h3>
                            <ul>
                                <li>
                                    Inner Focus
                                </li>
                                <li>
                                    Multiscale (Hidden)
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="secundary-info">
                <div className="stats">
                    <h4>Pokemon stats</h4>
                    <PokemonRadarChart stats={pikachuStats} />
                </div>

                <div className="cards">
                    <img src="https://www.pokemon.com/static-assets/content-assets/cms2/img/cards/web/SWSH4/SWSH4_EN_43.png" alt="" />
                    <img src="https://www.pokemon.com/static-assets/content-assets/cms2/img/cards/web/SWSH4/SWSH4_EN_43.png" alt="" />
                </div>
            </div>
        </section>
    )
}

export default Details;