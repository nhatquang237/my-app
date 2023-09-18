import logo from './logo.svg';
import './App.css';
import BasicTable from './components/BasicTable';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {BasicTable(5)}
      </header>
    </div>
  );
}

export default App;
