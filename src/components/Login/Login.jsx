import { useState, useContext  } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../hooks/AuthContext";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(""); 
  const [step, setStep] = useState(1); 
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  // Paso 1: validar email y contraseña, y solicitar OTP
  const handleLogin = async (e) => {
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
        setSuccess("Código 2FA enviado a tu correo");
        setStep(2); 
      }
    } catch (err) {
      setError("Error en el servidor");
    }
  };

  // Paso 2: verificar OTP y obtener token/rol
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://localhost:3000/api/verificar-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.msg || "Código 2FA incorrecto");
      } else {
        localStorage.setItem("rol", data.rol);
        localStorage.setItem("token", data.token);
        console.log("Login exitoso, rol:", data.rol);
        login(data.token, data.rol);
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

        {/* Paso 1: Formulario de login */}
        {step === 1 && (
          <form onSubmit={handleLogin} className="login-form">
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
              <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
              <Link to="/recuperar-usuario">¿Olvidaste tu usuario?</Link>
            </div>

            <button type="submit" className="login-btn">
              Iniciar sesión
            </button>
          </form>
        )}

        {/* Paso 2: Formulario para OTP */}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="login-form">
            <input
              type="text"
              placeholder="Código 2FA"
              className="login-input"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />

            <button type="submit" className="login-btn">
              Verificar código
            </button>
          </form>
        )}

        <p className="signup-text">
          ¿No tienes una cuenta?{" "}
          <Link to="/#">Regístrate</Link>
        </p>
      </div>
    </div>
  );
}
