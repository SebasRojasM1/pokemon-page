import { useState } from 'react';
import './App.css'
import CardsPokemon from './components/cards'
import Sidebar from './components/sidebar'

function App() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleFilterChange = (types: string[], term: string) => {
    setSelectedTypes(types);
    setSearchTerm(term);
  };

  return (
    <>
    
      <Sidebar onFilterChange={handleFilterChange} />
      <CardsPokemon selectedTypes={selectedTypes} searchTerm={searchTerm}/>
    </>
  )
}

export default App
