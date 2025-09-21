import { BrowserRouter, Routes, Route } from "react-router-dom";
import Usuarios from "./components/Usuarios";
import NuevoUsuario from "./components/NuevoUsuario";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import { AuthProvider } from "./hooks/AuthContext";


import "./App.css";

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>

    <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/usuarios" element={<> <Usuarios /> <NuevoUsuario /> </>} />

        <Route path="/" element={<Home />} />
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
