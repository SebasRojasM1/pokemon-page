import { useState, useEffect } from 'react';
import "../assets/styles/sidebar.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faX } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

interface PokemonType {
  name: string;
}

interface SidebarProps {
  onFilterChange: (selectedTypes: string[], searchTerm: string) => void;
}

function Sidebar({ onFilterChange }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [types, setTypes] = useState<PokemonType[]>([]); // Estado para almacenar los tipos de Pokémon
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]); // Estado para almacenar los tipos de Pokémon seleccionados
  const [searchTerm, setSearchTerm] = useState<string>(''); // Estado para almacenar la cadena de busqueda


  /*Ejecuta la apertura del sidebar */
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };


  useEffect(() => {
    const fetchTypes = async () => {
      try {
        /*Obtiene los tipos de pokemon existentes por medio de una peticion*/
        const response = await axios.get('https://pokeapi.co/api/v2/type');
        setTypes(response.data.results);
      } catch (error) {
        console.error('Error fetching Pokémon types:', error);
      }
    };

    fetchTypes();
  }, []);


  /*Maneja los cambios cuando se selecciona el tipo de pokemon */
  const handleTypeChange = (type: string) => {
    const updatedSelectedTypes = selectedTypes.includes(type)
      ? selectedTypes.filter((t) => t !== type) // Si el tipo ya está seleccionado, lo elimina
      : [...selectedTypes, type]; //Si no existe, lo agrega

    setSelectedTypes(updatedSelectedTypes);
    onFilterChange(updatedSelectedTypes, searchTerm); //Llama a la funcion callback con los valores de tipos y nombre filtrados
  };


  /*Maneja y captura los valores de los inputs */
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    onFilterChange(selectedTypes, event.target.value); 
  };


  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="toggle-button" onClick={toggleSidebar}>
        {isOpen ? <FontAwesomeIcon icon={faX} /> : <FontAwesomeIcon icon={faBars} />}
      </button>

      <nav className="menu">
        <div className='image-container'>
          <img
            src="https://images.wikidexcdn.net/mwuploads/esssbwiki/7/77/latest/20111028181540/TituloUniversoPok%C3%A9mon.png"
            alt=""
          />
        </div>

        <div className='search-container'>
          <p>Busqueda avanzada:</p>
          <label htmlFor="">Buscar por nombre pokemon</label>
          <input
            type="search"
            name="search"
            id="search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div className='filter-container'>
          <p>Filtrar por tipos:</p>
          {types.map((type) => (
            <div key={type.name} className='select-types'>
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
      </nav>
    </div>
  );
}

export default Sidebar;
