import { useState } from "react";
import "./Login.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [token, setToken] = useState(""); // token temporal para admins
  const [msg, setMsg] = useState("");
  const [requireOtp, setRequireOtp] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const res = await fetch("http://localhost:3000/api/reset/enviar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.token) {
        // El backend indicó que se necesita OTP
        setRequireOtp(true);
        setToken(data.token);
        setMsg(data.msg);
      } else {
        setMsg(data.msg);
      }
    } catch {
      setMsg("Ocurrió un error al enviar el enlace");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const res = await fetch("http://localhost:3000/api/reset/verificar-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, token }),
      });

      const data = await res.json();
      setMsg(data.msg);

      if (res.ok) {
        setRequireOtp(false); // OTP correcto, puede continuar
      }
    } catch {
      setMsg("Ocurrió un error al verificar el OTP");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h1>Recuperar contraseña</h1>
        <p>Introduce tu correo electrónico para recibir el enlace</p>

        {msg && (
          <div
            className={
              msg.toLowerCase().includes("error")
                ? "alert-error"
                : "alert-success"
            }
          >
            {msg}
          </div>
        )}

        {!requireOtp && (
          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Ingresa tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="login-input"
            />
            <button type="submit" className="login-btn">
              Enviar enlace
            </button>
          </form>
        )}

        {requireOtp && (
          <form className="login-form" onSubmit={handleVerifyOtp}>
            <input
              type="text"
              placeholder="Ingresa el OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="login-input"
            />
            <button type="submit" className="login-btn">
              Verificar OTP
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
