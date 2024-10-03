import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListPokemon from './assets/pages/ListPokemon';
import DetailsPokemon from './assets/pages/DetailsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/list" element={<ListPokemon />} />
        <Route path="/details/:id" element={<DetailsPokemon />} />
      </Routes>
    </Router>
  );
}

export default App;
