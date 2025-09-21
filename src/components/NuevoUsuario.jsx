import { useState } from "react";
import { crearUsuario } from "../services/usuariosService"; 
import "../style.css";


export default function NuevoUsuario() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    rol: "lector",
  });
  const [mensaje, setMensaje] = useState("");
  const [esExito, setEsExito] = useState(false);

  const rolUsuario = localStorage.getItem("rol");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Validaciones
  const validarFormulario = () => {
    if (!form.nombre.trim()) {
      setMensaje("El nombre es obligatorio");
      setEsExito(false);
      return false;
    }

    //Correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
    setMensaje("El email no es válido");
    setEsExito(false);
    return false;
    }

    // Contraseña
    const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(form.password)) {
    setMensaje(
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial"
      );
      setEsExito(false);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;
    try {
      await crearUsuario(form);
      setMensaje("Usuario registrado con éxito");
      setEsExito(true);
      setForm({ nombre: "", email: "", password: "", rol: "lector" });
    } catch (err) {
      setMensaje("Error al registrar usuario");
      setEsExito(false);
    }
  };

  return (
    <div className="card">
      <h2>Registrar nuevo usuario</h2>
      {mensaje && (
          <p className={esExito ? "message-success" : "message-error"}>
          {mensaje}
        </p>
      )}
      {rolUsuario === "admin" ? (
        <form onSubmit={handleSubmit}>
          <input type="text" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Contraseña" value={form.password} onChange={handleChange} required />
          <select name="rol" value={form.rol} onChange={handleChange}>
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
            <option value="lector">Lector</option>
          </select>
          <button type="submit">Guardar</button>
        </form>
      ) : rolUsuario === "editor" ? (
        <p>Solo puedes editar usuarios existentes</p>
      ) : (
        <p>No tienes permisos para agregar usuarios</p>
      )}
    </div>
  );
}