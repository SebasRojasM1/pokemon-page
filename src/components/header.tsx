import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faHouse, faSun, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import "../assets/styles/header.scss"
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Header() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('dark-mode', !isDarkMode); // Alterna la clase en el body
    };


    /*Hace que sea dinamico el icono de navegación del header según la pagina actual */
    const location = useLocation();  // Hook para obtener la ruta actual
    const navigate = useNavigate();  // Hook para manejar la navegación

    const getIconForRoute = () => {
        if (location.pathname === '/list') {
            return <FontAwesomeIcon icon={faHouse} onClick={() => navigate('/')}/>;
        } else if (location.pathname.startsWith('/details')) {
            return <FontAwesomeIcon icon={faArrowLeft} onClick={() => navigate('/list')} />;
        }
        return null;
    };


    return (
        <section className='header'>
            <div className='return-icon'>
                {getIconForRoute()}
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