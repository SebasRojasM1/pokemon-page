import { useParams } from 'react-router-dom';
import '../../App.css'
import Details from '../../components/details';
import Header from '../../components/header';

function DetailsPokemon() {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <header>
        <Header />
      </header>
      
      <main>
        <Details pokemonId={id}/>
      </main>
    </>
  );
}

export default DetailsPokemon;