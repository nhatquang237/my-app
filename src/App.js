import { Routes, Route } from "react-router-dom";

import SpendTable from "./components/SpendTable";
import Login from "./Login"
import SignUp from "./Register";
import Navbar from "./components/Navbar";

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
        // <Routes>
        //   <Route path="/" element={<SpendTable />}/>
        //   <Route path="/login" element={<Login />}/>
        //   <Route path="/register" element={<SignUp />}/>
        // </Routes>
    );
}

export default App;
