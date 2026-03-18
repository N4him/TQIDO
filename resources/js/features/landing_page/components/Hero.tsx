import { useState, useEffect } from "react";
import "../../../css/landing_page/hero.css";

const galleryItems = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=800&q=80",
    title: "Personas mayores",
    count: "75+",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80",
    title: "Niños",
    count: "100+",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80",
    title: "Mascotas",
    count: "50+",
  },
];

export default function Hero() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [clicked, setClicked] = useState<number | null>(null);
  const [activeCard, setActiveCard] = useState(1);
  const [prevActiveCard, setPrevActiveCard] = useState<number | null>(null);

  useEffect(() => {
    const t = setInterval(() => {
      if (hovered === null) {
        setActiveCard(p => {
          const next = (p + 1) % 3;
          setPrevActiveCard(p);
          setTimeout(() => setPrevActiveCard(null), 650);
          return next;
        });
      }
    }, 4500);
    return () => clearInterval(t);
  }, [hovered]);

  const center = 1;

  const getCardStyle = (i: number) => {
    const offset = i - center;
    const angle = offset * 14;
    const tx = offset * 185;
    const isActive = hovered === i || (hovered === null && activeCard === i);
    const scale = isActive ? 1.07 : hovered !== null ? 0.93 : 1;

    let zIndex: number;
    if (isActive) {
      zIndex = 30;
    } else if (i === center) {
      zIndex = 20;
    } else if (i === prevActiveCard) {
      zIndex = 14;
    } else {
      zIndex = i === 0 ? 10 : 11;
    }

    return {
      transform: `translateX(${tx}px) rotate(${angle}deg) scale(${scale})`,
      zIndex,
    };
  };

  return (
    <section className="hero-root" id="hero">
      <div className="hero-grain" />
      <div className="hero-dots" />

      <div className="hero-inner">
        {/* Left */}
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

          {/* Mobile cards */}
          <div className="hero-mobile-cards">
            {galleryItems.map((item, i) => (
              <div
                key={item.id}
                className={`hero-mobile-card ${clicked === i ? "tapped" : ""}`}
                onClick={() => setClicked(p => p === i ? null : i)}
              >
                <img src={item.image} alt={item.title} />
                <div className="hero-mobile-card-info">
                  <div className="hero-mobile-card-count">{item.count}</div>
                  <div className="hero-mobile-card-title">{item.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right fan */}
        <div className="hero-fan">
          {galleryItems.map((item, i) => (
            <div
              key={item.id}
              className={`hero-card ${hovered === null && activeCard === i ? "active-auto" : ""}`}
              style={getCardStyle(i)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="hero-card-inner">
                <img src={item.image} alt={item.title} className="hero-card-img" />
                <div className="hero-card-info">
                  <div className="hero-card-count">{item.count}</div>
                  <div className="hero-card-title">servicios — {item.title}</div>
                  <button className="hero-card-btn">Explorar →</button>
                </div>
              </div>
            </div>
          ))}

          <div className="hero-fan-dots">
            {galleryItems.map((_, i) => (
              <button
                key={i}
                className={`hero-fan-dot ${activeCard === i ? "active" : ""}`}
                onClick={() => setActiveCard(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}