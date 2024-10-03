import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faHouse, faSun } from '@fortawesome/free-solid-svg-icons';
import "../assets/styles/header.scss"
import { useState } from 'react';

function Header() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('dark-mode', !isDarkMode); // Alterna la clase en el body
    };

    return (
        <section className='header'>
            <div className='return-icon'>
                <a href="/list"><FontAwesomeIcon icon={faHouse} /></a>
            </div>

            <div className='image-container'>
                <img src="https://images.wikidexcdn.net/mwuploads/esssbwiki/7/77/latest/20111028181540/TituloUniversoPok%C3%A9mon.png" alt="" />
            </div>

            <div className='mode-change' onClick={toggleDarkMode}>
                <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon}/>
            </div>
        </section>

    )
}

export default Header