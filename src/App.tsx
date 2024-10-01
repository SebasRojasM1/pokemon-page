import { useState } from 'react';
import './App.css'
import CardsPokemon from './components/cards'
import Sidebar from './components/sidebar'

function App() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const handleFilterChange = (types: string[]) => {
    setSelectedTypes(types);
  };
  return (
    <>
      <Sidebar onFilterChange={handleFilterChange} />
      <CardsPokemon selectedTypes={selectedTypes} />
    </>
  )
}

export default App
