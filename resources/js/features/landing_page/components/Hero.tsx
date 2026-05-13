import "../../../css/landing_page/hero.css";

export default function Hero() {
  return (
    <section className="hero-root" id="hero">
      {/* Video de fondo */}
      <video
        className="hero-video-bg"
        src="/assets/Prueba1.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="hero-video-overlay" />
      <div className="hero-grain" />

      <div className="hero-inner">
        <div className="hero-copy">
          <h1 className="hero-h1">
            Somos expertos<br />
            en el cuidado de tus <em>seres amados</em>
          </h1>
          <p className="hero-p">
            Conectamos familias con cuidadores profesionales, verificados
            y empáticos — para personas mayores, niños y mascotas. Todo 100% digital.
          </p>
          <div className="hero-ctas">
            <button className="hero-btn-primary">🔍 Buscar cuidador</button>
            <button className="hero-btn-secondary">
              <span className="play-ring">▶</span>
              Ver cómo funciona
            </button>
          </div>
          <div className="hero-social">
            <div className="hero-av-stack">
              {["👩", "👨", "👩‍⚕️", "🧑"].map((em, i) => (
                <div className="hero-av" key={i}>{em}</div>
              ))}
            </div>
            <div className="hero-social-text">
              <div className="hero-stars">★★★★★</div>
              <div className="hero-social-label">
                <strong>+12.000 familias</strong> confían en TQido
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}