import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

        <Route path="*" element={<Navigate to="/list" />} />
      </Routes>
    </Router>
  );
}

export default App;
