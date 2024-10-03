import '../App.css'
import Header from '../components/header';
import Home from '../components/home';

function HomePage() {

  return (
    <>
      <header>
        <Header />
      </header>
      
      <main>
        <Home />
      </main>
    </>
  );
}

export default HomePage;