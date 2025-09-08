import NuevoUsuario from './components/NuevoUsuario';
import Usuarios from './components/Usuarios';
import './App.css';

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <Usuarios />
      <hr />
      <NuevoUsuario />
    </div>
  );
}

export default App;
