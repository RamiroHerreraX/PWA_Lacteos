import { useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.msg || "Credenciales incorrectas");
      } else {
        localStorage.setItem("rol", data.rol);
        localStorage.setItem("token", data.token);
        console.log("Login exitoso, rol:", data.rol);
        navigate("/usuarios");
      }
    } catch (err) {
      setError("Error en el servidor");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h1>Bienvenido</h1>
        <p>Inicia sesión en tu cuenta</p>

        {error && <p className="alert-error">{error}</p>}
        {success && <p className="alert-success">{success}</p>}

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="Correo electrónico"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="login-options">
            <label>
              <input type="checkbox" /> Recuérdame
            </label>
            <Link to="#">¿Olvidaste tu contraseña?</Link>
          </div>

          <button type="submit" className="login-btn">
            Iniciar sesión
          </button>
        </form>

        <p className="signup-text">
          ¿No tienes una cuenta?{" "}
          <Link to="/#">Regístrate</Link>
        </p>
      </div>
    </div>
  );
}
