import { useState } from 'react';
import '../../App.css'
import CardsPokemon from '../../components/cards';
import Sidebar from '../../components/sidebar';
import Header from '../../components/header';

function ListPokemon() {
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
  
    const handleFilterChange = (types: string[], term: string) => {
      setSelectedTypes(types);
      setSearchTerm(term);
    };
    
  return (
    <>
      <header>
        <Header />
      </header>
      
      <main>
        <Sidebar onFilterChange={handleFilterChange} />
        <CardsPokemon selectedTypes={selectedTypes} searchTerm={searchTerm}/>
      </main>
    </>
  );
}

export default ListPokemon;