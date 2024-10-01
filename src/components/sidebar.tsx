import { useState, useEffect } from 'react';
import "../assets/styles/sidebar.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faX } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

interface PokemonType {
  name: string;
}

interface SidebarProps {
  onFilterChange: (selectedTypes: string[]) => void;
}

function Sidebar({ onFilterChange }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [types, setTypes] = useState<PokemonType[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/type');
        setTypes(response.data.results);
      } catch (error) {
        console.error('Error fetching Pokémon types:', error);
      }
    };

    fetchTypes();
  }, []);


  const handleTypeChange = (type: string) => {
    const updatedSelectedTypes = selectedTypes.includes(type)
      ? selectedTypes.filter((t) => t !== type)
      : [...selectedTypes, type];

    setSelectedTypes(updatedSelectedTypes);
    onFilterChange(updatedSelectedTypes); // Pass the selected types to the parent component
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="toggle-button" onClick={toggleSidebar}>
        {isOpen ? <FontAwesomeIcon icon={faX} /> : <FontAwesomeIcon icon={faBars} />}
      </button>

      <nav className="menu">
        <ul>
          <div>
            <img
              src="https://images.wikidexcdn.net/mwuploads/esssbwiki/7/77/latest/20111028181540/TituloUniversoPok%C3%A9mon.png"
              alt=""
            />
          </div>

          <div>
            <p>Busqueda avanzada:</p>
            <label htmlFor="">Buscar por nombre pokemon</label>
            <input type="search" name="" id="" />
          </div>

          <div>
            <p>Filtrar por tipos:</p>
            {types.map((type) => (
              <div key={type.name}>
                <label>
                  <input
                    type="checkbox"
                    value={type.name}
                    onChange={() => handleTypeChange(type.name)}
                  />
                  {type.name}
                </label>
              </div>
            ))}
          </div>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
