import "../assets/styles/home.scss"

function Home() {
    return (
        <section className="section-home">
            <div className="home-header">
                <h1>Welcome</h1>
                <div className="gif-container">
                    <img src="https://media3.giphy.com/media/z6Nudhkljgpsy3X28d/giphy.gif?cid=6c09b9523dqfecwrszvlhqlwm7ug49nyzevz4r2g8hx0hs5r&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=g"/>
                </div>
            </div>

            <div className="info">
                <p>This is an application designed for Pokemon history lovers. <br />
                Here you can see each of the pokemon, their statistics and more details about them.</p>
                <a href="/list">See pokemons</a>
            </div>
        </section>
    );
}

export default Home;
