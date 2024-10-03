import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListPokemon from './pages/ListPokemon';
import DetailsPokemon from './pages/DetailsPage';
import HomePage from './pages/Home';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="" element={< HomePage/>} />
        <Route path="/list" element={<ListPokemon />} />
        <Route path="/details/:id" element={<DetailsPokemon />} />
      </Routes>
    </Router>
  );
}

export default App;
