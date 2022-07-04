import './App.css';
import { Footer } from './components/footer';
import { Navbar } from './components/navbar';
import { Game } from './components/game'

function App() {
  return (
    <div className="App">
      <div className="container-fluid position-fixed">
        <Navbar/>
        <Game/>
        <Footer/>
      </div>
    </div>
  );
}

export default App;
