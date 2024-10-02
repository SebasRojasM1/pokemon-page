import "../assets/styles/details.scss"

function Details() {
    return (
        <section className="details">
            <div className="pokemon-name">
                <p>Pikachu #123</p>
            </div>
            
            <div className="principal-info">
                <div className="pokemon-image">
                    <img src="https://pngimg.com/uploads/pokemon/small/pokemon_PNG9.png" alt="" />
                </div>
                
                <div className="pokemon-">
                    <div className="type-pokemon">
                        <p>Type</p>
                        <div>
                            <p>Rock</p>
                            <p>Electric</p>
                        </div>
                    </div>

                    <div className="height-pokemon">
                        <p>Height</p>
                        <p>2.2 m</p>
                    </div>

                    <div className="weight-pokemon">
                        <p>Weight</p>
                        <p>210.0 kg</p>
                    </div>
                </div>

                <div>
                    <div className="specie-pokemon">
                        <p>Species</p>
                        <p>Dragon</p>
                    </div>

                    <div className="abilities-pokemon">
                        <p>Abilities</p>
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
            
            
            
            <div className="secundary-info">
                <div className="stats">

                </div>

                <div className="cards">

                </div>
            </div>
        </section>
    )
}

export default Details;