import { useEffect, useRef } from "react";

export default function About() {
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting)
          e.target.querySelectorAll(".ab-reveal").forEach((el, i) =>
            setTimeout(() => el.classList.add("ab-in"), i * 110)
          );
      }),
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

        /*
          PALETA derivada de #2e6fba (igual que el hero)
          base:        #2e6fba
          oscuro-1:    #1a4a8a  (cards oscuras principales)
          oscuro-2:    #0e2d5a  (cards muy oscuras / contraste máximo)
          claro-1:     #5a96d4  (tono medio-claro)
          claro-2:     #a4c8ee  (acento claro, texto em)
          blanco:      #ffffff
          card-light:  rgba(255,255,255,0.12)  (cards con fondo translúcido)
        */

        .ab-root {
          font-family: 'DM Sans', sans-serif;
          background: #2e6fba;
          position: relative;
          overflow: hidden;
          padding: 100px 0 90px;
        }

        /* Dot texture — igual al hero pero en blanco */
        .ab-root::before {
          content: '';
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 36px 36px;
          pointer-events: none;
        }

        /* Sin gradiente inferior — color sólido, sin corte visual */
        .ab-root::after { display: none; }

        .ab-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 48px;
          position: relative;
          z-index: 1;
        }

        /* ── HEADER ── */
        .ab-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 48px;
          margin-bottom: 56px;
        }

        .ab-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.6);
          margin-bottom: 20px;
        }
        .ab-eyebrow-line { width: 32px; height: 1.5px; background: rgba(255,255,255,0.4); }

        .ab-h2 {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(40px, 5.5vw, 68px);
          line-height: 1.0;
          color: #ffffff;
          margin: 0;
          letter-spacing: -0.5px;
        }
        .ab-h2 em {
          font-style: italic;
          color: #a4c8ee;
        }

        .ab-lead {
          font-size: 16px;
          line-height: 1.8;
          color: rgba(255,255,255,0.75);
          max-width: 360px;
          flex-shrink: 0;
          align-self: flex-end;
          font-weight: 300;
        }

        /* ── BENTO GRID ── */
        .ab-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          grid-template-rows: auto auto;
          gap: 14px;
        }

        /* Card base */
        .ab-card {
          border-radius: 24px;
          padding: 32px;
          position: relative;
          overflow: hidden;
          transition: transform 0.4s cubic-bezier(.22,.68,0,1.2);
          cursor: default;
        }
        .ab-card:hover { transform: translateY(-4px); }

        /* Mission — oscuro-1 */
        .ab-mission {
          grid-column: 1 / 8;
          background: #1a4a8a;
          padding: 44px 44px 40px;
        }

        .ab-mission-quote {
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #a4c8ee;
          margin-bottom: 18px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .ab-mission-quote::before {
          content: '';
          width: 24px; height: 1px;
          background: #a4c8ee;
        }

        .ab-mission-text {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(22px, 2.5vw, 30px);
          color: #ffffff;
          line-height: 1.35;
          margin: 0 0 20px;
        }
        .ab-mission-sub {
          font-size: 14px;
          color: rgba(164,200,238,0.7);
          line-height: 1.75;
          font-weight: 300;
        }

        /* Visual card — oscuro-2 */
        .ab-visual {
          grid-column: 8 / 13;
          background: #0e2d5a;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 36px 32px;
          min-height: 260px;
        }

        .ab-icons-area {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 14px;
          padding-bottom: 16px;
        }
        .ab-icon-row {
          display: flex;
          gap: 12px;
          align-items: center;
        }
        .ab-icon-bubble {
          width: 64px; height: 64px;
          border-radius: 20px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          transition: background 0.25s, transform 0.3s cubic-bezier(.22,.68,0,1.2);
        }
        .ab-icon-bubble:hover {
          background: rgba(255,255,255,0.18);
          transform: scale(1.1) rotate(-5deg);
        }
        .ab-icon-bubble.sm {
          width: 48px; height: 48px;
          border-radius: 14px;
          font-size: 20px;
        }
        .ab-visual-label {
          font-size: 18px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 4px;
        }
        .ab-visual-sub {
          font-size: 13px;
          color: rgba(255,255,255,0.45);
        }

        /* Stat cards — blanco para máximo contraste */
        .ab-stat-1 { grid-column: 1 / 5; background: #ffffff; }
        .ab-stat-2 { grid-column: 5 / 9; background: #ffffff; }

        .ab-stat-num {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(44px, 5vw, 64px);
          color: #1a4a8a;
          line-height: 1;
          margin-bottom: 8px;
        }
        .ab-stat-num span { color: #2e6fba; }
        .ab-stat-label {
          font-size: 14px;
          color: #1a4a8a;
          line-height: 1.6;
          font-weight: 400;
          opacity: 0.75;
        }

        /* Story card — tono claro translúcido sobre #2e6fba */
        .ab-story {
          grid-column: 9 / 13;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.2);
        }
        .ab-story-icon {
          width: 44px; height: 44px;
          border-radius: 14px;
          background: rgba(255,255,255,0.15);
          display: flex; align-items: center; justify-content: center;
          font-size: 22px;
          margin-bottom: 16px;
        }
        .ab-story-title {
          font-size: 17px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 10px;
          line-height: 1.3;
        }
        .ab-story-text {
          font-size: 13px;
          color: rgba(255,255,255,0.7);
          line-height: 1.75;
          font-weight: 300;
        }
        .ab-story-text strong { color: #ffffff; font-weight: 600; }

        /* Vision card — oscuro-1 full width */
        .ab-vision {
          grid-column: 1 / 13;
          background: #1a4a8a;
          padding: 36px 44px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
        }
        .ab-vision::before {
          content: '2030';
          position: absolute;
          right: 60px;
          font-family: 'DM Serif Display', serif;
          font-size: 120px;
          color: rgba(164,200,238,0.06);
          line-height: 1;
          pointer-events: none;
          top: 50%;
          transform: translateY(-50%);
        }
        .ab-vision-left { flex: 1; }
        .ab-vision-tag {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #a4c8ee;
          margin-bottom: 10px;
        }
        .ab-vision-text {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(20px, 2.5vw, 28px);
          color: #ffffff;
          line-height: 1.3;
          margin: 0;
        }
        .ab-vision-text em { font-style: italic; color: #a4c8ee; }
        .ab-vision-right {
          display: flex;
          gap: 40px;
          flex-shrink: 0;
        }
        .ab-vision-stat { text-align: center; }
        .ab-vision-num {
          font-family: 'DM Serif Display', serif;
          font-size: 36px;
          color: #a4c8ee;
          line-height: 1;
          margin-bottom: 4px;
        }
        .ab-vision-lbl {
          font-size: 11px;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-weight: 500;
        }

        /* Reveal animation */
        .ab-reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.6s cubic-bezier(.22,.68,0,1), transform 0.6s cubic-bezier(.22,.68,0,1);
        }
        .ab-in {
          opacity: 1;
          transform: none;
        }

        @media (max-width: 900px) {
          .ab-header { flex-direction: column; align-items: flex-start; gap: 16px; }
          .ab-lead { max-width: 100%; }
          .ab-grid {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto;
          }
          .ab-mission { grid-column: 1 / 3; }
          .ab-visual { grid-column: 1 / 3; min-height: 200px; }
          .ab-stat-1 { grid-column: 1 / 2; }
          .ab-stat-2 { grid-column: 2 / 3; }
          .ab-story { grid-column: 1 / 3; }
          .ab-vision { grid-column: 1 / 3; flex-direction: column; align-items: flex-start; gap: 24px; }
          .ab-vision-right { width: 100%; justify-content: flex-start; }
        }

        @media (max-width: 600px) {
          .ab-inner { padding: 0 20px; }
          .ab-root { padding: 60px 0 50px; }
          .ab-grid { grid-template-columns: 1fr; }
          .ab-mission, .ab-visual, .ab-stat-1, .ab-stat-2, .ab-story, .ab-vision {
            grid-column: 1 / 2;
          }
          .ab-vision::before { display: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          .ab-reveal { transition: none; opacity: 1; transform: none; }
          .ab-card, .ab-icon-bubble { transition: none; }
        }
      `}</style>

      <section className="ab-root" ref={ref}>
        <div className="ab-inner">
          {/* Header */}
          <div className="ab-header">
            <div className="ab-reveal">
              <div className="ab-eyebrow">
                <span className="ab-eyebrow-line" />
                Quiénes somos
              </div>
              <h2 className="ab-h2">
                Cuidado que <em>importa,</em><br />para quienes más quieres
              </h2>
            </div>
            <p className="ab-lead ab-reveal">
              Conectamos familias con cuidadores profesionales y empáticos — para personas
              mayores, niños y mascotas — todo desde una plataforma digital ágil y segura.
            </p>
          </div>

          {/* Bento grid */}
          <div className="ab-grid">
            {/* Mission */}
            <div className="ab-card ab-mission ab-reveal">
              <div className="ab-mission-quote">Nuestra misión</div>
              <p className="ab-mission-text">
                Transformar el cuidado domiciliario en una experiencia de confianza,
                combinando la calidez humana con la eficiencia de la tecnología.
              </p>
              <p className="ab-mission-sub">
                Nacimos de una necesidad real: brindar tranquilidad a las familias.
                Nuestro objetivo es ser líderes en España para 2030.
              </p>
            </div>

            {/* Visual */}
            <div className="ab-card ab-visual ab-reveal">
              <div className="ab-icons-area">
                <div className="ab-icon-row">
                  <div className="ab-icon-bubble">👴</div>
                  <div className="ab-icon-bubble">👶</div>
                  <div className="ab-icon-bubble">🐾</div>
                </div>
                <div className="ab-icon-row">
                  <div className="ab-icon-bubble sm">❤️</div>
                  <div className="ab-icon-bubble sm">🏡</div>
                  <div className="ab-icon-bubble sm">🛡️</div>
                  <div className="ab-icon-bubble sm">✓</div>
                </div>
              </div>
              <div className="ab-visual-label">Toda la familia, un solo lugar</div>
              <div className="ab-visual-sub">Niños, mayores y mascotas — siempre protegidos</div>
            </div>

            {/* Stats */}
            <div className="ab-card ab-stat-1 ab-reveal">
              <div className="ab-stat-num">24<span>/7</span></div>
              <div className="ab-stat-label">Siempre disponibles, cualquier día del año</div>
            </div>

            <div className="ab-card ab-stat-2 ab-reveal">
              <div className="ab-stat-num">100<span>%</span></div>
              <div className="ab-stat-label">Digital, sin papeles ni trámites engorrosos</div>
            </div>

            {/* Story */}
            <div className="ab-card ab-story ab-reveal">
              <div className="ab-story-icon">📍</div>
              <div className="ab-story-title">Nacidos en Madrid, 2025</div>
              <p className="ab-story-text">
                Cuidadores validados con antecedentes verificados, referencias y formación certificada.{" "}
                <strong>Confianza respaldada por tecnología.</strong>
              </p>
            </div>

            {/* Vision bar */}
            <div className="ab-card ab-vision ab-reveal">
              <div className="ab-vision-left">
                <div className="ab-vision-tag">Visión 2030</div>
                <p className="ab-vision-text">
                  Ser la plataforma <em>líder en España</em> y referente internacional
                  en atención domiciliaria digitalizada.
                </p>
              </div>
              <div className="ab-vision-right">
                {[
                  { num: "500+", lbl: "Cuidadores" },
                  { num: "12K+", lbl: "Familias" },
                  { num: "4.9★", lbl: "Valoración" },
                ].map((s, i) => (
                  <div className="ab-vision-stat" key={i}>
                    <div className="ab-vision-num">{s.num}</div>
                    <div className="ab-vision-lbl">{s.lbl}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}