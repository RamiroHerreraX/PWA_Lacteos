import { useUsuarios } from "../hooks/useUsuarios";
import "../style.css";

export default function Usuarios() {
  const { usuarios, loading, error } = useUsuarios();
  const rolUsuario = localStorage.getItem("rol");

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="card">
      <h1>Lista de Usuarios</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            {(rolUsuario === "admin" || rolUsuario === "editor") && <th>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td className="text-center">{u.id}</td>
              <td>{u.nombre}</td>
              <td>{u.email}</td>
              <td className="text-center font-semibold">{u.rol}</td>
              {(rolUsuario === "admin" || rolUsuario === "editor") && (
                <td>
                  {rolUsuario === "admin" || rolUsuario === "editor" ? (
                    <button style={{ marginRight: "5px" }}>Editar</button>
                  ) : null}
                  {rolUsuario === "admin" ? <button>Borrar</button> : null}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
