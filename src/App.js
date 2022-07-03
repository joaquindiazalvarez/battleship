import './App.css';
import { Footer } from './components/footer';
import { Navbar } from './components/navbar';
import { Board } from './components/board'

function App() {
  return (
    <div className="App">
      <div className="container-fluid position-fixed">
        <Navbar/>
        <Board/>
        <Footer/>
      </div>
    </div>
  );
}

export default App;
