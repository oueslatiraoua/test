import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

import OurServices from "./pages/OurServices";
import Register from "./pages/Register";
import Login from "./pages/Login";

//Routes and Navbar
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/OurServices" element={<OurServices />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
