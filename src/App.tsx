import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListPokemon from './assets/pages/ListPokemon';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/list" element={<ListPokemon />} /> {/* Ruta para la página de ListPokemon */}
        {/* Otras rutas que puedas tener */}
      </Routes>
    </Router>
  );
}

export default App;
