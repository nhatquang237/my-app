import { Routes, Route } from "react-router-dom";

import Login from "./components/Login"
import Navbar from "./components/Navbar";
import SignUp from "./components/Register";
// import Loading from "./components/Loading";
import Logout from "./components/Logout";
import SpendTable from "./components/SpendTable";

import RequireAuth from "./components/RequireAuth";
import NotRequireAuth from "./components/NotRequireAuth";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>

        <Route element={<RequireAuth />}>
          <Route path="/" element={<SpendTable />} />
          <Route path="/logout" element={<Logout />} />
        </Route>

        <Route element={<NotRequireAuth />}>
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Route>

      </Routes>
    </div>
  );
}

export default App;
