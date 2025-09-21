import { useState } from "react";

export default function RecuperarUsuario() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");

    try {
      const res = await fetch("http://localhost:3000/api/reset/usuario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg);

      setMsg(data.msg);
      setEmail("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h1>Recuperar usuario</h1>
        <p>Ingresa el correo con el que registraste tu cuenta</p>

        {error && <div className="alert-error">{error}</div>}
        {msg && <div className="alert-success">{msg}</div>}

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            className="login-input"
            type="email"
            placeholder="Tu correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="login-btn" type="submit">
            Enviar nombre de usuario
          </button>
        </form>
      </div>
    </div>
  );
}
