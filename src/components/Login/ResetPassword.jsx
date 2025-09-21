import { useState } from "react"; 
import { useParams, useNavigate } from "react-router-dom";
import "./Login.css";

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [esError, setEsError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de contraseña
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      setMsg(
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial"
      );
      setEsError(true);
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/api/reset/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword: password }),
      });
      const data = await res.json();

      setMsg(data.msg);
      setEsError(!res.ok);

      if (res.ok) {
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch {
      setMsg("Ocurrió un error al restablecer la contraseña");
      setEsError(true);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h1>Restablecer contraseña</h1>
        <p>Escribe tu nueva contraseña</p>

        {msg && (
          <div className={esError ? "alert-error" : "alert-success"}>
            {msg}
          </div>
        )}

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Nueva contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
          <button type="submit" className="login-btn">
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}
