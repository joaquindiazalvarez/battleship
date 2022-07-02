import logo from './img/logo.svg';
import './App.css';
import { Footer } from './components/footer';
import { Navbar } from './components/navbar';

function App() {
  return (
    <div className="App">
      <div className="container-fluid position-fixed">
        <Navbar/>
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <Footer/>
      </div>
    </div>
  );
}

export default App;
