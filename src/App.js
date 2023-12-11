import { Routes, Route } from "react-router-dom";
import './App.css';
import SpendTable from './components/SpendTable';
import Login from './Login'
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<SpendTable />}/>
        <Route path="/login" element={<Login />}/>
      </Routes>
    </div>

  );
}

export default App;

