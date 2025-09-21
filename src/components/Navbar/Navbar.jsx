import { NavLink, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../hooks/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { isLogged, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="logo">Lacteos</div>

      <nav className={`nav-links ${open ? "open" : ""}`}>
        <NavLink to="/" end>Inicio</NavLink>
        {isLogged ? (
          <>
            <NavLink to="/usuarios">Usuarios</NavLink>
            <div className="profile-menu">
  <button 
    className="profile-btn"
    onClick={() => setShowProfileMenu(!showProfileMenu)}
  >
    Perfil ▼
  </button>
  {showProfileMenu && (
    <div className="dropdown">
      <button className="dropdown-item" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </div>
  )}
</div>
          </>
        ) : (
          <NavLink to="/login">Inicia Sesión</NavLink>
        )}
        <NavLink to="/ayuda">Ayuda</NavLink>
      </nav>

      <button
        className="hamburger"
        aria-label="Menú"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>
    </header>
  );
}
