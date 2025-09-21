import { BrowserRouter, Routes, Route } from "react-router-dom";
import Usuarios from "./components/Usuarios";
import NuevoUsuario from "./components/NuevoUsuario";
import Login from "./components/Login/Login";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/usuarios" element={<> <Usuarios /> <NuevoUsuario /> </>} />

        <Route path="/" element={<h2>Bienvenido 🚀</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
