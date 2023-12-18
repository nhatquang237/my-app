import { Routes, Route } from "react-router-dom";

import Login from "./components/Login"
import Navbar from "./components/Navbar";
import SignUp from "./components/Register";
import SpendTable from "./components/SpendTable";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<SpendTable />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
