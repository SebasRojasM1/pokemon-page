import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faHouse } from '@fortawesome/free-solid-svg-icons';
import "../assets/styles/header.scss"

function Header() {

    return (
        <section className='header'>
            <div className='return-icon'>
                <a href="/list"><FontAwesomeIcon icon={faHouse} /></a>
            </div>

            <div className='image-container'>
                <img src="https://images.wikidexcdn.net/mwuploads/esssbwiki/7/77/latest/20111028181540/TituloUniversoPok%C3%A9mon.png" alt="" />
            </div>

            <div className='mode-change'>
                <FontAwesomeIcon icon={faMoon}/>
            </div>
        </section>

    )
}

export default Header