import "./Home.css";

export default function Home() {
  return (
    <section className="home">
      <h1>Bienvenido</h1>
      <p>Explora el sistema y administra tus usuarios de forma sencilla.</p>
      <a href="/login" className="btn-primary">Comenzar</a>
    </section>
  );
}
