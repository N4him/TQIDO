import { useState, useEffect } from "react";

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
  const [showSticky, setShowSticky] = useState(false);
  const [activeCard, setActiveCard] = useState(1);
  const [prevActiveCard, setPrevActiveCard] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 320);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

    // Jerarquía fija por posición en el abanico:
    //   centro (i=1) siempre encima de laterales → z base 20
    //   card activa → z 30 (siempre gana)
    //   prevActiveCard lateral → z 14 (debajo del centro, encima del otro lateral)
    //   laterales en reposo → 10 / 11
    let zIndex: number;
    if (isActive) {
      zIndex = 30;
    } else if (i === center) {
      // Centro siempre por encima de las laterales inactivas
      zIndex = 20;
    } else if (i === prevActiveCard) {
      // La lateral que acaba de perder foco: sube un poco, pero
      // NUNCA por encima del centro (20) para evitar el overlap visual
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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

        /* ── PALETA BASE #2e6fba ──────────────────────────────────────
           base:      #2e6fba  (azul medio-profundo)
           oscuro:    #1a4a8a  (sombras, card overlay)
           muy oscuro:#0e2d5a  (profundidad máxima)
           claro:     #5a96d4  (blob highlight)
           muy claro: #a4c8ee  (blob suave)
           texto:     #ffffff  (blanco puro sobre base)
           texto2:    rgba(255,255,255,0.7)
        ──────────────────────────────────────────────────────────────── */

        .hero-root {
          min-height: 100svh;
          display: flex;
          align-items: center;
          background: #2e6fba;
          position: relative;
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
          padding-top: 20px;
        }

        .hero-ambient { display: none; }

        .hero-grain {
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none; opacity: 0.5;
        }
        .hero-dots {
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%);
        }

        .hero-inner {
          max-width: 1400px; margin: 0 auto; width: 100%;
          padding: 16px 48px 60px;
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 160px;
          align-items: center;
          position: relative; z-index: 1;
        }

        .hero-copy { display: flex; flex-direction: column; }

        .hero-h1 {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(44px, 5.5vw, 76px);
          line-height: 1.0; color: #ffffff; margin: 0 0 24px; letter-spacing: -0.5px;
        }
        .hero-h1 em { font-style: italic; color: #a4c8ee; }

        .hero-p {
          font-size: 17px; line-height: 1.75;
          color: rgba(255,255,255,0.75); margin: 0 0 40px;
          max-width: 440px; font-weight: 300;
        }

        .hero-ctas { display: flex; gap: 12px; margin-bottom: 40px; flex-wrap: wrap; }

        .hero-btn-primary {
          display: inline-flex; align-items: center; gap: 9px;
          padding: 15px 30px; background: #ffffff; color: #2e6fba;
          border: none; border-radius: 14px; font-size: 15px; font-weight: 700;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: transform 0.25s cubic-bezier(.22,.68,0,1.2), box-shadow 0.25s ease;
          box-shadow: none; white-space: nowrap;
        }
        .hero-btn-primary:hover { transform: translateY(-3px); }

        .hero-btn-secondary {
          display: inline-flex; align-items: center; gap: 9px;
          padding: 15px 26px; background: rgba(255,255,255,0.12);
          color: #ffffff; border: 1px solid rgba(255,255,255,0.35);
          border-radius: 14px; font-size: 15px; font-weight: 500; cursor: pointer;
          font-family: 'DM Sans', sans-serif; white-space: nowrap; backdrop-filter: blur(8px);
          transition: background 0.2s, border-color 0.2s;
        }
        .hero-btn-secondary:hover { background: rgba(255,255,255,0.22); border-color: rgba(255,255,255,0.6); }

        .play-ring {
          width: 22px; height: 22px; border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.5);
          display: flex; align-items: center; justify-content: center; font-size: 9px;
        }

        .hero-social { display: flex; align-items: center; gap: 14px; }
        .hero-av-stack { display: flex; }
        .hero-av {
          width: 36px; height: 36px; border-radius: 50%;
          border: 2.5px solid #2e6fba; background: #1a4a8a;
          margin-left: -10px; overflow: hidden;
          display: flex; align-items: center; justify-content: center; font-size: 15px;
        }
        .hero-av:first-child { margin-left: 0; }
        .hero-social-text { display: flex; flex-direction: column; gap: 1px; }
        .hero-stars { color: #fbbf24; font-size: 11px; letter-spacing: 1px; }
        .hero-social-label { font-size: 13px; color: rgba(255,255,255,0.7); }
        .hero-social-label strong { color: #ffffff; font-weight: 700; }

        .hero-fan {
          position: relative;
          height: 660px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-card {
          position: absolute;
          width: 340px;
          height: 500px;
          cursor: pointer;
          will-change: transform;
          transition: transform 0.55s cubic-bezier(.22,.68,0,1.2);

        }

        .hero-card-inner {
          width: 100%;
          height: 100%;
          border-radius: 24px;
          overflow: hidden;
          position: relative;
          isolation: isolate;
        }

        .hero-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .hero-card-overlay { display: none; }

        .hero-card-info {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 34px 30px;
        }
        .hero-card-count {
          font-size: 46px; font-weight: 700; color: #fff;
          font-family: 'DM Serif Display', serif; line-height: 1; margin-bottom: 6px;
        }
        .hero-card-title {
          font-size: 16px; font-weight: 500;
          color: rgba(255,255,255,0.7); margin-bottom: 18px; letter-spacing: 0.02em;
        }
        .hero-card-btn {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 10px 20px;
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.3);
          border-radius: 100px; color: #fff;
          font-size: 14px; font-weight: 600; cursor: pointer;
          backdrop-filter: blur(8px);
          font-family: 'DM Sans', sans-serif;
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.35s cubic-bezier(.22,.68,0,1.2),
                      transform 0.35s cubic-bezier(.22,.68,0,1.2),
                      background 0.2s;
        }
        .hero-card:hover .hero-card-btn,
        .hero-card.active-auto .hero-card-btn {
          opacity: 1;
          transform: translateY(0);
        }
        .hero-card-btn:hover { background: rgba(255,255,255,0.28); }

        .hero-fan-dots {
          position: absolute; bottom: -28px; left: 50%;
          transform: translateX(-50%);
          display: flex; gap: 6px; z-index: 50;
        }
        .hero-fan-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: rgba(255,255,255,0.3);
          transition: all 0.3s ease;
          cursor: pointer; border: none; padding: 0;
        }
        .hero-fan-dot.active { background: #ffffff; width: 20px; border-radius: 3px; }

        .hero-mobile-cards {
          display: none;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px; margin-top: 36px;
        }
        .hero-mobile-card {
          border-radius: 16px; overflow: hidden;
          height: 220px;
          position: relative; cursor: pointer;
        }
        .hero-mobile-card img { width: 100%; height: 100%; object-fit: cover; }
        .hero-mobile-card-overlay { display: none; }
        .hero-mobile-card-info {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 16px 14px; text-align: center;
        }
        .hero-mobile-card-count {
          font-size: 24px; font-weight: 700; color: #fff;
          font-family: 'DM Serif Display', serif; line-height: 1;
        }
        .hero-mobile-card-title { font-size: 12px; color: rgba(255,255,255,0.8); margin-top: 3px; }

        .hero-sticky {
          position: fixed; bottom: 24px; left: 50%;
          transform: translateX(-50%) translateY(100px);
          z-index: 999; opacity: 0;
          transition: transform 0.4s cubic-bezier(.22,.68,0,1.2), opacity 0.3s ease;
          pointer-events: none;
        }
        .hero-sticky.visible { transform: translateX(-50%) translateY(0); opacity: 1; pointer-events: auto; }
        .hero-sticky-btn {
          display: flex; align-items: center; gap: 10px;
          padding: 14px 28px; background: #1a4a8a;
          border: 1px solid rgba(164,200,238,0.35); color: #fff;
          border-radius: 100px; font-size: 14px; font-weight: 600;
          cursor: pointer; box-shadow: none;
          font-family: 'DM Sans', sans-serif; backdrop-filter: blur(12px); white-space: nowrap;
        }

        @media (max-width: 1024px) {
          .hero-inner { grid-template-columns: 1fr; gap: 0; padding: 40px 24px 48px; }
          .hero-fan { display: none; }
          .hero-mobile-cards { display: grid; }
          .hero-h1 { font-size: clamp(36px, 8vw, 56px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-card, .hero-btn-primary, .hero-btn-secondary { transition: none; }
        }
      `}</style>



      <section className="hero-root" id="hero">
        <div className="hero-ambient">
          <div className="hero-ambient-blob hero-amb-1" />
          <div className="hero-ambient-blob hero-amb-2" />
          <div className="hero-ambient-blob hero-amb-3" />
        </div>
        <div className="hero-grain" />
        <div className="hero-dots" />

        <div className="hero-inner">
          {/* Left */}
          <div className="hero-copy">
            <h1 className="hero-h1">
              Somos expertos<br />
              en el cuidado de tus <em>seres amados</em><br />
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
            <div className="hero-mobile-cards">
              {galleryItems.map((item, i) => (
                <div
                  key={item.id}
                  className={`hero-mobile-card ${clicked === i ? "tapped" : ""}`}
                  onClick={() => setClicked(p => p === i ? null : i)}
                >
                  <img src={item.image} alt={item.title} />
                  <div className="hero-mobile-card-overlay" />
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
                  <div className="hero-card-overlay" />
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
    </>
  );
}