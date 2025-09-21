import { BrowserRouter, Routes, Route } from "react-router-dom";
import Usuarios from "./components/Usuarios";
import NuevoUsuario from "./components/NuevoUsuario";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import { AuthProvider } from "./hooks/AuthContext";


import "./App.css";
import ForgotPassword from "./components/Login/ForgotPassword";
import ResetPassword from "./components/Login/ResetPassword";
import RecuperarUsuario from "./components/Login/RecuperarUsuario";

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>

    <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/usuarios" element={<> <Usuarios /> <NuevoUsuario /> </>} />

        <Route path="/" element={<Home />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset/:token" element={<ResetPassword />} />
        <Route path="/recuperar-usuario" element={<RecuperarUsuario />} />

      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
