import { useState } from "react";
import "./Login.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/reset/enviar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setMsg(data.msg);
    } catch {
      setMsg("Ocurrió un error al enviar el enlace");
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
      </div>
    </div>
  );
}
